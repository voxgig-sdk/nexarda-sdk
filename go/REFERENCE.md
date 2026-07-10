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

#### `Test() *NexardaSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *NexardaSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
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
fmt.Println(console.GetName()) // "console"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `map[string]any` | No |  |
| `description` | `string` | No |  |
| `id` | `string` | No |  |
| `image` | `[]any` | No |  |
| `manufacturer` | `string` | No |  |
| `name` | `string` | No |  |
| `release_date` | `string` | No |  |
| `specification` | `map[string]any` | No |  |
| `success` | `bool` | No |  |
| `type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Console(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Console(nil).Load(map[string]any{"id": "console_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(franchis.GetName()) // "franchis"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `map[string]any` | No |  |
| `description` | `string` | No |  |
| `game` | `[]any` | No |  |
| `id` | `string` | No |  |
| `logo` | `string` | No |  |
| `name` | `string` | No |  |
| `success` | `bool` | No |  |
| `total_game` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Franchis(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Franchis(nil).Load(map[string]any{"id": "franchis_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(game.GetName()) // "game"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age_rating` | `string` | No |  |
| `cover_image` | `string` | No |  |
| `data` | `map[string]any` | No |  |
| `description` | `string` | No |  |
| `developer` | `string` | No |  |
| `franchise_id` | `string` | No |  |
| `genre` | `[]any` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `platform` | `[]any` | No |  |
| `publisher` | `string` | No |  |
| `release_date` | `string` | No |  |
| `screenshot` | `[]any` | No |  |
| `success` | `bool` | No |  |
| `video` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Game(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Game(nil).Load(map[string]any{"id": "game_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(platform.GetName()) // "platform"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `map[string]any` | No |  |
| `success` | `bool` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Platform(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(price.GetName()) // "price"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affiliate_link` | `string` | No |  |
| `currency` | `string` | No |  |
| `discount` | `float64` | No |  |
| `in_stock` | `bool` | No |  |
| `last_updated` | `string` | No |  |
| `original_price` | `float64` | No |  |
| `price` | `float64` | No |  |
| `region` | `string` | No |  |
| `retailer_id` | `string` | No |  |
| `retailer_name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Price(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
fmt.Println(retailer.GetName()) // "retailer"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved` | `bool` | No |  |
| `currency` | `[]any` | No |  |
| `id` | `string` | No |  |
| `logo` | `string` | No |  |
| `name` | `string` | No |  |
| `region` | `[]any` | No |  |
| `website` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Retailer(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
fmt.Println(search.GetName()) // "search"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `map[string]any` | No |  |
| `success` | `bool` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Search(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(studio.GetName()) // "studio"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `map[string]any` | No |  |
| `description` | `string` | No |  |
| `founding_year` | `int` | No |  |
| `game` | `[]any` | No |  |
| `id` | `string` | No |  |
| `location` | `map[string]any` | No |  |
| `logo` | `string` | No |  |
| `name` | `string` | No |  |
| `success` | `bool` | No |  |
| `type` | `string` | No |  |
| `website` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Studio(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Studio(nil).Load(map[string]any{"id": "studio_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(user.GetName()) // "user"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age_rating` | `string` | No |  |
| `cover_image` | `string` | No |  |
| `data` | `map[string]any` | No |  |
| `description` | `string` | No |  |
| `developer` | `string` | No |  |
| `franchise_id` | `string` | No |  |
| `genre` | `[]any` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `platform` | `[]any` | No |  |
| `publisher` | `string` | No |  |
| `release_date` | `string` | No |  |
| `screenshot` | `[]any` | No |  |
| `success` | `bool` | No |  |
| `video` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.User(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(widget.GetName()) // "widget"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Widget(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

