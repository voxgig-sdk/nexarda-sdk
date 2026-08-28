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
| `description` | `string` | No | Product description |
| `id` | `string` | No | Unique console identifier |
| `images` | `[]any` | No | Product images |
| `manufacturer` | `string` | No | Manufacturer name |
| `name` | `string` | No | Console name |
| `releaseDate` | `string` | No | Release date |
| `specifications` | `map[string]any` | No | Technical specifications |
| `type` | `string` | No | Product type |

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
| `description` | `string` | No | Franchise description |
| `games` | `[]any` | No | Game IDs included in franchise |
| `id` | `string` | No | Unique franchise identifier |
| `logo` | `string` | No | Franchise logo URL |
| `name` | `string` | No | Franchise name |
| `totalGames` | `int` | No | Total number of games in franchise |

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
| `ageRating` | `string` | No | Age rating (e.g., ESRB, PEGI) |
| `coverImage` | `string` | No | Cover image URL |
| `description` | `string` | No | Game description |
| `developer` | `string` | No | Developer name |
| `franchiseId` | `string` | No | Associated franchise ID |
| `genres` | `[]any` | No | Game genres |
| `id` | `string` | No | Unique game identifier |
| `name` | `string` | No | Game title |
| `platforms` | `[]any` | No | Supported platforms |
| `publisher` | `string` | No | Publisher name |
| `releaseDate` | `string` | No | Release date |
| `screenshots` | `[]any` | No | Screenshot URLs |
| `videos` | `[]any` | No | Video media |

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
| `api` | `map[string]any` | No |  |
| `priceUpdates` | `map[string]any` | No |  |
| `status` | `string` | No | Overall platform status |
| `timestamp` | `string` | No | Status check timestamp |
| `website` | `map[string]any` | No |  |

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
| `affiliateLink` | `string` | No | Affiliate link to retailer (do not modify) |
| `currency` | `string` | No | Currency code (GBP, EUR, USD) |
| `discount` | `float64` | No | Discount percentage |
| `inStock` | `bool` | No | Stock availability |
| `lastUpdated` | `string` | No | Last price update timestamp |
| `originalPrice` | `float64` | No | Original price before discount |
| `price` | `float64` | No | Current price |
| `region` | `string` | No | Region code |
| `retailerId` | `string` | No | Retailer identifier |
| `retailerName` | `string` | No | Retailer name |

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
| `approved` | `bool` | No | Approval status |
| `currencies` | `[]any` | No | Supported currencies |
| `id` | `string` | No | Unique retailer identifier |
| `logo` | `string` | No | Retailer logo URL |
| `name` | `string` | No | Retailer name |
| `regions` | `[]any` | No | Supported regions |
| `website` | `string` | No | Retailer website |

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
| `consoles` | `[]any` | No |  |
| `games` | `[]any` | No |  |
| `totalResults` | `int` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Search(nil).Load(map[string]any{"q": "q"}, nil)
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
| `description` | `string` | No | Studio description |
| `foundingYear` | `int` | No | Year founded |
| `games` | `[]any` | No | Released game IDs |
| `id` | `string` | No | Unique studio identifier |
| `location` | `map[string]any` | No | Studio location |
| `logo` | `string` | No | Studio logo URL |
| `name` | `string` | No | Studio name |
| `type` | `string` | No | Studio type |
| `website` | `string` | No | Official website |

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
| `ageRating` | `string` | No | Age rating (e.g., ESRB, PEGI) |
| `avatar` | `string` | No | Avatar image URL |
| `coverImage` | `string` | No | Cover image URL |
| `description` | `string` | No | Game description |
| `developer` | `string` | No | Developer name |
| `franchiseId` | `string` | No | Associated franchise ID |
| `genres` | `[]any` | No | Game genres |
| `id` | `string` | No | Unique user identifier |
| `joinDate` | `string` | No | Account creation date |
| `libraryCount` | `int` | No | Number of games in library |
| `name` | `string` | No | Game title |
| `platforms` | `[]any` | No | Supported platforms |
| `publisher` | `string` | No | Publisher name |
| `releaseDate` | `string` | No | Release date |
| `screenshots` | `[]any` | No | Screenshot URLs |
| `username` | `string` | No | Username |
| `videos` | `[]any` | No | Video media |
| `wishlistCount` | `int` | No | Number of items in wishlist |

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
result, err := client.Widget(nil).Load(map[string]any{"product_id": "product_id"}, nil)
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

