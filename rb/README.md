# Nexarda Ruby SDK



The Ruby SDK for the Nexarda API — an entity-oriented client using idiomatic Ruby conventions.

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

### 2. List consoles

```ruby
begin
  result = client.console.list
  if result.is_a?(Array)
    result.each do |item|
      d = item.data_get
      puts "#{d["id"]} #{d["name"]}"
    end
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a console

```ruby
begin
  result = client.console.load({ "id" => "example_id" })
  puts result
rescue => err
  warn "load failed: #{err}"
end
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
  warn result["err"]
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

Create a mock client for unit testing — no server required:

```ruby
client = NexardaSDK.test

result = client.console.load({ "id" => "test01" })
# result contains mock response data
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
| `User` | `(data) -> UserEntity` | Create a User entity instance. |
| `Widget` | `(data) -> WidgetEntity` | Create a Widget entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> Array` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
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
| `data` |  |
| `description` |  |
| `id` |  |
| `image` |  |
| `manufacturer` |  |
| `name` |  |
| `release_date` |  |
| `specification` |  |
| `success` |  |
| `type` |  |

Operations: List, Load.

API path: `/consoles`

#### Franchis

| Field | Description |
| --- | --- |
| `data` |  |
| `description` |  |
| `game` |  |
| `id` |  |
| `logo` |  |
| `name` |  |
| `success` |  |
| `total_game` |  |

Operations: List, Load.

API path: `/franchises`

#### Game

| Field | Description |
| --- | --- |
| `age_rating` |  |
| `cover_image` |  |
| `data` |  |
| `description` |  |
| `developer` |  |
| `franchise_id` |  |
| `genre` |  |
| `id` |  |
| `name` |  |
| `platform` |  |
| `publisher` |  |
| `release_date` |  |
| `screenshot` |  |
| `success` |  |
| `video` |  |

Operations: List, Load.

API path: `/games`

#### Platform

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: Load.

API path: `/status`

#### Price

| Field | Description |
| --- | --- |
| `affiliate_link` |  |
| `currency` |  |
| `discount` |  |
| `in_stock` |  |
| `last_updated` |  |
| `original_price` |  |
| `price` |  |
| `region` |  |
| `retailer_id` |  |
| `retailer_name` |  |

Operations: List.

API path: `/games/{gameId}/prices`

#### Retailer

| Field | Description |
| --- | --- |
| `approved` |  |
| `currency` |  |
| `id` |  |
| `logo` |  |
| `name` |  |
| `region` |  |
| `website` |  |

Operations: List.

API path: `/retailers`

#### Search

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: Load.

API path: `/search`

#### Studio

| Field | Description |
| --- | --- |
| `data` |  |
| `description` |  |
| `founding_year` |  |
| `game` |  |
| `id` |  |
| `location` |  |
| `logo` |  |
| `name` |  |
| `success` |  |
| `type` |  |
| `website` |  |

Operations: List, Load.

API path: `/studios`

#### User

| Field | Description |
| --- | --- |
| `age_rating` |  |
| `cover_image` |  |
| `data` |  |
| `description` |  |
| `developer` |  |
| `franchise_id` |  |
| `genre` |  |
| `id` |  |
| `name` |  |
| `platform` |  |
| `publisher` |  |
| `release_date` |  |
| `screenshot` |  |
| `success` |  |
| `video` |  |

Operations: List, Load.

API path: `/users/{userId}/library`

#### Widget

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/widgets/button`



## Entities


### Console

Create an instance: `const console = client.console`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `image` | ``$ARRAY`` |  |
| `manufacturer` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `release_date` | ``$STRING`` |  |
| `specification` | ``$OBJECT`` |  |
| `success` | ``$BOOLEAN`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```ts
const console = await client.console.load({ id: 'console_id' })
```

#### Example: List

```ts
const consoles = await client.console.list()
```


### Franchis

Create an instance: `const franchis = client.franchis`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |
| `description` | ``$STRING`` |  |
| `game` | ``$ARRAY`` |  |
| `id` | ``$STRING`` |  |
| `logo` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |
| `total_game` | ``$INTEGER`` |  |

