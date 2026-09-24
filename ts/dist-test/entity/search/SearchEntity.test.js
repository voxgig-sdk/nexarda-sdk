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
(0, node_test_1.describe)('SearchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NEXARDA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NEXARDA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NexardaSDK.test();
        const ent = testsdk.Search();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NEXARDA_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'search.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "consoles": { "a": true, "h": "Consoles", "n": "consoles", "r": false, "t": "`$ARRAY`", "key$": "consoles", "index$": 0 }, "games": { "a": true, "h": "Games", "n": "games", "r": false, "t": "`$ARRAY`", "key$": "games", "index$": 1 }, "totalResults": { "a": true, "h": "Total Results", "n": "totalResults", "r": false, "t": "`$INTEGER`", "key$": "totalResults", "index$": 2 } }, "name": "search", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "q", "or": "q", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "all", "k": "query", "n": "type", "or": "type", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/search", "q": { "exist": ["limit", "q", "type"] }, "r": {}, "s": [{ "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "search", "name__orig": "search", "Name": "Search", "name_": "search", "name-": "search", "NAME": "SEARCH", "index$": 6 }, { "active": true, "entity": "search", "key$": "BasicSearchFlow", "kind": "basic", "name": "BasicSearchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "search_ref01", "srcdatavar": "search_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-search_ref01" } }], "index$": 0 }] }, 'Search', { "GET /search": { "protocol": "http", "operationId": "search", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "key$": "success", "type": "boolean" }, "data": { "key$": "data", "properties": { "consoles": { "items": { "properties": { "description": { "description": "Product description", "type": "string" }, "id": { "description": "Unique console identifier", "type": "string" }, "images": { "description": "Product images", "items": { "format": "uri", "type": "string" }, "type": "array" }, "manufacturer": { "description": "Manufacturer name", "type": "string" }, "name": { "description": "Console name", "type": "string" }, "releaseDate": { "description": "Release date", "format": "date", "type": "string" }, "specifications": { "additionalProperties": { "type": "string" }, "description": "Technical specifications", "type": "object" }, "type": { "description": "Product type", "enum": ["console", "gear"], "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Console" }, "type": "array", "key$": "consoles" }, "games": { "items": { "properties": { "ageRating": { "description": "Age rating (e.g., ESRB, PEGI)", "type": "string" }, "coverImage": { "description": "Cover image URL", "format": "uri", "type": "string" }, "description": { "description": "Game description", "type": "string" }, "developer": { "description": "Developer name", "type": "string" }, "franchiseId": { "description": "Associated franchise ID", "type": "string" }, "genres": { "description": "Game genres", "items": { "type": "string" }, "type": "array" }, "id": { "description": "Unique game identifier", "type": "string" }, "name": { "description": "Game title", "type": "string" }, "platforms": { "description": "Supported platforms", "items": { "type": "string" }, "type": "array" }, "publisher": { "description": "Publisher name", "type": "string" }, "releaseDate": { "description": "Release date", "format": "date", "type": "string" }, "screenshots": { "description": "Screenshot URLs", "items": { "format": "uri", "type": "string" }, "type": "array" }, "videos": { "description": "Video media", "items": { "properties": { "type": { "type": "string" }, "url": { "format": "uri", "type": "string" } }, "type": "object" }, "type": "array" } }, "type": "object", "x-ref": "#/components/schemas/Game" }, "type": "array", "key$": "games" }, "totalResults": { "type": "integer", "key$": "totalResults" } }, "type": "object", "index$": 0 } } } } } }, "400": { "description": "Bad request - invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/BadRequestError" }, "429": { "description": "Rate limit exceeded - too many requests", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/RateLimitError" }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/ServerError" } }, "parameters": [{ "name": "q", "in": "query", "required": true, "description": "Search query string", "schema": { "type": "string" }, "index$": 0 }, { "name": "type", "in": "query", "description": "Filter by product type", "schema": { "type": "string", "enum": ["game", "console", "gear", "all"], "default": "all" }, "index$": 1 }, { "name": "limit", "in": "query", "description": "Maximum number of results to return", "schema": { "type": "integer", "default": 20, "minimum": 1, "maximum": 100 }, "index$": 2 }], "securitySource": "unspecified", "securitySchemes": { "apiKey": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key." } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let search_ref01_data = Object.values(setup.data.existing.search)[0];
        // LOAD
        const search_ref01_ent = client.Search();
        const search_ref01_match_dt0 = {};
        const search_ref01_data_dt0 = (await search_ref01_ent.load(search_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != search_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/search/SearchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NexardaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['search01', 'search02', 'search03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NEXARDA_TEST_SEARCH_ENTID': idmap,
        'NEXARDA_TEST_LIVE': 'FALSE',
        'NEXARDA_TEST_EXPLAIN': 'FALSE',
        'NEXARDA_APIKEY': '',
    });
    idmap = env['NEXARDA_TEST_SEARCH_ENTID'];
    const live = 'TRUE' === env.NEXARDA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NEXARDA_TEST_SEARCH_ENTID'];
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
//# sourceMappingURL=SearchEntity.test.js.map