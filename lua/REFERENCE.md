# Nexarda Lua SDK Reference

Complete API reference for the Nexarda Lua SDK.


## NexardaSDK

### Constructor

```lua
local sdk = require("nexarda_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Console(data)`

Create a new `Console` entity instance. Pass `nil` for no initial data.

#### `Franchis(data)`

Create a new `Franchis` entity instance. Pass `nil` for no initial data.

#### `Game(data)`

Create a new `Game` entity instance. Pass `nil` for no initial data.

#### `Platform(data)`

Create a new `Platform` entity instance. Pass `nil` for no initial data.

#### `Price(data)`

Create a new `Price` entity instance. Pass `nil` for no initial data.

#### `Retailer(data)`

Create a new `Retailer` entity instance. Pass `nil` for no initial data.

#### `Search(data)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `Studio(data)`

Create a new `Studio` entity instance. Pass `nil` for no initial data.

#### `User(data)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `Widget(data)`

Create a new `Widget` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## ConsoleEntity

```lua
local console = client:Console(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Product description |
| `id` | `string` | No | Unique console identifier |
| `images` | `table` | No | Product images |
| `manufacturer` | `string` | No | Manufacturer name |
| `name` | `string` | No | Console name |
| `releaseDate` | `string` | No | Release date |
| `specifications` | `table` | No | Technical specifications |
| `type` | `string` | No | Product type |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Console():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Console():load({ id = "console_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConsoleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FranchisEntity

```lua
local franchis = client:Franchis(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Franchise description |
| `games` | `table` | No | Game IDs included in franchise |
| `id` | `string` | No | Unique franchise identifier |
| `logo` | `string` | No | Franchise logo URL |
| `name` | `string` | No | Franchise name |
| `totalGames` | `number` | No | Total number of games in franchise |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Franchis():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Franchis():load({ id = "franchis_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FranchisEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GameEntity

```lua
local game = client:Game(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageRating` | `string` | No | Age rating (e.g., ESRB, PEGI) |
| `coverImage` | `string` | No | Cover image URL |
| `description` | `string` | No | Game description |
| `developer` | `string` | No | Developer name |
| `franchiseId` | `string` | No | Associated franchise ID |
| `genres` | `table` | No | Game genres |
| `id` | `string` | No | Unique game identifier |
| `name` | `string` | No | Game title |
| `platforms` | `table` | No | Supported platforms |
| `publisher` | `string` | No | Publisher name |
| `releaseDate` | `string` | No | Release date |
| `screenshots` | `table` | No | Screenshot URLs |
| `videos` | `table` | No | Video media |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Game():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Game():load({ id = "game_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GameEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PlatformEntity

```lua
local platform = client:Platform(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api` | `table` | No |  |
| `priceUpdates` | `table` | No |  |
| `status` | `string` | No | Overall platform status |
| `timestamp` | `string` | No | Status check timestamp |
| `website` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Platform():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlatformEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PriceEntity

```lua
local price = client:Price(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affiliateLink` | `string` | No | Affiliate link to retailer (do not modify) |
| `currency` | `string` | No | Currency code (GBP, EUR, USD) |
| `discount` | `number` | No | Discount percentage |
| `inStock` | `boolean` | No | Stock availability |
| `lastUpdated` | `string` | No | Last price update timestamp |
| `originalPrice` | `number` | No | Original price before discount |
| `price` | `number` | No | Current price |
| `region` | `string` | No | Region code |
| `retailerId` | `string` | No | Retailer identifier |
| `retailerName` | `string` | No | Retailer name |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Price():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PriceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RetailerEntity

```lua
local retailer = client:Retailer(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved` | `boolean` | No | Approval status |
| `currencies` | `table` | No | Supported currencies |
| `id` | `string` | No | Unique retailer identifier |
| `logo` | `string` | No | Retailer logo URL |
| `name` | `string` | No | Retailer name |
| `regions` | `table` | No | Supported regions |
| `website` | `string` | No | Retailer website |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Retailer():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RetailerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SearchEntity

```lua
local search = client:Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `consoles` | `table` | No |  |
| `games` | `table` | No |  |
| `totalResults` | `number` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Search():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StudioEntity

```lua
local studio = client:Studio(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Studio description |
| `foundingYear` | `number` | No | Year founded |
| `games` | `table` | No | Released game IDs |
| `id` | `string` | No | Unique studio identifier |
| `location` | `table` | No | Studio location |
| `logo` | `string` | No | Studio logo URL |
| `name` | `string` | No | Studio name |
| `type` | `string` | No | Studio type |
| `website` | `string` | No | Official website |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Studio():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Studio():load({ id = "studio_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StudioEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserEntity

```lua
local user = client:User(nil)
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
| `genres` | `table` | No | Game genres |
| `id` | `string` | No | Unique user identifier |
| `joinDate` | `string` | No | Account creation date |
| `libraryCount` | `number` | No | Number of games in library |
| `name` | `string` | No | Game title |
| `platforms` | `table` | No | Supported platforms |
| `publisher` | `string` | No | Publisher name |
| `releaseDate` | `string` | No | Release date |
| `screenshots` | `table` | No | Screenshot URLs |
| `username` | `string` | No | Username |
| `videos` | `table` | No | Video media |
| `wishlistCount` | `number` | No | Number of items in wishlist |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:User():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:User():load({ id = "user_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WidgetEntity

```lua
local widget = client:Widget(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Widget():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WidgetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