#### Example: Load

```ts
const franchis = await client.franchis.load({ id: 'franchis_id' })
```

#### Example: List

```ts
const franchiss = await client.franchis.list()
```


### Game

Create an instance: `const game = client.game`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_rating` | ``$STRING`` |  |
| `cover_image` | ``$STRING`` |  |
| `data` | ``$OBJECT`` |  |
| `description` | ``$STRING`` |  |
| `developer` | ``$STRING`` |  |
| `franchise_id` | ``$STRING`` |  |
| `genre` | ``$ARRAY`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `platform` | ``$ARRAY`` |  |
| `publisher` | ``$STRING`` |  |
| `release_date` | ``$STRING`` |  |
| `screenshot` | ``$ARRAY`` |  |
| `success` | ``$BOOLEAN`` |  |
| `video` | ``$ARRAY`` |  |

#### Example: Load

```ts
const game = await client.game.load({ id: 'game_id' })
```

#### Example: List

```ts
const games = await client.game.list()
```


### Platform

Create an instance: `const platform = client.platform`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```ts
const platform = await client.platform.load({ id: 'platform_id' })
```


### Price

Create an instance: `const price = client.price`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliate_link` | ``$STRING`` |  |
| `currency` | ``$STRING`` |  |
| `discount` | ``$NUMBER`` |  |
| `in_stock` | ``$BOOLEAN`` |  |
| `last_updated` | ``$STRING`` |  |
| `original_price` | ``$NUMBER`` |  |
| `price` | ``$NUMBER`` |  |
| `region` | ``$STRING`` |  |
| `retailer_id` | ``$STRING`` |  |
| `retailer_name` | ``$STRING`` |  |

#### Example: List

```ts
const prices = await client.price.list()
```


### Retailer

Create an instance: `const retailer = client.retailer`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved` | ``$BOOLEAN`` |  |
| `currency` | ``$ARRAY`` |  |
| `id` | ``$STRING`` |  |
| `logo` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `region` | ``$ARRAY`` |  |
| `website` | ``$STRING`` |  |

#### Example: List

```ts
const retailers = await client.retailer.list()
```


### Search

Create an instance: `const search = client.search`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```ts
const search = await client.search.load({ id: 'search_id' })
```


### Studio

Create an instance: `const studio = client.studio`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |
| `description` | ``$STRING`` |  |
| `founding_year` | ``$INTEGER`` |  |
| `game` | ``$ARRAY`` |  |
| `id` | ``$STRING`` |  |
| `location` | ``$OBJECT`` |  |
| `logo` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |
| `type` | ``$STRING`` |  |
| `website` | ``$STRING`` |  |

#### Example: Load

```ts
const studio = await client.studio.load({ id: 'studio_id' })
```

#### Example: List

```ts
const studios = await client.studio.list()
```


### User

Create an instance: `const user = client.user`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_rating` | ``$STRING`` |  |
| `cover_image` | ``$STRING`` |  |
| `data` | ``$OBJECT`` |  |
| `description` | ``$STRING`` |  |
| `developer` | ``$STRING`` |  |
| `franchise_id` | ``$STRING`` |  |
| `genre` | ``$ARRAY`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `platform` | ``$ARRAY`` |  |
| `publisher` | ``$STRING`` |  |
| `release_date` | ``$STRING`` |  |
| `screenshot` | ``$ARRAY`` |  |
| `success` | ``$BOOLEAN`` |  |
| `video` | ``$ARRAY`` |  |

#### Example: Load

```ts
const user = await client.user.load({ id: 'user_id' })
```

#### Example: List

```ts
const users = await client.user.list()
```


### Widget

Create an instance: `const widget = client.widget`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const widget = await client.widget.load({ id: 'widget_id' })
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as a second return value.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
console = client.console
console.load({ "id" => "example_id" })

# console.data_get now returns the loaded console data
# console.match_get returns the last match criteria
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
