# Nexarda PHP SDK



The PHP SDK for the Nexarda API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Console()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/nexarda-sdk/releases](https://github.com/voxgig-sdk/nexarda-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'nexarda_sdk.php';

$client = new NexardaSDK([
    "apikey" => getenv("NEXARDA_APIKEY"),
]);
```

### 2. List console records

```php
try {
    // list() returns an array of Console records — iterate directly.
    $consoles = $client->Console()->list();
    foreach ($consoles as $item) {
        echo $item["id"] . " " . $item["data"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a console

```php
try {
    // load() returns the bare Console record (throws on error).
    $console = $client->Console()->load(["id" => "example_id"]);
    print_r($console);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $consoles = $client->Console()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = NexardaSDK::test([
    "entity" => ["console" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the bare mock record (throws on error).
$console = $client->Console()->list();
print_r($console);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new NexardaSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
NEXARDA_TEST_LIVE=TRUE
NEXARDA_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### NexardaSDK

```php
require_once 'nexarda_sdk.php';
$client = new NexardaSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = NexardaSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### NexardaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Console` | `($data): ConsoleEntity` | Create a Console entity instance. |
| `Franchis` | `($data): FranchisEntity` | Create a Franchis entity instance. |
| `Game` | `($data): GameEntity` | Create a Game entity instance. |
| `Platform` | `($data): PlatformEntity` | Create a Platform entity instance. |
| `Price` | `($data): PriceEntity` | Create a Price entity instance. |
| `Retailer` | `($data): RetailerEntity` | Create a Retailer entity instance. |
| `Search` | `($data): SearchEntity` | Create a Search entity instance. |
| `Studio` | `($data): StudioEntity` | Create a Studio entity instance. |
| `User` | `($data): UserEntity` | Create an User entity instance. |
| `Widget` | `($data): WidgetEntity` | Create a Widget entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$console = $client->Console();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `image` | `array` |  |
| `manufacturer` | `string` |  |
| `name` | `string` |  |
| `release_date` | `string` |  |
| `specification` | `array` |  |
| `success` | `bool` |  |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the bare Console record (throws on error).
$console = $client->Console()->load(["id" => "console_id"]);
```

#### Example: List

```php
// list() returns an array of Console records (throws on error).
$consoles = $client->Console()->list();
```


### Franchis

Create an instance: `$franchis = $client->Franchis();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `description` | `string` |  |
| `game` | `array` |  |
| `id` | `string` |  |
| `logo` | `string` |  |
| `name` | `string` |  |
| `success` | `bool` |  |
| `total_game` | `int` |  |

#### Example: Load

```php
// load() returns the bare Franchis record (throws on error).
$franchis = $client->Franchis()->load(["id" => "franchis_id"]);
```

#### Example: List

```php
// list() returns an array of Franchis records (throws on error).
$franchiss = $client->Franchis()->list();
```


### Game

Create an instance: `$game = $client->Game();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_rating` | `string` |  |
| `cover_image` | `string` |  |
| `data` | `array` |  |
| `description` | `string` |  |
| `developer` | `string` |  |
| `franchise_id` | `string` |  |
| `genre` | `array` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `platform` | `array` |  |
| `publisher` | `string` |  |
| `release_date` | `string` |  |
| `screenshot` | `array` |  |
| `success` | `bool` |  |
| `video` | `array` |  |

#### Example: Load

```php
// load() returns the bare Game record (throws on error).
$game = $client->Game()->load(["id" => "game_id"]);
```

#### Example: List

```php
// list() returns an array of Game records (throws on error).
$games = $client->Game()->list();
```


### Platform

Create an instance: `$platform = $client->Platform();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `success` | `bool` |  |

#### Example: Load

```php
// load() returns the bare Platform record (throws on error).
$platform = $client->Platform()->load();
```


### Price

Create an instance: `$price = $client->Price();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliate_link` | `string` |  |
| `currency` | `string` |  |
| `discount` | `float` |  |
| `in_stock` | `bool` |  |
| `last_updated` | `string` |  |
| `original_price` | `float` |  |
| `price` | `float` |  |
| `region` | `string` |  |
| `retailer_id` | `string` |  |
| `retailer_name` | `string` |  |

#### Example: List

```php
// list() returns an array of Price records (throws on error).
$prices = $client->Price()->list();
```


### Retailer

Create an instance: `$retailer = $client->Retailer();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved` | `bool` |  |
| `currency` | `array` |  |
| `id` | `string` |  |
| `logo` | `string` |  |
| `name` | `string` |  |
| `region` | `array` |  |
| `website` | `string` |  |

#### Example: List

```php
// list() returns an array of Retailer records (throws on error).
$retailers = $client->Retailer()->list();
```


### Search

Create an instance: `$search = $client->Search();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `success` | `bool` |  |

#### Example: Load

```php
// load() returns the bare Search record (throws on error).
$search = $client->Search()->load();
```


### Studio

Create an instance: `$studio = $client->Studio();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `description` | `string` |  |
| `founding_year` | `int` |  |
| `game` | `array` |  |
| `id` | `string` |  |
| `location` | `array` |  |
| `logo` | `string` |  |
| `name` | `string` |  |
| `success` | `bool` |  |
| `type` | `string` |  |
| `website` | `string` |  |

#### Example: Load

```php
// load() returns the bare Studio record (throws on error).
$studio = $client->Studio()->load(["id" => "studio_id"]);
```

#### Example: List

```php
// list() returns an array of Studio records (throws on error).
$studios = $client->Studio()->list();
```


### User

Create an instance: `$user = $client->User();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_rating` | `string` |  |
| `cover_image` | `string` |  |
| `data` | `array` |  |
| `description` | `string` |  |
| `developer` | `string` |  |
| `franchise_id` | `string` |  |
| `genre` | `array` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `platform` | `array` |  |
| `publisher` | `string` |  |
| `release_date` | `string` |  |
| `screenshot` | `array` |  |
| `success` | `bool` |  |
| `video` | `array` |  |

#### Example: Load

```php
// load() returns the bare User record (throws on error).
$user = $client->User()->load(["id" => "user_id"]);
```

#### Example: List

```php
// list() returns an array of User records (throws on error).
$users = $client->User()->list();
```


### Widget

Create an instance: `$widget = $client->Widget();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare Widget record (throws on error).
$widget = $client->Widget()->load();
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── nexarda_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`nexarda_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$console = $client->Console();
$console->list();

// $console->data_get() now returns the console data from the last list
// $console->match_get() returns the last match criteria
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
