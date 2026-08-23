# Nexarda Python SDK



The Python SDK for the Nexarda API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Console()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/nexarda-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from nexarda_sdk import NexardaSDK

client = NexardaSDK({
    "apikey": os.environ.get("NEXARDA_APIKEY"),
})
```

### 2. List console records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    consoles = client.Console().list()
    for console in consoles:
        print(console)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a console

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    console = client.Console().load({"id": "example_id"})
    print(console)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    studios = client.Studio().list()
    print(studios)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = NexardaSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
studio = client.Studio().list()
# studio contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = NexardaSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### NexardaSDK

```python
from nexarda_sdk import NexardaSDK

client = NexardaSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = NexardaSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### NexardaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `console = client.Console()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Product description |
| `id` | `str` | Unique console identifier |
| `images` | `list` | Product images |
| `manufacturer` | `str` | Manufacturer name |
| `name` | `str` | Console name |
| `releaseDate` | `str` | Release date |
| `specifications` | `dict` | Technical specifications |
| `type` | `str` | Product type |

#### Example: Load

```python
console = client.Console().load({"id": "console_id"})
```

#### Example: List

```python
consoles = client.Console().list()
```


### Franchis

Create an instance: `franchis = client.Franchis()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Franchise description |
| `games` | `list` | Game IDs included in franchise |
| `id` | `str` | Unique franchise identifier |
| `logo` | `str` | Franchise logo URL |
| `name` | `str` | Franchise name |
| `totalGames` | `int` | Total number of games in franchise |

#### Example: Load

```python
franchis = client.Franchis().load({"id": "franchis_id"})
```

#### Example: List

```python
franchiss = client.Franchis().list()
```


### Game

Create an instance: `game = client.Game()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageRating` | `str` | Age rating (e.g., ESRB, PEGI) |
| `coverImage` | `str` | Cover image URL |
| `description` | `str` | Game description |
| `developer` | `str` | Developer name |
| `franchiseId` | `str` | Associated franchise ID |
| `genres` | `list` | Game genres |
| `id` | `str` | Unique game identifier |
| `name` | `str` | Game title |
| `platforms` | `list` | Supported platforms |
| `publisher` | `str` | Publisher name |
| `releaseDate` | `str` | Release date |
| `screenshots` | `list` | Screenshot URLs |
| `videos` | `list` | Video media |

#### Example: Load

```python
game = client.Game().load({"id": "game_id"})
```

#### Example: List

```python
games = client.Game().list()
```


### Platform

Create an instance: `platform = client.Platform()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api` | `dict` |  |
| `priceUpdates` | `dict` |  |
| `status` | `str` | Overall platform status |
| `timestamp` | `str` | Status check timestamp |
| `website` | `dict` |  |

#### Example: Load

```python
platform = client.Platform().load()
```


### Price

Create an instance: `price = client.Price()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliateLink` | `str` | Affiliate link to retailer (do not modify) |
| `currency` | `str` | Currency code (GBP, EUR, USD) |
| `discount` | `float` | Discount percentage |
| `inStock` | `bool` | Stock availability |
| `lastUpdated` | `str` | Last price update timestamp |
| `originalPrice` | `float` | Original price before discount |
| `price` | `float` | Current price |
| `region` | `str` | Region code |
| `retailerId` | `str` | Retailer identifier |
| `retailerName` | `str` | Retailer name |

#### Example: List

```python
prices = client.Price().list({"game_id": "example"})
```


### Retailer

Create an instance: `retailer = client.Retailer()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved` | `bool` | Approval status |
| `currencies` | `list` | Supported currencies |
| `id` | `str` | Unique retailer identifier |
| `logo` | `str` | Retailer logo URL |
| `name` | `str` | Retailer name |
| `regions` | `list` | Supported regions |
| `website` | `str` | Retailer website |

#### Example: List

```python
retailers = client.Retailer().list()
```


### Search

Create an instance: `search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `consoles` | `list` |  |
| `games` | `list` |  |
| `totalResults` | `int` |  |

#### Example: Load

```python
search = client.Search().load()
```


### Studio

Create an instance: `studio = client.Studio()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Studio description |
| `foundingYear` | `int` | Year founded |
| `games` | `list` | Released game IDs |
| `id` | `str` | Unique studio identifier |
| `location` | `dict` | Studio location |
| `logo` | `str` | Studio logo URL |
| `name` | `str` | Studio name |
| `type` | `str` | Studio type |
| `website` | `str` | Official website |

#### Example: Load

```python
studio = client.Studio().load({"id": "studio_id"})
```

#### Example: List

```python
studios = client.Studio().list()
```


### User

Create an instance: `user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageRating` | `str` | Age rating (e.g., ESRB, PEGI) |
| `avatar` | `str` | Avatar image URL |
| `coverImage` | `str` | Cover image URL |
| `description` | `str` | Game description |
| `developer` | `str` | Developer name |
| `franchiseId` | `str` | Associated franchise ID |
| `genres` | `list` | Game genres |
| `id` | `str` | Unique user identifier |
| `joinDate` | `str` | Account creation date |
| `libraryCount` | `int` | Number of games in library |
| `name` | `str` | Game title |
| `platforms` | `list` | Supported platforms |
| `publisher` | `str` | Publisher name |
| `releaseDate` | `str` | Release date |
| `screenshots` | `list` | Screenshot URLs |
| `username` | `str` | Username |
| `videos` | `list` | Video media |
| `wishlistCount` | `int` | Number of items in wishlist |

#### Example: Load

```python
user = client.User().load({"id": "user_id"})
```

#### Example: List

```python
users = client.User().list({"id": "example_id"})
```


### Widget

Create an instance: `widget = client.Widget()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
widget = client.Widget().load()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── nexarda_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`nexarda_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
studio = client.Studio()
studio.list()

# studio.data_get() now returns the studio data from the last list
# studio.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
