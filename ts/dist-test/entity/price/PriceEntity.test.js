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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "affiliateLink": { "a": true, "fo": "uri", "h": "Affiliate Link", "n": "affiliateLink", "r": false, "sh": "Affiliate link to retailer (do not modify)", "t": "`$STRING`", "key$": "affiliateLink", "index$": 0 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": false, "sh": "Currency code (GBP, EUR, USD)", "t": "`$STRING`", "key$": "currency", "index$": 1 }, "discount": { "a": true, "fo": "float", "h": "Discount", "n": "discount", "r": false, "sh": "Discount percentage", "t": "`$NUMBER`", "key$": "discount", "index$": 2 }, "inStock": { "a": true, "h": "In Stock", "n": "inStock", "r": false, "sh": "Stock availability", "t": "`$BOOLEAN`", "key$": "inStock", "index$": 3 }, "lastUpdated": { "a": true, "fo": "date-time", "h": "Last Updated", "n": "lastUpdated", "r": false, "sh": "Last price update timestamp", "t": "`$STRING`", "key$": "lastUpdated", "index$": 4 }, "originalPrice": { "a": true, "fo": "float", "h": "Original Price", "n": "originalPrice", "r": false, "sh": "Original price before discount", "t": "`$NUMBER`", "key$": "originalPrice", "index$": 5 }, "price": { "a": true, "fo": "float", "h": "Price", "n": "price", "r": false, "sh": "Current price", "t": "`$NUMBER`", "key$": "price", "index$": 6 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "sh": "Region code", "t": "`$STRING`", "key$": "region", "index$": 7 }, "retailerId": { "a": true, "h": "Retailer Id", "n": "retailerId", "r": false, "sh": "Retailer identifier", "t": "`$STRING`", "key$": "retailerId", "index$": 8 }, "retailerName": { "a": true, "h": "Retailer Name", "n": "retailerName", "r": false, "sh": "Retailer name", "t": "`$STRING`", "key$": "retailerName", "index$": 9 } }, "name": "price", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /games/{gameId}/prices", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "game_id", "or": "game_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "USD", "k": "query", "n": "currency", "or": "currency", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "region", "or": "region", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/games/{gameId}/prices", "q": { "exist": ["currency", "game_id", "region"] }, "r": { "param": { "gameId": "game_id" } }, "s": [{ "lit": "games" }, { "var": "game_id" }, { "lit": "prices" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /consoles/{consoleId}/prices", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "console_id", "or": "console_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "USD", "k": "query", "n": "currency", "or": "currency", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/consoles/{consoleId}/prices", "q": { "exist": ["console_id", "currency"] }, "r": { "param": { "consoleId": "console_id" } }, "s": [{ "lit": "consoles" }, { "var": "console_id" }, { "lit": "prices" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.console"], ["$.main.kit.entity.game"]] }, "key$": "price", "name__orig": "price", "Name": "Price", "name_": "price", "name-": "price", "NAME": "PRICE", "index$": 4 }, { "active": true, "entity": "price", "key$": "BasicPriceFlow", "kind": "basic", "name": "BasicPriceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "console_id": "console01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "price_ref01" } }], "index$": 0 }] }, 'Price', { "GET /games/{gameId}/prices": { "protocol": "http", "operationId": "getGamePrices", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "key$": "success", "type": "boolean" }, "data": { "items": { "properties": { "affiliateLink": { "description": "Affiliate link to retailer (do not modify)", "format": "uri", "type": "string", "key$": "affiliateLink" }, "currency": { "description": "Currency code (GBP, EUR, USD)", "type": "string", "key$": "currency" }, "discount": { "description": "Discount percentage", "format": "float", "type": "number", "key$": "discount" }, "inStock": { "description": "Stock availability", "type": "boolean", "key$": "inStock" }, "lastUpdated": { "description": "Last price update timestamp", "format": "date-time", "type": "string", "key$": "lastUpdated" }, "originalPrice": { "description": "Original price before discount", "format": "float", "type": "number", "key$": "originalPrice" }, "price": { "description": "Current price", "format": "float", "type": "number", "key$": "price" }, "region": { "description": "Region code", "type": "string", "key$": "region" }, "retailerId": { "description": "Retailer identifier", "type": "string", "key$": "retailerId" }, "retailerName": { "description": "Retailer name", "type": "string", "key$": "retailerName" } }, "type": "object", "x-ref": "#/components/schemas/Price", "index$": 0 }, "key$": "data", "type": "array" } } } } } }, "404": { "description": "Resource not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/NotFoundError" }, "429": { "description": "Rate limit exceeded - too many requests", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/RateLimitError" }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/ServerError" } }, "parameters": [{ "name": "gameId", "in": "path", "required": true, "description": "Unique identifier for the game", "schema": { "type": "string" }, "index$": 0 }, { "name": "currency", "in": "query", "description": "Currency code for price display", "schema": { "type": "string", "enum": ["GBP", "EUR", "USD"], "default": "USD" }, "index$": 1 }, { "name": "region", "in": "query", "description": "Region code for regional pricing", "schema": { "type": "string" }, "index$": 2 }], "securitySource": "unspecified", "securitySchemes": { "apiKey": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key." } } }, "GET /consoles/{consoleId}/prices": { "protocol": "http", "operationId": "getConsolePrices", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "key$": "success", "type": "boolean" }, "data": { "items": { "properties": { "affiliateLink": { "description": "Affiliate link to retailer (do not modify)", "format": "uri", "type": "string", "key$": "affiliateLink" }, "currency": { "description": "Currency code (GBP, EUR, USD)", "type": "string", "key$": "currency" }, "discount": { "description": "Discount percentage", "format": "float", "type": "number", "key$": "discount" }, "inStock": { "description": "Stock availability", "type": "boolean", "key$": "inStock" }, "lastUpdated": { "description": "Last price update timestamp", "format": "date-time", "type": "string", "key$": "lastUpdated" }, "originalPrice": { "description": "Original price before discount", "format": "float", "type": "number", "key$": "originalPrice" }, "price": { "description": "Current price", "format": "float", "type": "number", "key$": "price" }, "region": { "description": "Region code", "type": "string", "key$": "region" }, "retailerId": { "description": "Retailer identifier", "type": "string", "key$": "retailerId" }, "retailerName": { "description": "Retailer name", "type": "string", "key$": "retailerName" } }, "type": "object", "x-ref": "#/components/schemas/Price", "index$": 0 }, "key$": "data", "type": "array" } } } } } }, "404": { "description": "Resource not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/NotFoundError" }, "429": { "description": "Rate limit exceeded - too many requests", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/RateLimitError" }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/ServerError" } }, "parameters": [{ "name": "consoleId", "in": "path", "required": true, "description": "Unique identifier for the console", "schema": { "type": "string" }, "index$": 0 }, { "name": "currency", "in": "query", "description": "Currency code for price display", "schema": { "type": "string", "enum": ["GBP", "EUR", "USD"], "default": "USD" }, "index$": 1 }], "securitySource": "unspecified", "securitySchemes": { "apiKey": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key." } } } });
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