# Nexarda Lua SDK



The Lua SDK for the Nexarda API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Console()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/nexarda-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("nexarda_sdk")

local client = sdk.new({
  apikey = os.getenv("NEXARDA_APIKEY"),
})
```

### 2. List console records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local consoles, err = client:Console():list()
if err then error(err) end

for _, item in ipairs(consoles) do
  print(item["id"], item["description"])
end
```

### 3. Load a console

```lua
local console, err = client:Console():load({ id = "example_id" })
if err then error(err) end
print(console)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local studios, err = client:Studio():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Studio():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
NEXARDA_TEST_LIVE=TRUE
NEXARDA_APIKEY=<your-key>
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### NexardaSDK

```lua
local sdk = require("nexarda_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### NexardaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Console` | `(data) -> ConsoleEntity` | Create a Console entity instance. |
| `Franchis` | `(data) -> FranchisEntity` | Create a Franchis entity instance. |
| `Game` | `(data) -> GameEntity` | Create a Game entity instance. |
| `Platform` | `(data) -> PlatformEntity` | Create a Platform entity instance. |
| `Price` | `(data) -> PriceEntity` | Create a Price entity instance. |
| `Retailer` | `(data) -> RetailerEntity` | Create a Retailer entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |
| `Studio` | `(data) -> StudioEntity` | Create a Studio entity instance. |
| `User` | `(data) -> UserEntity` | Create an User entity instance. |
| `Widget` | `(data) -> WidgetEntity` | Create a Widget entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local console, err = client:Console():load({ id = "example_id" })
    if err then error(err) end
    -- console is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Console

| Field | Description |
| --- | --- |
| `description` | Product description |
| `id` | Unique console identifier |
| `images` | Product images |
| `manufacturer` | Manufacturer name |
| `name` | Console name |
| `releaseDate` | Release date |
| `specifications` | Technical specifications |
| `type` | Product type |

Operations: List, Load.

API path: `/consoles`

#### Franchis

| Field | Description |
| --- | --- |
| `description` | Franchise description |
| `games` | Game IDs included in franchise |
| `id` | Unique franchise identifier |
| `logo` | Franchise logo URL |
| `name` | Franchise name |
| `totalGames` | Total number of games in franchise |

Operations: List, Load.

API path: `/franchises`

#### Game

| Field | Description |
| --- | --- |
| `ageRating` | Age rating (e.g., ESRB, PEGI) |
| `coverImage` | Cover image URL |
| `description` | Game description |
| `developer` | Developer name |
| `franchiseId` | Associated franchise ID |
| `genres` | Game genres |
| `id` | Unique game identifier |
| `name` | Game title |
| `platforms` | Supported platforms |
| `publisher` | Publisher name |
| `releaseDate` | Release date |
| `screenshots` | Screenshot URLs |
| `videos` | Video media |

Operations: List, Load.

API path: `/games`

#### Platform

| Field | Description |
| --- | --- |
| `api` |  |
| `priceUpdates` |  |
| `status` | Overall platform status |
| `timestamp` | Status check timestamp |
| `website` |  |

Operations: Load.

API path: `/status`

#### Price

| Field | Description |
| --- | --- |
| `affiliateLink` | Affiliate link to retailer (do not modify) |
| `currency` | Currency code (GBP, EUR, USD) |
| `discount` | Discount percentage |
| `inStock` | Stock availability |
| `lastUpdated` | Last price update timestamp |
| `originalPrice` | Original price before discount |
| `price` | Current price |
| `region` | Region code |
| `retailerId` | Retailer identifier |
| `retailerName` | Retailer name |

Operations: List.

API path: `/games/{gameId}/prices`

#### Retailer

| Field | Description |
| --- | --- |
| `approved` | Approval status |
| `currencies` | Supported currencies |
| `id` | Unique retailer identifier |
| `logo` | Retailer logo URL |
| `name` | Retailer name |
| `regions` | Supported regions |
| `website` | Retailer website |

Operations: List.

API path: `/retailers`

#### Search

| Field | Description |
| --- | --- |
| `consoles` |  |
| `games` |  |
| `totalResults` |  |

Operations: Load.

API path: `/search`

#### Studio

| Field | Description |
| --- | --- |
| `description` | Studio description |
| `foundingYear` | Year founded |
| `games` | Released game IDs |
| `id` | Unique studio identifier |
| `location` | Studio location |
| `logo` | Studio logo URL |
| `name` | Studio name |
| `type` | Studio type |
| `website` | Official website |

Operations: List, Load.

API path: `/studios`

#### User

| Field | Description |
| --- | --- |
| `ageRating` | Age rating (e.g., ESRB, PEGI) |
| `avatar` | Avatar image URL |
| `coverImage` | Cover image URL |
| `description` | Game description |
| `developer` | Developer name |
| `franchiseId` | Associated franchise ID |
| `genres` | Game genres |
| `id` | Unique user identifier |
| `joinDate` | Account creation date |
| `libraryCount` | Number of games in library |
| `name` | Game title |
| `platforms` | Supported platforms |
| `publisher` | Publisher name |
| `releaseDate` | Release date |
| `screenshots` | Screenshot URLs |
| `username` | Username |
| `videos` | Video media |
| `wishlistCount` | Number of items in wishlist |

Operations: List, Load.

API path: `/users/{userId}/library`

#### Widget

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/widgets/button`



## Entities


### Console

Create an instance: `local console = client:Console(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Product description |
| `id` | `string` | Unique console identifier |
| `images` | `table` | Product images |
| `manufacturer` | `string` | Manufacturer name |
| `name` | `string` | Console name |
| `releaseDate` | `string` | Release date |
| `specifications` | `table` | Technical specifications |
| `type` | `string` | Product type |

#### Example: Load

```lua
local console, err = client:Console():load({ id = "console_id" })
```

#### Example: List

```lua
local consoles, err = client:Console():list()
```


### Franchis

Create an instance: `local franchis = client:Franchis(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Franchise description |
| `games` | `table` | Game IDs included in franchise |
| `id` | `string` | Unique franchise identifier |
| `logo` | `string` | Franchise logo URL |
| `name` | `string` | Franchise name |
| `totalGames` | `number` | Total number of games in franchise |

#### Example: Load

```lua
local franchis, err = client:Franchis():load({ id = "franchis_id" })
```

#### Example: List

```lua
local franchiss, err = client:Franchis():list()
```


### Game

Create an instance: `local game = client:Game(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageRating` | `string` | Age rating (e.g., ESRB, PEGI) |
| `coverImage` | `string` | Cover image URL |
| `description` | `string` | Game description |
| `developer` | `string` | Developer name |
| `franchiseId` | `string` | Associated franchise ID |
| `genres` | `table` | Game genres |
| `id` | `string` | Unique game identifier |
| `name` | `string` | Game title |
| `platforms` | `table` | Supported platforms |
| `publisher` | `string` | Publisher name |
| `releaseDate` | `string` | Release date |
| `screenshots` | `table` | Screenshot URLs |
| `videos` | `table` | Video media |

#### Example: Load

```lua
local game, err = client:Game():load({ id = "game_id" })
```

#### Example: List

```lua
local games, err = client:Game():list()
```


### Platform

Create an instance: `local platform = client:Platform(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api` | `table` |  |
| `priceUpdates` | `table` |  |
| `status` | `string` | Overall platform status |
| `timestamp` | `string` | Status check timestamp |
| `website` | `table` |  |

#### Example: Load

```lua
local platform, err = client:Platform():load()
```


### Price

Create an instance: `local price = client:Price(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliateLink` | `string` | Affiliate link to retailer (do not modify) |
| `currency` | `string` | Currency code (GBP, EUR, USD) |
| `discount` | `number` | Discount percentage |
| `inStock` | `boolean` | Stock availability |
| `lastUpdated` | `string` | Last price update timestamp |
| `originalPrice` | `number` | Original price before discount |
| `price` | `number` | Current price |
| `region` | `string` | Region code |
| `retailerId` | `string` | Retailer identifier |
| `retailerName` | `string` | Retailer name |

#### Example: List

```lua
local prices, err = client:Price():list()
```


### Retailer

Create an instance: `local retailer = client:Retailer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved` | `boolean` | Approval status |
| `currencies` | `table` | Supported currencies |
| `id` | `string` | Unique retailer identifier |
| `logo` | `string` | Retailer logo URL |
| `name` | `string` | Retailer name |
| `regions` | `table` | Supported regions |
| `website` | `string` | Retailer website |

#### Example: List

```lua
local retailers, err = client:Retailer():list()
```


### Search

Create an instance: `local search = client:Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `consoles` | `table` |  |
| `games` | `table` |  |
| `totalResults` | `number` |  |

#### Example: Load

```lua
local search, err = client:Search():load({ q = "q" })
```


### Studio

Create an instance: `local studio = client:Studio(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Studio description |
| `foundingYear` | `number` | Year founded |
| `games` | `table` | Released game IDs |
| `id` | `string` | Unique studio identifier |
| `location` | `table` | Studio location |
| `logo` | `string` | Studio logo URL |
| `name` | `string` | Studio name |
| `type` | `string` | Studio type |
| `website` | `string` | Official website |

#### Example: Load

```lua
local studio, err = client:Studio():load({ id = "studio_id" })
```

#### Example: List

```lua
local studios, err = client:Studio():list()
```


### User

Create an instance: `local user = client:User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageRating` | `string` | Age rating (e.g., ESRB, PEGI) |
| `avatar` | `string` | Avatar image URL |
| `coverImage` | `string` | Cover image URL |
| `description` | `string` | Game description |
| `developer` | `string` | Developer name |
| `franchiseId` | `string` | Associated franchise ID |
| `genres` | `table` | Game genres |
| `id` | `string` | Unique user identifier |
| `joinDate` | `string` | Account creation date |
| `libraryCount` | `number` | Number of games in library |
| `name` | `string` | Game title |
| `platforms` | `table` | Supported platforms |
| `publisher` | `string` | Publisher name |
| `releaseDate` | `string` | Release date |
| `screenshots` | `table` | Screenshot URLs |
| `username` | `string` | Username |
| `videos` | `table` | Video media |
| `wishlistCount` | `number` | Number of items in wishlist |

#### Example: Load

```lua
local user, err = client:User():load({ id = "user_id" })
```

#### Example: List

```lua
local users, err = client:User():list()
```


### Widget

Create an instance: `local widget = client:Widget(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local widget, err = client:Widget():load({ product_id = "product_id" })
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── nexarda_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`nexarda_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local studio = client:Studio()
studio:list()

-- studio:data_get() now returns the studio data from the last list
-- studio:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
