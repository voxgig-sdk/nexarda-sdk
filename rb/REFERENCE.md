# Nexarda Ruby SDK Reference

Complete API reference for the Nexarda Ruby SDK.


## NexardaSDK

### Constructor

```ruby
require_relative 'Nexarda_sdk'

client = NexardaSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NexardaSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = NexardaSDK.test
```


### Instance Methods

#### `Console(data = nil)`

Create a new `Console` entity instance. Pass `nil` for no initial data.

#### `Franchis(data = nil)`

Create a new `Franchis` entity instance. Pass `nil` for no initial data.

#### `Game(data = nil)`

Create a new `Game` entity instance. Pass `nil` for no initial data.

#### `Platform(data = nil)`

Create a new `Platform` entity instance. Pass `nil` for no initial data.

#### `Price(data = nil)`

Create a new `Price` entity instance. Pass `nil` for no initial data.

#### `Retailer(data = nil)`

Create a new `Retailer` entity instance. Pass `nil` for no initial data.

#### `Search(data = nil)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `Studio(data = nil)`

Create a new `Studio` entity instance. Pass `nil` for no initial data.

#### `User(data = nil)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `Widget(data = nil)`

Create a new `Widget` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ConsoleEntity

```ruby
console = client.Console
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No |  |
| `id` | `String` | No |  |
| `images` | `Array` | No |  |
| `manufacturer` | `String` | No |  |
| `name` | `String` | No |  |
| `releaseDate` | `String` | No |  |
| `specifications` | `Hash` | No |  |
| `type` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Console.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Console.load({ "id" => "console_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ConsoleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FranchisEntity

```ruby
franchis = client.Franchis
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No |  |
| `games` | `Array` | No |  |
| `id` | `String` | No |  |
| `logo` | `String` | No |  |
| `name` | `String` | No |  |
| `totalGames` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Franchis.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Franchis.load({ "id" => "franchis_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FranchisEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GameEntity

```ruby
game = client.Game
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageRating` | `String` | No |  |
| `coverImage` | `String` | No |  |
| `description` | `String` | No |  |
| `developer` | `String` | No |  |
| `franchiseId` | `String` | No |  |
| `genres` | `Array` | No |  |
| `id` | `String` | No |  |
| `name` | `String` | No |  |
| `platforms` | `Array` | No |  |
| `publisher` | `String` | No |  |
| `releaseDate` | `String` | No |  |
| `screenshots` | `Array` | No |  |
| `videos` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Game.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Game.load({ "id" => "game_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GameEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PlatformEntity

```ruby
platform = client.Platform
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api` | `Hash` | No |  |
| `priceUpdates` | `Hash` | No |  |
| `status` | `String` | No |  |
| `timestamp` | `String` | No |  |
| `website` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Platform.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PlatformEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PriceEntity

```ruby
price = client.Price
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affiliateLink` | `String` | No |  |
| `currency` | `String` | No |  |
| `discount` | `Float` | No |  |
| `inStock` | `Boolean` | No |  |
| `lastUpdated` | `String` | No |  |
| `originalPrice` | `Float` | No |  |
| `price` | `Float` | No |  |
| `region` | `String` | No |  |
| `retailerId` | `String` | No |  |
| `retailerName` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Price.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PriceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RetailerEntity

```ruby
retailer = client.Retailer
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved` | `Boolean` | No |  |
| `currencies` | `Array` | No |  |
| `id` | `String` | No |  |
| `logo` | `String` | No |  |
| `name` | `String` | No |  |
| `regions` | `Array` | No |  |
| `website` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Retailer.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RetailerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SearchEntity

```ruby
search = client.Search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `consoles` | `Array` | No |  |
| `games` | `Array` | No |  |
| `totalResults` | `Integer` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Search.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StudioEntity

```ruby
studio = client.Studio
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No |  |
| `foundingYear` | `Integer` | No |  |
| `games` | `Array` | No |  |
| `id` | `String` | No |  |
| `location` | `Hash` | No |  |
| `logo` | `String` | No |  |
| `name` | `String` | No |  |
| `type` | `String` | No |  |
| `website` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Studio.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Studio.load({ "id" => "studio_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StudioEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UserEntity

```ruby
user = client.User
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageRating` | `String` | No |  |
| `avatar` | `String` | No |  |
| `coverImage` | `String` | No |  |
| `description` | `String` | No |  |
| `developer` | `String` | No |  |
| `franchiseId` | `String` | No |  |
| `genres` | `Array` | No |  |
| `id` | `String` | No |  |
| `joinDate` | `String` | No |  |
| `libraryCount` | `Integer` | No |  |
| `name` | `String` | No |  |
| `platforms` | `Array` | No |  |
| `publisher` | `String` | No |  |
| `releaseDate` | `String` | No |  |
| `screenshots` | `Array` | No |  |
| `username` | `String` | No |  |
| `videos` | `Array` | No |  |
| `wishlistCount` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.User.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.User.load({ "id" => "user_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WidgetEntity

```ruby
widget = client.Widget
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Widget.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WidgetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = NexardaSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

