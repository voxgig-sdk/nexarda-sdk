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
| `description` | `String` | No | Product description |
| `id` | `String` | No | Unique console identifier |
| `images` | `Array` | No | Product images |
| `manufacturer` | `String` | No | Manufacturer name |
| `name` | `String` | No | Console name |
| `releaseDate` | `String` | No | Release date |
| `specifications` | `Hash` | No | Technical specifications |
| `type` | `String` | No | Product type |

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
| `description` | `String` | No | Franchise description |
| `games` | `Array` | No | Game IDs included in franchise |
| `id` | `String` | No | Unique franchise identifier |
| `logo` | `String` | No | Franchise logo URL |
| `name` | `String` | No | Franchise name |
| `totalGames` | `Integer` | No | Total number of games in franchise |

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
| `ageRating` | `String` | No | Age rating (e.g., ESRB, PEGI) |
| `coverImage` | `String` | No | Cover image URL |
| `description` | `String` | No | Game description |
| `developer` | `String` | No | Developer name |
| `franchiseId` | `String` | No | Associated franchise ID |
| `genres` | `Array` | No | Game genres |
| `id` | `String` | No | Unique game identifier |
| `name` | `String` | No | Game title |
| `platforms` | `Array` | No | Supported platforms |
| `publisher` | `String` | No | Publisher name |
| `releaseDate` | `String` | No | Release date |
| `screenshots` | `Array` | No | Screenshot URLs |
| `videos` | `Array` | No | Video media |

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
| `status` | `String` | No | Overall platform status |
| `timestamp` | `String` | No | Status check timestamp |
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
| `affiliateLink` | `String` | No | Affiliate link to retailer (do not modify) |
| `currency` | `String` | No | Currency code (GBP, EUR, USD) |
| `discount` | `Float` | No | Discount percentage |
| `inStock` | `Boolean` | No | Stock availability |
| `lastUpdated` | `String` | No | Last price update timestamp |
| `originalPrice` | `Float` | No | Original price before discount |
| `price` | `Float` | No | Current price |
| `region` | `String` | No | Region code |
| `retailerId` | `String` | No | Retailer identifier |
| `retailerName` | `String` | No | Retailer name |

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
| `approved` | `Boolean` | No | Approval status |
| `currencies` | `Array` | No | Supported currencies |
| `id` | `String` | No | Unique retailer identifier |
| `logo` | `String` | No | Retailer logo URL |
| `name` | `String` | No | Retailer name |
| `regions` | `Array` | No | Supported regions |
| `website` | `String` | No | Retailer website |

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
result = client.Search.load({ "q" => "q" })
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
| `description` | `String` | No | Studio description |
| `foundingYear` | `Integer` | No | Year founded |
| `games` | `Array` | No | Released game IDs |
| `id` | `String` | No | Unique studio identifier |
| `location` | `Hash` | No | Studio location |
| `logo` | `String` | No | Studio logo URL |
| `name` | `String` | No | Studio name |
| `type` | `String` | No | Studio type |
| `website` | `String` | No | Official website |

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
| `ageRating` | `String` | No | Age rating (e.g., ESRB, PEGI) |
| `avatar` | `String` | No | Avatar image URL |
| `coverImage` | `String` | No | Cover image URL |
| `description` | `String` | No | Game description |
| `developer` | `String` | No | Developer name |
| `franchiseId` | `String` | No | Associated franchise ID |
| `genres` | `Array` | No | Game genres |
| `id` | `String` | No | Unique user identifier |
| `joinDate` | `String` | No | Account creation date |
| `libraryCount` | `Integer` | No | Number of games in library |
| `name` | `String` | No | Game title |
| `platforms` | `Array` | No | Supported platforms |
| `publisher` | `String` | No | Publisher name |
| `releaseDate` | `String` | No | Release date |
| `screenshots` | `Array` | No | Screenshot URLs |
| `username` | `String` | No | Username |
| `videos` | `Array` | No | Video media |
| `wishlistCount` | `Integer` | No | Number of items in wishlist |

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
result = client.Widget.load({ "product_id" => "product_id" })
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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

