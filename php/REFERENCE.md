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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## ConsoleEntity

```php
$console = $client->Console();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Console()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Console()->load(["id" => "console_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ConsoleEntity`

Create a new `ConsoleEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## FranchisEntity

```php
$franchis = $client->Franchis();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Franchis()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Franchis()->load(["id" => "franchis_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FranchisEntity`

Create a new `FranchisEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GameEntity

```php
$game = $client->Game();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Game()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Game()->load(["id" => "game_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GameEntity`

Create a new `GameEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PlatformEntity

```php
$platform = $client->Platform();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Platform()->load(["id" => "platform_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PlatformEntity`

Create a new `PlatformEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PriceEntity

```php
$price = $client->Price();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Price()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PriceEntity`

Create a new `PriceEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RetailerEntity

```php
$retailer = $client->Retailer();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Retailer()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RetailerEntity`

Create a new `RetailerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SearchEntity

```php
$search = $client->Search();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Search()->load(["id" => "search_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SearchEntity`

Create a new `SearchEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## StudioEntity

```php
$studio = $client->Studio();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Studio()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Studio()->load(["id" => "studio_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StudioEntity`

Create a new `StudioEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## UserEntity

```php
$user = $client->User();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->User()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->User()->load(["id" => "user_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): UserEntity`

Create a new `UserEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## WidgetEntity

```php
$widget = $client->Widget();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Widget()->load(["id" => "widget_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): WidgetEntity`

Create a new `WidgetEntity` instance with the same client and
options.

#### `getName(): string`

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

