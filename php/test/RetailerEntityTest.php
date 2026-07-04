<?php
declare(strict_types=1);

// Retailer entity test

require_once __DIR__ . '/../nexarda_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class RetailerEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = NexardaSDK::test(null, null);
        $ent = $testsdk->Retailer(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = retailer_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "retailer." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set NEXARDA_TEST_RETAILER_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $retailer_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.retailer")));
        $retailer_ref01_data = null;
        if (count($retailer_ref01_data_raw) > 0) {
            $retailer_ref01_data = Helpers::to_map($retailer_ref01_data_raw[0][1]);
        }

        // LIST
        $retailer_ref01_ent = $client->Retailer(null);
        $retailer_ref01_match = [];

        $retailer_ref01_list_result = $retailer_ref01_ent->list($retailer_ref01_match, null);
        $this->assertIsArray($retailer_ref01_list_result);

    }
}

function retailer_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/retailer/RetailerTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = NexardaSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["retailer01", "retailer02", "retailer03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("NEXARDA_TEST_RETAILER_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "NEXARDA_TEST_RETAILER_ENTID" => $idmap,
        "NEXARDA_TEST_LIVE" => "FALSE",
        "NEXARDA_TEST_EXPLAIN" => "FALSE",
        "NEXARDA_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["NEXARDA_TEST_RETAILER_ENTID"]);
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
