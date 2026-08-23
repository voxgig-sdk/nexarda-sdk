# Nexarda Ruby SDK



The Ruby SDK for the Nexarda API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Console` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/nexarda-sdk/releases](https://github.com/voxgig-sdk/nexarda-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Nexarda_sdk"

client = NexardaSDK.new({
  "apikey" => ENV["NEXARDA_APIKEY"],
})
```

### 2. List console records

```ruby
begin
  # list returns an Array of Console records — iterate directly.
  consoles = client.Console.list
  consoles.each do |item|
    puts "#{item["id"]} #{item["description"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a console

```ruby
begin
  # load returns the ENTITY — call data_get for the Console record (raises on error).
  console = client.Console.load({ "id" => "example_id" })
  puts console
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  studios = client.Studio.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = NexardaSDK.test({
  "entity" => { "studio" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
studio = client.Studio.list()
puts studio
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = NexardaSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### NexardaSDK

```ruby
require_relative "Nexarda_sdk"
client = NexardaSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = NexardaSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### NexardaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `NexardaError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `console = client.Console`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` | Product description |
| `id` | `String` | Unique console identifier |
| `images` | `Array` | Product images |
| `manufacturer` | `String` | Manufacturer name |
| `name` | `String` | Console name |
| `releaseDate` | `String` | Release date |
| `specifications` | `Hash` | Technical specifications |
| `type` | `String` | Product type |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Console record (raises on error).
console = client.Console.load({ "id" => "console_id" })
```

#### Example: List

```ruby
# list returns an Array of Console records (raises on error).
consoles = client.Console.list
```


### Franchis

Create an instance: `franchis = client.Franchis`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` | Franchise description |
| `games` | `Array` | Game IDs included in franchise |
| `id` | `String` | Unique franchise identifier |
| `logo` | `String` | Franchise logo URL |
| `name` | `String` | Franchise name |
| `totalGames` | `Integer` | Total number of games in franchise |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Franchis record (raises on error).
franchis = client.Franchis.load({ "id" => "franchis_id" })
```

#### Example: List

```ruby
# list returns an Array of Franchis records (raises on error).
franchiss = client.Franchis.list
```


### Game

Create an instance: `game = client.Game`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageRating` | `String` | Age rating (e.g., ESRB, PEGI) |
| `coverImage` | `String` | Cover image URL |
| `description` | `String` | Game description |
| `developer` | `String` | Developer name |
| `franchiseId` | `String` | Associated franchise ID |
| `genres` | `Array` | Game genres |
| `id` | `String` | Unique game identifier |
| `name` | `String` | Game title |
| `platforms` | `Array` | Supported platforms |
| `publisher` | `String` | Publisher name |
| `releaseDate` | `String` | Release date |
| `screenshots` | `Array` | Screenshot URLs |
| `videos` | `Array` | Video media |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Game record (raises on error).
game = client.Game.load({ "id" => "game_id" })
```

#### Example: List

```ruby
# list returns an Array of Game records (raises on error).
games = client.Game.list
```


### Platform

Create an instance: `platform = client.Platform`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api` | `Hash` |  |
| `priceUpdates` | `Hash` |  |
| `status` | `String` | Overall platform status |
| `timestamp` | `String` | Status check timestamp |
| `website` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Platform record (raises on error).
platform = client.Platform.load()
```


### Price

Create an instance: `price = client.Price`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliateLink` | `String` | Affiliate link to retailer (do not modify) |
| `currency` | `String` | Currency code (GBP, EUR, USD) |
| `discount` | `Float` | Discount percentage |
| `inStock` | `Boolean` | Stock availability |
| `lastUpdated` | `String` | Last price update timestamp |
| `originalPrice` | `Float` | Original price before discount |
| `price` | `Float` | Current price |
| `region` | `String` | Region code |
| `retailerId` | `String` | Retailer identifier |
| `retailerName` | `String` | Retailer name |

#### Example: List

```ruby
# list returns an Array of Price records (raises on error).
prices = client.Price.list
```


### Retailer

Create an instance: `retailer = client.Retailer`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved` | `Boolean` | Approval status |
| `currencies` | `Array` | Supported currencies |
| `id` | `String` | Unique retailer identifier |
| `logo` | `String` | Retailer logo URL |
| `name` | `String` | Retailer name |
| `regions` | `Array` | Supported regions |
| `website` | `String` | Retailer website |

#### Example: List

```ruby
# list returns an Array of Retailer records (raises on error).
retailers = client.Retailer.list
```


### Search

Create an instance: `search = client.Search`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `consoles` | `Array` |  |
| `games` | `Array` |  |
| `totalResults` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Search record (raises on error).
search = client.Search.load()
```


### Studio

Create an instance: `studio = client.Studio`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` | Studio description |
| `foundingYear` | `Integer` | Year founded |
| `games` | `Array` | Released game IDs |
| `id` | `String` | Unique studio identifier |
| `location` | `Hash` | Studio location |
| `logo` | `String` | Studio logo URL |
| `name` | `String` | Studio name |
| `type` | `String` | Studio type |
| `website` | `String` | Official website |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Studio record (raises on error).
studio = client.Studio.load({ "id" => "studio_id" })
```

#### Example: List

```ruby
# list returns an Array of Studio records (raises on error).
studios = client.Studio.list
```


### User

Create an instance: `user = client.User`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageRating` | `String` | Age rating (e.g., ESRB, PEGI) |
| `avatar` | `String` | Avatar image URL |
| `coverImage` | `String` | Cover image URL |
| `description` | `String` | Game description |
| `developer` | `String` | Developer name |
| `franchiseId` | `String` | Associated franchise ID |
| `genres` | `Array` | Game genres |
| `id` | `String` | Unique user identifier |
| `joinDate` | `String` | Account creation date |
| `libraryCount` | `Integer` | Number of games in library |
| `name` | `String` | Game title |
| `platforms` | `Array` | Supported platforms |
| `publisher` | `String` | Publisher name |
| `releaseDate` | `String` | Release date |
| `screenshots` | `Array` | Screenshot URLs |
| `username` | `String` | Username |
| `videos` | `Array` | Video media |
| `wishlistCount` | `Integer` | Number of items in wishlist |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the User record (raises on error).
user = client.User.load({ "id" => "user_id" })
```

#### Example: List

```ruby
# list returns an Array of User records (raises on error).
users = client.User.list
```


### Widget

Create an instance: `widget = client.Widget`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Widget record (raises on error).
widget = client.Widget.load()
```


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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Nexarda_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Nexarda_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
studio = client.Studio
studio.list()

# studio.data_get now returns the studio data from the last list
# studio.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
