# Nexarda Ruby SDK Reference

Complete API reference for the Nexarda Ruby SDK.


## NexardaSDK

### Constructor

```ruby
require_relative 'nexarda_sdk'

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

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

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

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## ConsoleEntity

```ruby
console = client.Console
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `image` | ``$ARRAY`` | No |  |
| `manufacturer` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `release_date` | ``$STRING`` | No |  |
| `specification` | ``$OBJECT`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Console.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Console.load({ "id" => "console_id" })
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
| `data` | ``$OBJECT`` | No |  |
| `description` | ``$STRING`` | No |  |
| `game` | ``$ARRAY`` | No |  |
| `id` | ``$STRING`` | No |  |
| `logo` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |
| `total_game` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Franchis.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Franchis.load({ "id" => "franchis_id" })
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
| `age_rating` | ``$STRING`` | No |  |
| `cover_image` | ``$STRING`` | No |  |
| `data` | ``$OBJECT`` | No |  |
| `description` | ``$STRING`` | No |  |
| `developer` | ``$STRING`` | No |  |
| `franchise_id` | ``$STRING`` | No |  |
| `genre` | ``$ARRAY`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `platform` | ``$ARRAY`` | No |  |
| `publisher` | ``$STRING`` | No |  |
| `release_date` | ``$STRING`` | No |  |
| `screenshot` | ``$ARRAY`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |
| `video` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Game.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Game.load({ "id" => "game_id" })
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
| `data` | ``$OBJECT`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Platform.load({ "id" => "platform_id" })
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
| `affiliate_link` | ``$STRING`` | No |  |
| `currency` | ``$STRING`` | No |  |
| `discount` | ``$NUMBER`` | No |  |
| `in_stock` | ``$BOOLEAN`` | No |  |
| `last_updated` | ``$STRING`` | No |  |
| `original_price` | ``$NUMBER`` | No |  |
| `price` | ``$NUMBER`` | No |  |
| `region` | ``$STRING`` | No |  |
| `retailer_id` | ``$STRING`` | No |  |
| `retailer_name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Price.list(nil)
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
| `approved` | ``$BOOLEAN`` | No |  |
| `currency` | ``$ARRAY`` | No |  |
| `id` | ``$STRING`` | No |  |
| `logo` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `region` | ``$ARRAY`` | No |  |
| `website` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Retailer.list(nil)
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
| `data` | ``$OBJECT`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Search.load({ "id" => "search_id" })
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
| `data` | ``$OBJECT`` | No |  |
| `description` | ``$STRING`` | No |  |
| `founding_year` | ``$INTEGER`` | No |  |
| `game` | ``$ARRAY`` | No |  |
| `id` | ``$STRING`` | No |  |
| `location` | ``$OBJECT`` | No |  |
| `logo` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |
| `type` | ``$STRING`` | No |  |
| `website` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Studio.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Studio.load({ "id" => "studio_id" })
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
| `age_rating` | ``$STRING`` | No |  |
| `cover_image` | ``$STRING`` | No |  |
| `data` | ``$OBJECT`` | No |  |
| `description` | ``$STRING`` | No |  |
| `developer` | ``$STRING`` | No |  |
| `franchise_id` | ``$STRING`` | No |  |
| `genre` | ``$ARRAY`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `platform` | ``$ARRAY`` | No |  |
| `publisher` | ``$STRING`` | No |  |
| `release_date` | ``$STRING`` | No |  |
| `screenshot` | ``$ARRAY`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |
| `video` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.User.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.User.load({ "id" => "user_id" })
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

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Widget.load({ "id" => "widget_id" })
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

