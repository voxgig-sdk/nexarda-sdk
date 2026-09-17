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
(0, node_test_1.describe)('UserEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NEXARDA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NEXARDA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NexardaSDK.test();
        const ent = testsdk.User();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NEXARDA_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'user.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "uri", "name": "avatar", "req": false, "short": "Avatar image URL", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "id", "req": false, "short": "Unique user identifier", "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "date-time", "name": "joinDate", "req": false, "short": "Account creation date", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "libraryCount", "req": false, "short": "Number of games in library", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "username", "req": false, "short": "Username", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "wishlistCount", "req": false, "short": "Number of items in wishlist", "type": "`$INTEGER`", "index$": 5 }], "id": { "field": "id", "name": "id" }, "name": "user", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "user_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /users/{userId}/library", "json": "{\"operationId\":\"getUserLibrary\",\"parameters\":[{\"description\":\"Unique identifier for the user\",\"in\":\"path\",\"name\":\"userId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"ageRating\":{\"description\":\"Age rating (e.g., ESRB, PEGI)\",\"type\":\"string\"},\"coverImage\":{\"description\":\"Cover image URL\",\"format\":\"uri\",\"type\":\"string\"},\"description\":{\"description\":\"Game description\",\"type\":\"string\"},\"developer\":{\"description\":\"Developer name\",\"type\":\"string\"},\"franchiseId\":{\"description\":\"Associated franchise ID\",\"type\":\"string\"},\"genres\":{\"description\":\"Game genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"Unique game identifier\",\"type\":\"string\"},\"name\":{\"description\":\"Game title\",\"type\":\"string\"},\"platforms\":{\"description\":\"Supported platforms\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"publisher\":{\"description\":\"Publisher name\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"screenshots\":{\"description\":\"Screenshot URLs\",\"items\":{\"format\":\"uri\",\"type\":\"string\"},\"type\":\"array\"},\"videos\":{\"description\":\"Video media\",\"items\":{\"properties\":{\"type\":{\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - invalid or missing API key\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded - too many requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/users/{userId}/library", "rename": { "param": { "userId": "id" } }, "segments": [{ "lit": "users" }, { "var": "id" }, { "lit": "library" }], "select": { "$action": "library", "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "user_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /users/{userId}/wishlist", "json": "{\"operationId\":\"getUserWishlist\",\"parameters\":[{\"description\":\"Unique identifier for the user\",\"in\":\"path\",\"name\":\"userId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"ageRating\":{\"description\":\"Age rating (e.g., ESRB, PEGI)\",\"type\":\"string\"},\"coverImage\":{\"description\":\"Cover image URL\",\"format\":\"uri\",\"type\":\"string\"},\"description\":{\"description\":\"Game description\",\"type\":\"string\"},\"developer\":{\"description\":\"Developer name\",\"type\":\"string\"},\"franchiseId\":{\"description\":\"Associated franchise ID\",\"type\":\"string\"},\"genres\":{\"description\":\"Game genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"Unique game identifier\",\"type\":\"string\"},\"name\":{\"description\":\"Game title\",\"type\":\"string\"},\"platforms\":{\"description\":\"Supported platforms\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"publisher\":{\"description\":\"Publisher name\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"screenshots\":{\"description\":\"Screenshot URLs\",\"items\":{\"format\":\"uri\",\"type\":\"string\"},\"type\":\"array\"},\"videos\":{\"description\":\"Video media\",\"items\":{\"properties\":{\"type\":{\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - invalid or missing API key\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded - too many requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/users/{userId}/wishlist", "rename": { "param": { "userId": "id" } }, "segments": [{ "lit": "users" }, { "var": "id" }, { "lit": "wishlist" }], "select": { "$action": "wishlist", "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "user_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /users/{userId}", "json": "{\"operationId\":\"getUserProfile\",\"parameters\":[{\"description\":\"Unique identifier for the user\",\"in\":\"path\",\"name\":\"userId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"avatar\":{\"description\":\"Avatar image URL\",\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"Unique user identifier\",\"type\":\"string\"},\"joinDate\":{\"description\":\"Account creation date\",\"format\":\"date-time\",\"type\":\"string\"},\"libraryCount\":{\"description\":\"Number of games in library\",\"type\":\"integer\"},\"username\":{\"description\":\"Username\",\"type\":\"string\"},\"wishlistCount\":{\"description\":\"Number of items in wishlist\",\"type\":\"integer\"}},\"type\":\"object\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - invalid or missing API key\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded - too many requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/users/{userId}", "rename": { "param": { "userId": "id" } }, "segments": [{ "lit": "users" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "user", "name__orig": "user", "Name": "User", "name_": "user", "name-": "user", "NAME": "USER", "index$": 8 }, { "active": true, "entity": "user", "key$": "BasicUserFlow", "kind": "basic", "name": "BasicUserFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "user_id": "user01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "user_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "user_ref01", "srcdatavar": "user_ref01_data", "suffix": "_dt0" }, "match": { "id": "user01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-user_ref01" } }], "index$": 1 }] }, 'User');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let user_ref01_data = Object.values(setup.data.existing.user)[0];
        // LIST
        const user_ref01_ent = client.User();
        const user_ref01_match = {};
        user_ref01_match['user_id'] = setup.idmap['user01'];
        const user_ref01_list = (await user_ref01_ent.list(user_ref01_match)).map((e) => e.data());
        // LOAD
        const user_ref01_match_dt0 = {};
        user_ref01_match_dt0.id = user_ref01_data.id;
        const user_ref01_data_dt0 = (await user_ref01_ent.load(user_ref01_match_dt0)).data();
        (0, node_assert_1.default)(user_ref01_data_dt0.id === user_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/user/UserTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NexardaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['user01', 'user02', 'user03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NEXARDA_TEST_USER_ENTID': idmap,
        'NEXARDA_TEST_LIVE': 'FALSE',
        'NEXARDA_TEST_EXPLAIN': 'FALSE',
        'NEXARDA_APIKEY': '',
    });
    idmap = env['NEXARDA_TEST_USER_ENTID'];
    const live = 'TRUE' === env.NEXARDA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NEXARDA_TEST_USER_ENTID'];
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
//# sourceMappingURL=UserEntity.test.js.map