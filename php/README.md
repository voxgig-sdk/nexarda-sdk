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
        echo $item["id"] . " " . $item["description"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a console

```php
try {
    // load() returns the ENTITY — call data_get() for the Console record (throws on error).
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
    $studios = $client->Studio()->list();
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
    "entity" => ["studio" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$studio = $client->Studio()->list();
print_r($studio);
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

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
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
| `description` |  |
| `id` |  |
| `images` |  |
| `manufacturer` |  |
| `name` |  |
| `releaseDate` |  |
| `specifications` |  |
| `type` |  |

Operations: List, Load.

API path: `/consoles`

#### Franchis

| Field | Description |
| --- | --- |
| `description` |  |
| `games` |  |
| `id` |  |
| `logo` |  |
| `name` |  |
| `totalGames` |  |

Operations: List, Load.

API path: `/franchises`

#### Game

| Field | Description |
| --- | --- |
| `ageRating` |  |
| `coverImage` |  |
| `description` |  |
| `developer` |  |
| `franchiseId` |  |
| `genres` |  |
| `id` |  |
| `name` |  |
| `platforms` |  |
| `publisher` |  |
| `releaseDate` |  |
| `screenshots` |  |
| `videos` |  |

Operations: List, Load.

API path: `/games`

#### Platform

| Field | Description |
| --- | --- |
| `api` |  |
| `priceUpdates` |  |
| `status` |  |
| `timestamp` |  |
| `website` |  |

Operations: Load.

API path: `/status`

#### Price

| Field | Description |
| --- | --- |
| `affiliateLink` |  |
| `currency` |  |
| `discount` |  |
| `inStock` |  |
| `lastUpdated` |  |
| `originalPrice` |  |
| `price` |  |
| `region` |  |
| `retailerId` |  |
| `retailerName` |  |

Operations: List.

API path: `/games/{gameId}/prices`

#### Retailer

| Field | Description |
| --- | --- |
| `approved` |  |
| `currencies` |  |
| `id` |  |
| `logo` |  |
| `name` |  |
| `regions` |  |
| `website` |  |

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
| `description` |  |
| `foundingYear` |  |
| `games` |  |
| `id` |  |
| `location` |  |
| `logo` |  |
| `name` |  |
| `type` |  |
| `website` |  |

Operations: List, Load.

API path: `/studios`

#### User

| Field | Description |
| --- | --- |
| `ageRating` |  |
| `avatar` |  |
| `coverImage` |  |
| `description` |  |
| `developer` |  |
| `franchiseId` |  |
| `genres` |  |
| `id` |  |
| `joinDate` |  |
| `libraryCount` |  |
| `name` |  |
| `platforms` |  |
| `publisher` |  |
| `releaseDate` |  |
| `screenshots` |  |
| `username` |  |
| `videos` |  |
| `wishlistCount` |  |

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
| `description` | `string` |  |
| `id` | `string` |  |
| `images` | `array` |  |
| `manufacturer` | `string` |  |
| `name` | `string` |  |
| `releaseDate` | `string` |  |
| `specifications` | `array` |  |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Console record (throws on error).
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
| `description` | `string` |  |
| `games` | `array` |  |
| `id` | `string` |  |
| `logo` | `string` |  |
| `name` | `string` |  |
| `totalGames` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Franchis record (throws on error).
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
| `ageRating` | `string` |  |
| `coverImage` | `string` |  |
| `description` | `string` |  |
| `developer` | `string` |  |
| `franchiseId` | `string` |  |
| `genres` | `array` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `platforms` | `array` |  |
| `publisher` | `string` |  |
| `releaseDate` | `string` |  |
| `screenshots` | `array` |  |
| `videos` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Game record (throws on error).
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
| `api` | `array` |  |
| `priceUpdates` | `array` |  |
| `status` | `string` |  |
| `timestamp` | `string` |  |
| `website` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Platform record (throws on error).
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
| `affiliateLink` | `string` |  |
| `currency` | `string` |  |
| `discount` | `float` |  |
| `inStock` | `bool` |  |
| `lastUpdated` | `string` |  |
| `originalPrice` | `float` |  |
| `price` | `float` |  |
| `region` | `string` |  |
| `retailerId` | `string` |  |
| `retailerName` | `string` |  |

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
| `currencies` | `array` |  |
| `id` | `string` |  |
| `logo` | `string` |  |
| `name` | `string` |  |
| `regions` | `array` |  |
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
| `consoles` | `array` |  |
| `games` | `array` |  |
| `totalResults` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Search record (throws on error).
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
| `description` | `string` |  |
| `foundingYear` | `int` |  |
| `games` | `array` |  |
| `id` | `string` |  |
| `location` | `array` |  |
| `logo` | `string` |  |
| `name` | `string` |  |
| `type` | `string` |  |
| `website` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Studio record (throws on error).
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
| `ageRating` | `string` |  |
| `avatar` | `string` |  |
| `coverImage` | `string` |  |
| `description` | `string` |  |
| `developer` | `string` |  |
| `franchiseId` | `string` |  |
| `genres` | `array` |  |
| `id` | `string` |  |
| `joinDate` | `string` |  |
| `libraryCount` | `int` |  |
| `name` | `string` |  |
| `platforms` | `array` |  |
| `publisher` | `string` |  |
| `releaseDate` | `string` |  |
| `screenshots` | `array` |  |
| `username` | `string` |  |
| `videos` | `array` |  |
| `wishlistCount` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the User record (throws on error).
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
// load() returns the ENTITY — call data_get() for the Widget record (throws on error).
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
$studio = $client->Studio();
$studio->list();

// $studio->data_get() now returns the studio data from the last list
// $studio->match_get() returns the last match criteria
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
