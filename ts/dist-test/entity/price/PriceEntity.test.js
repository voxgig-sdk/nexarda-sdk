"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PriceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NEXARDA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NEXARDA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NexardaSDK.test();
        const ent = testsdk.Price();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NEXARDA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'price.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "uri", "name": "affiliateLink", "req": false, "short": "Affiliate link to retailer (do not modify)", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "currency", "req": false, "short": "Currency code (GBP, EUR, USD)", "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "float", "name": "discount", "req": false, "short": "Discount percentage", "type": "`$NUMBER`", "index$": 2 }, { "active": true, "name": "inStock", "req": false, "short": "Stock availability", "type": "`$BOOLEAN`", "index$": 3 }, { "active": true, "format": "date-time", "name": "lastUpdated", "req": false, "short": "Last price update timestamp", "type": "`$STRING`", "index$": 4 }, { "active": true, "format": "float", "name": "originalPrice", "req": false, "short": "Original price before discount", "type": "`$NUMBER`", "index$": 5 }, { "active": true, "format": "float", "name": "price", "req": false, "short": "Current price", "type": "`$NUMBER`", "index$": 6 }, { "active": true, "name": "region", "req": false, "short": "Region code", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "retailerId", "req": false, "short": "Retailer identifier", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "retailerName", "req": false, "short": "Retailer name", "type": "`$STRING`", "index$": 9 }], "name": "price", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "game_id", "orig": "game_id", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": "USD", "kind": "query", "name": "currency", "orig": "currency", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "region", "orig": "region", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /games/{gameId}/prices", "json": "{\"operationId\":\"getGamePrices\",\"parameters\":[{\"description\":\"Unique identifier for the game\",\"in\":\"path\",\"name\":\"gameId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Currency code for price display\",\"in\":\"query\",\"name\":\"currency\",\"schema\":{\"default\":\"USD\",\"enum\":[\"GBP\",\"EUR\",\"USD\"],\"type\":\"string\"}},{\"description\":\"Region code for regional pricing\",\"in\":\"query\",\"name\":\"region\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"affiliateLink\":{\"description\":\"Affiliate link to retailer (do not modify)\",\"format\":\"uri\",\"type\":\"string\"},\"currency\":{\"description\":\"Currency code (GBP, EUR, USD)\",\"type\":\"string\"},\"discount\":{\"description\":\"Discount percentage\",\"format\":\"float\",\"type\":\"number\"},\"inStock\":{\"description\":\"Stock availability\",\"type\":\"boolean\"},\"lastUpdated\":{\"description\":\"Last price update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"originalPrice\":{\"description\":\"Original price before discount\",\"format\":\"float\",\"type\":\"number\"},\"price\":{\"description\":\"Current price\",\"format\":\"float\",\"type\":\"number\"},\"region\":{\"description\":\"Region code\",\"type\":\"string\"},\"retailerId\":{\"description\":\"Retailer identifier\",\"type\":\"string\"},\"retailerName\":{\"description\":\"Retailer name\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded - too many requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/games/{gameId}/prices", "rename": { "param": { "gameId": "game_id" } }, "segments": [{ "lit": "games" }, { "var": "game_id" }, { "lit": "prices" }], "select": { "exist": ["currency", "game_id", "region"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "console_id", "orig": "console_id", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": "USD", "kind": "query", "name": "currency", "orig": "currency", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /consoles/{consoleId}/prices", "json": "{\"operationId\":\"getConsolePrices\",\"parameters\":[{\"description\":\"Unique identifier for the console\",\"in\":\"path\",\"name\":\"consoleId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Currency code for price display\",\"in\":\"query\",\"name\":\"currency\",\"schema\":{\"default\":\"USD\",\"enum\":[\"GBP\",\"EUR\",\"USD\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"affiliateLink\":{\"description\":\"Affiliate link to retailer (do not modify)\",\"format\":\"uri\",\"type\":\"string\"},\"currency\":{\"description\":\"Currency code (GBP, EUR, USD)\",\"type\":\"string\"},\"discount\":{\"description\":\"Discount percentage\",\"format\":\"float\",\"type\":\"number\"},\"inStock\":{\"description\":\"Stock availability\",\"type\":\"boolean\"},\"lastUpdated\":{\"description\":\"Last price update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"originalPrice\":{\"description\":\"Original price before discount\",\"format\":\"float\",\"type\":\"number\"},\"price\":{\"description\":\"Current price\",\"format\":\"float\",\"type\":\"number\"},\"region\":{\"description\":\"Region code\",\"type\":\"string\"},\"retailerId\":{\"description\":\"Retailer identifier\",\"type\":\"string\"},\"retailerName\":{\"description\":\"Retailer name\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded - too many requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/consoles/{consoleId}/prices", "rename": { "param": { "consoleId": "console_id" } }, "segments": [{ "lit": "consoles" }, { "var": "console_id" }, { "lit": "prices" }], "select": { "exist": ["console_id", "currency"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "list" } }, "relations": { "ancestors": [["console"], ["game"]] }, "key$": "price", "name__orig": "price", "Name": "Price", "name_": "price", "name-": "price", "NAME": "PRICE", "index$": 4 }, { "active": true, "entity": "price", "key$": "BasicPriceFlow", "kind": "basic", "name": "BasicPriceFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "console_id": "console01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "price_ref01" } }], "index$": 0 }] }, 'Price');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let price_ref01_data = Object.values(setup.data.existing.price)[0];
        // LIST
        const price_ref01_ent = client.Price();
        const price_ref01_match = {};
        price_ref01_match['console_id'] = setup.idmap['console01'];
        const price_ref01_list = (await price_ref01_ent.list(price_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/price/PriceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NexardaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['price01', 'price02', 'price03', 'console01', 'console02', 'console03', 'game01', 'game02', 'game03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NEXARDA_TEST_PRICE_ENTID': idmap,
        'NEXARDA_TEST_LIVE': 'FALSE',
        'NEXARDA_TEST_EXPLAIN': 'FALSE',
        'NEXARDA_APIKEY': '',
    });
    idmap = env['NEXARDA_TEST_PRICE_ENTID'];
    const live = 'TRUE' === env.NEXARDA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NEXARDA_TEST_PRICE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.NexardaSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.NEXARDA_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.NEXARDA_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PriceEntity.test.js.map