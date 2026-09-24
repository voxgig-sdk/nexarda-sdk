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
(0, node_test_1.describe)('StudioEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NEXARDA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NEXARDA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NexardaSDK.test();
        const ent = testsdk.Studio();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NEXARDA_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'studio.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Studio description", "t": "`$STRING`", "key$": "description", "index$": 0 }, "foundingYear": { "a": true, "h": "Founding Year", "n": "foundingYear", "r": false, "sh": "Year founded", "t": "`$INTEGER`", "key$": "foundingYear", "index$": 1 }, "games": { "a": true, "h": "Games", "n": "games", "r": false, "sh": "Released game IDs", "t": "`$ARRAY`", "key$": "games", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique studio identifier", "t": "`$STRING`", "key$": "id", "index$": 3 }, "location": { "a": true, "h": "Location", "n": "location", "r": false, "sh": "Studio location", "t": "`$OBJECT`", "key$": "location", "index$": 4 }, "logo": { "a": true, "fo": "uri", "h": "Logo", "n": "logo", "r": false, "sh": "Studio logo URL", "t": "`$STRING`", "key$": "logo", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Studio name", "t": "`$STRING`", "key$": "name", "index$": 6 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "Studio type", "t": "`$STRING`", "key$": "type", "index$": 7 }, "website": { "a": true, "fo": "uri", "h": "Website", "n": "website", "r": false, "sh": "Official website", "t": "`$STRING`", "key$": "website", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "studio", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /studios", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "type", "or": "type", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/studios", "q": { "exist": ["limit", "type"] }, "r": {}, "s": [{ "lit": "studios" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /studios/{studioId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "studio_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/studios/{studioId}", "q": { "exist": ["id"] }, "r": { "param": { "studioId": "id" } }, "s": [{ "lit": "studios" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "studio", "name__orig": "studio", "Name": "Studio", "name_": "studio", "name-": "studio", "NAME": "STUDIO", "index$": 7 }, { "active": true, "entity": "studio", "key$": "BasicStudioFlow", "kind": "basic", "name": "BasicStudioFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "studio_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "studio_ref01", "srcdatavar": "studio_ref01_data", "suffix": "_dt0" }, "m": { "id": "studio01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-studio_ref01" } }], "index$": 1 }] }, 'Studio', { "GET /studios": { "protocol": "http", "operationId": "getStudios", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "key$": "success", "type": "boolean" }, "data": { "items": { "properties": { "description": { "description": "Studio description", "type": "string", "key$": "description" }, "foundingYear": { "description": "Year founded", "type": "integer", "key$": "foundingYear" }, "games": { "description": "Released game IDs", "items": { "type": "string" }, "type": "array", "key$": "games" }, "id": { "description": "Unique studio identifier", "type": "string", "key$": "id" }, "location": { "description": "Studio location", "properties": { "city": { "type": "string" }, "country": { "type": "string" } }, "type": "object", "key$": "location" }, "logo": { "description": "Studio logo URL", "format": "uri", "type": "string", "key$": "logo" }, "name": { "description": "Studio name", "type": "string", "key$": "name" }, "type": { "description": "Studio type", "enum": ["developer", "publisher", "both"], "type": "string", "key$": "type" }, "website": { "description": "Official website", "format": "uri", "type": "string", "key$": "website" } }, "type": "object", "x-ref": "#/components/schemas/Studio", "index$": 0 }, "key$": "data", "type": "array" } } } } } }, "429": { "description": "Rate limit exceeded - too many requests", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/RateLimitError" }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/ServerError" } }, "parameters": [{ "name": "limit", "in": "query", "description": "Maximum number of results to return", "schema": { "type": "integer", "default": 20, "minimum": 1, "maximum": 100 }, "index$": 0 }, { "name": "type", "in": "query", "description": "Filter by studio type", "schema": { "type": "string", "enum": ["developer", "publisher", "both"] }, "index$": 1 }], "securitySource": "unspecified", "securitySchemes": { "apiKey": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key." } } }, "GET /studios/{studioId}": { "protocol": "http", "operationId": "getStudioById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean" }, "data": { "type": "object", "properties": { "id": { "description": "Unique studio identifier", "type": "string", "key$": "id" }, "name": { "description": "Studio name", "type": "string", "key$": "name" }, "type": { "description": "Studio type", "enum": ["developer", "publisher", "both"], "type": "string", "key$": "type" }, "foundingYear": { "description": "Year founded", "type": "integer", "key$": "foundingYear" }, "location": { "description": "Studio location", "properties": { "city": { "type": "string" }, "country": { "type": "string" } }, "type": "object", "key$": "location" }, "description": { "description": "Studio description", "type": "string", "key$": "description" }, "logo": { "description": "Studio logo URL", "format": "uri", "type": "string", "key$": "logo" }, "games": { "description": "Released game IDs", "items": { "type": "string" }, "type": "array", "key$": "games" }, "website": { "description": "Official website", "format": "uri", "type": "string", "key$": "website" } }, "x-ref": "#/components/schemas/Studio", "index$": 0 } } } } } }, "404": { "description": "Resource not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/NotFoundError" }, "429": { "description": "Rate limit exceeded - too many requests", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/RateLimitError" }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/ServerError" } }, "parameters": [{ "name": "studioId", "in": "path", "required": true, "description": "Unique identifier for the studio", "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified", "securitySchemes": { "apiKey": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key." } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let studio_ref01_data = Object.values(setup.data.existing.studio)[0];
        // LIST
        const studio_ref01_ent = client.Studio();
        const studio_ref01_match = {};
        const studio_ref01_list = (await studio_ref01_ent.list(studio_ref01_match)).map((e) => e.data());
        // LOAD
        const studio_ref01_match_dt0 = {};
        studio_ref01_match_dt0.id = studio_ref01_data.id;
        const studio_ref01_data_dt0 = (await studio_ref01_ent.load(studio_ref01_match_dt0)).data();
        (0, node_assert_1.default)(studio_ref01_data_dt0.id === studio_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/studio/StudioTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NexardaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['studio01', 'studio02', 'studio03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NEXARDA_TEST_STUDIO_ENTID': idmap,
        'NEXARDA_TEST_LIVE': 'FALSE',
        'NEXARDA_TEST_EXPLAIN': 'FALSE',
        'NEXARDA_APIKEY': '',
    });
    idmap = env['NEXARDA_TEST_STUDIO_ENTID'];
    const live = 'TRUE' === env.NEXARDA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NEXARDA_TEST_STUDIO_ENTID'];
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
//# sourceMappingURL=StudioEntity.test.js.map