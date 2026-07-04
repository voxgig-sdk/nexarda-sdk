<?php
declare(strict_types=1);

// Nexarda SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class NexardaSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new NexardaUtility();
        $this->_utility = $utility;

        $config = NexardaConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = NexardaHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = NexardaHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, NexardaFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return NexardaUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = NexardaHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = NexardaHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = NexardaHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new NexardaSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = NexardaHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = NexardaHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_console = null;

    // Canonical facade: $client->Console()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->console()
    // resolves here too.
    public function Console($data = null)
    {
        require_once __DIR__ . '/entity/console_entity.php';
        if ($data === null) {
            if ($this->_console === null) {
                $this->_console = new ConsoleEntity($this, null);
            }
            return $this->_console;
        }
        return new ConsoleEntity($this, $data);
    }


    private $_franchis = null;

    // Canonical facade: $client->Franchis()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->franchis()
    // resolves here too.
    public function Franchis($data = null)
    {
        require_once __DIR__ . '/entity/franchis_entity.php';
        if ($data === null) {
            if ($this->_franchis === null) {
                $this->_franchis = new FranchisEntity($this, null);
            }
            return $this->_franchis;
        }
        return new FranchisEntity($this, $data);
    }


    private $_game = null;

    // Canonical facade: $client->Game()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->game()
    // resolves here too.
    public function Game($data = null)
    {
        require_once __DIR__ . '/entity/game_entity.php';
        if ($data === null) {
            if ($this->_game === null) {
                $this->_game = new GameEntity($this, null);
            }
            return $this->_game;
        }
        return new GameEntity($this, $data);
    }


    private $_platform = null;

    // Canonical facade: $client->Platform()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->platform()
    // resolves here too.
    public function Platform($data = null)
    {
        require_once __DIR__ . '/entity/platform_entity.php';
        if ($data === null) {
            if ($this->_platform === null) {
                $this->_platform = new PlatformEntity($this, null);
            }
            return $this->_platform;
        }
        return new PlatformEntity($this, $data);
    }


    private $_price = null;

    // Canonical facade: $client->Price()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->price()
    // resolves here too.
    public function Price($data = null)
    {
        require_once __DIR__ . '/entity/price_entity.php';
        if ($data === null) {
            if ($this->_price === null) {
                $this->_price = new PriceEntity($this, null);
            }
            return $this->_price;
        }
        return new PriceEntity($this, $data);
    }


    private $_retailer = null;

    // Canonical facade: $client->Retailer()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->retailer()
    // resolves here too.
    public function Retailer($data = null)
    {
        require_once __DIR__ . '/entity/retailer_entity.php';
        if ($data === null) {
            if ($this->_retailer === null) {
                $this->_retailer = new RetailerEntity($this, null);
            }
            return $this->_retailer;
        }
        return new RetailerEntity($this, $data);
    }


    private $_search = null;

    // Canonical facade: $client->Search()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->search()
    // resolves here too.
    public function Search($data = null)
    {
        require_once __DIR__ . '/entity/search_entity.php';
        if ($data === null) {
            if ($this->_search === null) {
                $this->_search = new SearchEntity($this, null);
            }
            return $this->_search;
        }
        return new SearchEntity($this, $data);
    }


    private $_studio = null;

    // Canonical facade: $client->Studio()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->studio()
    // resolves here too.
    public function Studio($data = null)
    {
        require_once __DIR__ . '/entity/studio_entity.php';
        if ($data === null) {
            if ($this->_studio === null) {
                $this->_studio = new StudioEntity($this, null);
            }
            return $this->_studio;
        }
        return new StudioEntity($this, $data);
    }


    private $_user = null;

    // Canonical facade: $client->User()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->user()
    // resolves here too.
    public function User($data = null)
    {
        require_once __DIR__ . '/entity/user_entity.php';
        if ($data === null) {
            if ($this->_user === null) {
                $this->_user = new UserEntity($this, null);
            }
            return $this->_user;
        }
        return new UserEntity($this, $data);
    }


    private $_widget = null;

    // Canonical facade: $client->Widget()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->widget()
    // resolves here too.
    public function Widget($data = null)
    {
        require_once __DIR__ . '/entity/widget_entity.php';
        if ($data === null) {
            if ($this->_widget === null) {
                $this->_widget = new WidgetEntity($this, null);
            }
            return $this->_widget;
        }
        return new WidgetEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new NexardaSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
