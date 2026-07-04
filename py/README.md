# Nexarda Python SDK



The Python SDK for the Nexarda API — an entity-oriented client following Pythonic conventions.

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

### 2. List consoles

```python
try:
    result = client.console.list()
    for item in result:
        d = item.data_get()
        print(d["id"], d["name"])
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a console

```python
try:
    result = client.console.load({"id": "example_id"})
    print(result)
except Exception as err:
    print(f"load failed: {err}")
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
    print(result["err"])     # error value
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

result = client.console.load({"id": "test01"})
# result contains mock response data
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
| `User` | `(data) -> UserEntity` | Create a User entity instance. |
| `Widget` | `(data) -> WidgetEntity` | Create a Widget entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
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
error is returned to the caller as the second element in the return tuple.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
console = client.console
console.load({"id": "example_id"})

# console.data_get() now returns the loaded console data
# console.match_get() returns the last match criteria
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
