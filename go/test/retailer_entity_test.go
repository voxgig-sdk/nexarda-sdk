package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/nexarda-sdk/go"
	"github.com/voxgig-sdk/nexarda-sdk/go/core"

	vs "github.com/voxgig-sdk/nexarda-sdk/go/utility/struct"
)

func TestRetailerEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Retailer(nil)
		if ent == nil {
			t.Fatal("expected non-nil RetailerEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := retailerBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "retailer." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set NEXARDA_TEST_RETAILER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		retailerRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.retailer", setup.data)))
		var retailerRef01Data map[string]any
		if len(retailerRef01DataRaw) > 0 {
			retailerRef01Data = core.ToMapAny(retailerRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = retailerRef01Data

		// LIST
		retailerRef01Ent := client.Retailer(nil)
		retailerRef01Match := map[string]any{}

		retailerRef01ListResult, err := retailerRef01Ent.List(retailerRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, retailerRef01ListOk := retailerRef01ListResult.([]any)
		if !retailerRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", retailerRef01ListResult)
		}

	})
}

func retailerBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "retailer", "RetailerTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read retailer test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse retailer test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"retailer01", "retailer02", "retailer03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("NEXARDA_TEST_RETAILER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"NEXARDA_TEST_RETAILER_ENTID": idmap,
		"NEXARDA_TEST_LIVE":      "FALSE",
		"NEXARDA_TEST_EXPLAIN":   "FALSE",
		"NEXARDA_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["NEXARDA_TEST_RETAILER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["NEXARDA_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["NEXARDA_APIKEY"],
			},
			extra,
		})
		client = sdk.NewNexardaSDK(core.ToMapAny(mergedOpts))
	}

	live := env["NEXARDA_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["NEXARDA_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
