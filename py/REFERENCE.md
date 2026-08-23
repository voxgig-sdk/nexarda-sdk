# Nexarda Python SDK Reference

Complete API reference for the Nexarda Python SDK.


## NexardaSDK

### Constructor

```python
from nexarda_sdk import NexardaSDK

client = NexardaSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NexardaSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = NexardaSDK.test()
```


### Instance Methods

#### `Console(data=None)`

Create a new `ConsoleEntity` instance. Pass `None` for no initial data.

#### `Franchis(data=None)`

Create a new `FranchisEntity` instance. Pass `None` for no initial data.

#### `Game(data=None)`

Create a new `GameEntity` instance. Pass `None` for no initial data.

#### `Platform(data=None)`

Create a new `PlatformEntity` instance. Pass `None` for no initial data.

#### `Price(data=None)`

Create a new `PriceEntity` instance. Pass `None` for no initial data.

#### `Retailer(data=None)`

Create a new `RetailerEntity` instance. Pass `None` for no initial data.

#### `Search(data=None)`

Create a new `SearchEntity` instance. Pass `None` for no initial data.

#### `Studio(data=None)`

Create a new `StudioEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `Widget(data=None)`

Create a new `WidgetEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ConsoleEntity

```python
console = client.Console()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No | Product description |
| `id` | `str` | No | Unique console identifier |
| `images` | `list` | No | Product images |
| `manufacturer` | `str` | No | Manufacturer name |
| `name` | `str` | No | Console name |
| `releaseDate` | `str` | No | Release date |
| `specifications` | `dict` | No | Technical specifications |
| `type` | `str` | No | Product type |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Console().list()
for console in results:
    print(console)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Console().load({"id": "console_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConsoleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FranchisEntity

```python
franchis = client.Franchis()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No | Franchise description |
| `games` | `list` | No | Game IDs included in franchise |
| `id` | `str` | No | Unique franchise identifier |
| `logo` | `str` | No | Franchise logo URL |
| `name` | `str` | No | Franchise name |
| `totalGames` | `int` | No | Total number of games in franchise |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Franchis().list()
for franchis in results:
    print(franchis)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Franchis().load({"id": "franchis_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FranchisEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GameEntity

```python
game = client.Game()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageRating` | `str` | No | Age rating (e.g., ESRB, PEGI) |
| `coverImage` | `str` | No | Cover image URL |
| `description` | `str` | No | Game description |
| `developer` | `str` | No | Developer name |
| `franchiseId` | `str` | No | Associated franchise ID |
| `genres` | `list` | No | Game genres |
| `id` | `str` | No | Unique game identifier |
| `name` | `str` | No | Game title |
| `platforms` | `list` | No | Supported platforms |
| `publisher` | `str` | No | Publisher name |
| `releaseDate` | `str` | No | Release date |
| `screenshots` | `list` | No | Screenshot URLs |
| `videos` | `list` | No | Video media |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Game().list()
for game in results:
    print(game)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Game().load({"id": "game_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GameEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PlatformEntity

```python
platform = client.Platform()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api` | `dict` | No |  |
| `priceUpdates` | `dict` | No |  |
| `status` | `str` | No | Overall platform status |
| `timestamp` | `str` | No | Status check timestamp |
| `website` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Platform().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlatformEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PriceEntity

```python
price = client.Price()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affiliateLink` | `str` | No | Affiliate link to retailer (do not modify) |
| `currency` | `str` | No | Currency code (GBP, EUR, USD) |
| `discount` | `float` | No | Discount percentage |
| `inStock` | `bool` | No | Stock availability |
| `lastUpdated` | `str` | No | Last price update timestamp |
| `originalPrice` | `float` | No | Original price before discount |
| `price` | `float` | No | Current price |
| `region` | `str` | No | Region code |
| `retailerId` | `str` | No | Retailer identifier |
| `retailerName` | `str` | No | Retailer name |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Price().list({"game_id": "example"})
for price in results:
    print(price)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PriceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RetailerEntity

```python
retailer = client.Retailer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved` | `bool` | No | Approval status |
| `currencies` | `list` | No | Supported currencies |
| `id` | `str` | No | Unique retailer identifier |
| `logo` | `str` | No | Retailer logo URL |
| `name` | `str` | No | Retailer name |
| `regions` | `list` | No | Supported regions |
| `website` | `str` | No | Retailer website |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Retailer().list()
for retailer in results:
    print(retailer)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RetailerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SearchEntity

```python
search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `consoles` | `list` | No |  |
| `games` | `list` | No |  |
| `totalResults` | `int` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Search().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StudioEntity

```python
studio = client.Studio()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No | Studio description |
| `foundingYear` | `int` | No | Year founded |
| `games` | `list` | No | Released game IDs |
| `id` | `str` | No | Unique studio identifier |
| `location` | `dict` | No | Studio location |
| `logo` | `str` | No | Studio logo URL |
| `name` | `str` | No | Studio name |
| `type` | `str` | No | Studio type |
| `website` | `str` | No | Official website |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Studio().list()
for studio in results:
    print(studio)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Studio().load({"id": "studio_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StudioEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageRating` | `str` | No | Age rating (e.g., ESRB, PEGI) |
| `avatar` | `str` | No | Avatar image URL |
| `coverImage` | `str` | No | Cover image URL |
| `description` | `str` | No | Game description |
| `developer` | `str` | No | Developer name |
| `franchiseId` | `str` | No | Associated franchise ID |
| `genres` | `list` | No | Game genres |
| `id` | `str` | No | Unique user identifier |
| `joinDate` | `str` | No | Account creation date |
| `libraryCount` | `int` | No | Number of games in library |
| `name` | `str` | No | Game title |
| `platforms` | `list` | No | Supported platforms |
| `publisher` | `str` | No | Publisher name |
| `releaseDate` | `str` | No | Release date |
| `screenshots` | `list` | No | Screenshot URLs |
| `username` | `str` | No | Username |
| `videos` | `list` | No | Video media |
| `wishlistCount` | `int` | No | Number of items in wishlist |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.User().list({"id": "example_id"})
for user in results:
    print(user)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.User().load({"id": "user_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WidgetEntity

```python
widget = client.Widget()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Widget().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WidgetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = NexardaSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

