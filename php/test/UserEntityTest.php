<?php
declare(strict_types=1);

// User entity test

require_once __DIR__ . '/../nexarda_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class UserEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = NexardaSDK::test(null, null);
        $ent = $testsdk->User(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "user" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = NexardaSDK::test($seed, null);
        $seen = iterator_to_array($base->User(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = NexardaConfig::make_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = NexardaSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->User(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = user_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "user." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set NEXARDA_TEST_USER_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $user_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.user")));
        $user_ref01_data = null;
        if (count($user_ref01_data_raw) > 0) {
            $user_ref01_data = Helpers::to_map($user_ref01_data_raw[0][1]);
        }

        // LIST
        $user_ref01_ent = $client->User(null);
        $user_ref01_match = [
            "user_id" => $setup["idmap"]["user01"],
        ];

        $user_ref01_list_result = $user_ref01_ent->list($user_ref01_match, null);
        $this->assertIsArray($user_ref01_list_result);

        // LOAD
        $user_ref01_match_dt0 = [
            "id" => $user_ref01_data["id"],
        ];
        $user_ref01_data_dt0_loaded = $user_ref01_ent->load($user_ref01_match_dt0, null);
        $user_ref01_data_dt0_load_result = Helpers::to_map($user_ref01_data_dt0_loaded);
        $this->assertNotNull($user_ref01_data_dt0_load_result);
        $this->assertEquals($user_ref01_data_dt0_load_result["id"], $user_ref01_data["id"]);

    }
}

function user_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/user/UserTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = NexardaSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["user01", "user02", "user03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("NEXARDA_TEST_USER_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "NEXARDA_TEST_USER_ENTID" => $idmap,
        "NEXARDA_TEST_LIVE" => "FALSE",
        "NEXARDA_TEST_EXPLAIN" => "FALSE",
        "NEXARDA_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["NEXARDA_TEST_USER_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["NEXARDA_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["NEXARDA_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new NexardaSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["NEXARDA_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["NEXARDA_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
