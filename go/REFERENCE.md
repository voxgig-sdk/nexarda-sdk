# Nexarda Golang SDK Reference

Complete API reference for the Nexarda Golang SDK.


## NexardaSDK

### Constructor

```go
func NewNexardaSDK(options map[string]any) *NexardaSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TestSDK(testopts, sdkopts map[string]any) *NexardaSDK`

Create a test client with mock features active. Both arguments may be `nil`.

```go
client := sdk.TestSDK(nil, nil)
```


### Instance Methods

#### `Console(data map[string]any) NexardaEntity`

Create a new `Console` entity instance. Pass `nil` for no initial data.

#### `Franchis(data map[string]any) NexardaEntity`

Create a new `Franchis` entity instance. Pass `nil` for no initial data.

#### `Game(data map[string]any) NexardaEntity`

Create a new `Game` entity instance. Pass `nil` for no initial data.

#### `Platform(data map[string]any) NexardaEntity`

Create a new `Platform` entity instance. Pass `nil` for no initial data.

#### `Price(data map[string]any) NexardaEntity`

Create a new `Price` entity instance. Pass `nil` for no initial data.

#### `Retailer(data map[string]any) NexardaEntity`

Create a new `Retailer` entity instance. Pass `nil` for no initial data.

#### `Search(data map[string]any) NexardaEntity`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `Studio(data map[string]any) NexardaEntity`

Create a new `Studio` entity instance. Pass `nil` for no initial data.

#### `User(data map[string]any) NexardaEntity`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `Widget(data map[string]any) NexardaEntity`

Create a new `Widget` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ConsoleEntity

```go
console := client.Console(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Console(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Console(nil).Load(map[string]any{"id": "console_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ConsoleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FranchisEntity

```go
franchis := client.Franchis(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Franchis(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Franchis(nil).Load(map[string]any{"id": "franchis_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FranchisEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GameEntity

```go
game := client.Game(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Game(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Game(nil).Load(map[string]any{"id": "game_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GameEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PlatformEntity

```go
platform := client.Platform(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Platform(nil).Load(map[string]any{"id": "platform_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PlatformEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PriceEntity

```go
price := client.Price(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Price(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PriceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RetailerEntity

```go
retailer := client.Retailer(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Retailer(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RetailerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SearchEntity

```go
search := client.Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Search(nil).Load(map[string]any{"id": "search_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StudioEntity

```go
studio := client.Studio(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Studio(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Studio(nil).Load(map[string]any{"id": "studio_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StudioEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserEntity

```go
user := client.User(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.User(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WidgetEntity

```go
widget := client.Widget(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Widget(nil).Load(map[string]any{"id": "widget_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WidgetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewNexardaSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

