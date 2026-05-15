# Studio entity test

require "minitest/autorun"
require "json"
require_relative "../Nexarda_sdk"
require_relative "runner"

class StudioEntityTest < Minitest::Test
  def test_create_instance
    testsdk = NexardaSDK.test(nil, nil)
    ent = testsdk.Studio(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = studio_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "studio." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set NEXARDA_TEST_STUDIO_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    studio_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.studio")))
    studio_ref01_data = nil
    if studio_ref01_data_raw.length > 0
      studio_ref01_data = Helpers.to_map(studio_ref01_data_raw[0][1])
    end

    # LIST
    studio_ref01_ent = client.Studio(nil)
    studio_ref01_match = {}

    studio_ref01_list_result, err = studio_ref01_ent.list(studio_ref01_match, nil)
    assert_nil err
    assert studio_ref01_list_result.is_a?(Array)

    # LOAD
    studio_ref01_match_dt0 = {
      "id" => studio_ref01_data["id"],
    }
    studio_ref01_data_dt0_loaded, err = studio_ref01_ent.load(studio_ref01_match_dt0, nil)
    assert_nil err
    studio_ref01_data_dt0_load_result = Helpers.to_map(studio_ref01_data_dt0_loaded)
    assert !studio_ref01_data_dt0_load_result.nil?
    assert_equal studio_ref01_data_dt0_load_result["id"], studio_ref01_data["id"]

  end
end

def studio_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "studio", "StudioTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = NexardaSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["studio01", "studio02", "studio03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["NEXARDA_TEST_STUDIO_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "NEXARDA_TEST_STUDIO_ENTID" => idmap,
    "NEXARDA_TEST_LIVE" => "FALSE",
    "NEXARDA_TEST_EXPLAIN" => "FALSE",
    "NEXARDA_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["NEXARDA_TEST_STUDIO_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["NEXARDA_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["NEXARDA_APIKEY"],
      },
      extra || {},
    ])
    client = NexardaSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["NEXARDA_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["NEXARDA_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
