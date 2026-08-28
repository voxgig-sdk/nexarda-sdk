# Nexarda PHP SDK Reference

Complete API reference for the Nexarda PHP SDK.


## NexardaSDK

### Constructor

```php
require_once __DIR__ . '/nexarda_sdk.php';

$client = new NexardaSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NexardaSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = NexardaSDK::test();
```


### Instance Methods

#### `Console($data = null)`

Create a new `ConsoleEntity` instance. Pass `null` for no initial data.

#### `Franchis($data = null)`

Create a new `FranchisEntity` instance. Pass `null` for no initial data.

#### `Game($data = null)`

Create a new `GameEntity` instance. Pass `null` for no initial data.

#### `Platform($data = null)`

Create a new `PlatformEntity` instance. Pass `null` for no initial data.

#### `Price($data = null)`

Create a new `PriceEntity` instance. Pass `null` for no initial data.

#### `Retailer($data = null)`

Create a new `RetailerEntity` instance. Pass `null` for no initial data.

#### `Search($data = null)`

Create a new `SearchEntity` instance. Pass `null` for no initial data.

#### `Studio($data = null)`

Create a new `StudioEntity` instance. Pass `null` for no initial data.

#### `User($data = null)`

Create a new `UserEntity` instance. Pass `null` for no initial data.

#### `Widget($data = null)`

Create a new `WidgetEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): NexardaUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ConsoleEntity

```php
$console = $client->Console();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Product description |
| `id` | `string` | No | Unique console identifier |
| `images` | `array` | No | Product images |
| `manufacturer` | `string` | No | Manufacturer name |
| `name` | `string` | No | Console name |
| `releaseDate` | `string` | No | Release date |
| `specifications` | `array` | No | Technical specifications |
| `type` | `string` | No | Product type |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Console()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Console()->load(["id" => "console_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ConsoleEntity`

Create a new `ConsoleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FranchisEntity

```php
$franchis = $client->Franchis();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Franchise description |
| `games` | `array` | No | Game IDs included in franchise |
| `id` | `string` | No | Unique franchise identifier |
| `logo` | `string` | No | Franchise logo URL |
| `name` | `string` | No | Franchise name |
| `totalGames` | `int` | No | Total number of games in franchise |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Franchis()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Franchis()->load(["id" => "franchis_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FranchisEntity`

Create a new `FranchisEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GameEntity

```php
$game = $client->Game();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageRating` | `string` | No | Age rating (e.g., ESRB, PEGI) |
| `coverImage` | `string` | No | Cover image URL |
| `description` | `string` | No | Game description |
| `developer` | `string` | No | Developer name |
| `franchiseId` | `string` | No | Associated franchise ID |
| `genres` | `array` | No | Game genres |
| `id` | `string` | No | Unique game identifier |
| `name` | `string` | No | Game title |
| `platforms` | `array` | No | Supported platforms |
| `publisher` | `string` | No | Publisher name |
| `releaseDate` | `string` | No | Release date |
| `screenshots` | `array` | No | Screenshot URLs |
| `videos` | `array` | No | Video media |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Game()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Game()->load(["id" => "game_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GameEntity`

Create a new `GameEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PlatformEntity

```php
$platform = $client->Platform();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api` | `array` | No |  |
| `priceUpdates` | `array` | No |  |
| `status` | `string` | No | Overall platform status |
| `timestamp` | `string` | No | Status check timestamp |
| `website` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Platform()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PlatformEntity`

Create a new `PlatformEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PriceEntity

```php
$price = $client->Price();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affiliateLink` | `string` | No | Affiliate link to retailer (do not modify) |
| `currency` | `string` | No | Currency code (GBP, EUR, USD) |
| `discount` | `float` | No | Discount percentage |
| `inStock` | `bool` | No | Stock availability |
| `lastUpdated` | `string` | No | Last price update timestamp |
| `originalPrice` | `float` | No | Original price before discount |
| `price` | `float` | No | Current price |
| `region` | `string` | No | Region code |
| `retailerId` | `string` | No | Retailer identifier |
| `retailerName` | `string` | No | Retailer name |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Price()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PriceEntity`

Create a new `PriceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RetailerEntity

```php
$retailer = $client->Retailer();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved` | `bool` | No | Approval status |
| `currencies` | `array` | No | Supported currencies |
| `id` | `string` | No | Unique retailer identifier |
| `logo` | `string` | No | Retailer logo URL |
| `name` | `string` | No | Retailer name |
| `regions` | `array` | No | Supported regions |
| `website` | `string` | No | Retailer website |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Retailer()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RetailerEntity`

Create a new `RetailerEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SearchEntity

```php
$search = $client->Search();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `consoles` | `array` | No |  |
| `games` | `array` | No |  |
| `totalResults` | `int` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Search()->load(["q" => "q"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SearchEntity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StudioEntity

```php
$studio = $client->Studio();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Studio description |
| `foundingYear` | `int` | No | Year founded |
| `games` | `array` | No | Released game IDs |
| `id` | `string` | No | Unique studio identifier |
| `location` | `array` | No | Studio location |
| `logo` | `string` | No | Studio logo URL |
| `name` | `string` | No | Studio name |
| `type` | `string` | No | Studio type |
| `website` | `string` | No | Official website |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Studio()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Studio()->load(["id" => "studio_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StudioEntity`

Create a new `StudioEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserEntity

```php
$user = $client->User();
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
| `genres` | `array` | No | Game genres |
| `id` | `string` | No | Unique user identifier |
| `joinDate` | `string` | No | Account creation date |
| `libraryCount` | `int` | No | Number of games in library |
| `name` | `string` | No | Game title |
| `platforms` | `array` | No | Supported platforms |
| `publisher` | `string` | No | Publisher name |
| `releaseDate` | `string` | No | Release date |
| `screenshots` | `array` | No | Screenshot URLs |
| `username` | `string` | No | Username |
| `videos` | `array` | No | Video media |
| `wishlistCount` | `int` | No | Number of items in wishlist |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->User()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->User()->load(["id" => "user_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserEntity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WidgetEntity

```php
$widget = $client->Widget();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Widget()->load(["product_id" => "product_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WidgetEntity`

Create a new `WidgetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new NexardaSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
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

