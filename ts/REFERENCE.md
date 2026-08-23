# Nexarda TypeScript SDK Reference

Complete API reference for the Nexarda TypeScript SDK.


## NexardaSDK

### Constructor

```ts
new NexardaSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NexardaSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = NexardaSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `NexardaSDK` instance in test mode.


### Instance Methods

#### `Console(data?: object)`

Create a new `Console` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConsoleEntity` instance.

#### `Franchis(data?: object)`

Create a new `Franchis` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FranchisEntity` instance.

#### `Game(data?: object)`

Create a new `Game` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GameEntity` instance.

#### `Platform(data?: object)`

Create a new `Platform` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PlatformEntity` instance.

#### `Price(data?: object)`

Create a new `Price` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PriceEntity` instance.

#### `Retailer(data?: object)`

Create a new `Retailer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RetailerEntity` instance.

#### `Search(data?: object)`

Create a new `Search` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SearchEntity` instance.

#### `Studio(data?: object)`

Create a new `Studio` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StudioEntity` instance.

#### `User(data?: object)`

Create a new `User` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserEntity` instance.

#### `Widget(data?: object)`

Create a new `Widget` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WidgetEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `NexardaSDK.test()`.

**Returns:** `NexardaSDK` instance in test mode.


---

## ConsoleEntity

```ts
const console_ = client.Console()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Product description |
| `id` | `string` | No | Unique console identifier |
| `images` | `any[]` | No | Product images |
| `manufacturer` | `string` | No | Manufacturer name |
| `name` | `string` | No | Console name |
| `releaseDate` | `string` | No | Release date |
| `specifications` | `Record<string, any>` | No | Technical specifications |
| `type` | `string` | No | Product type |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Console().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Console().load({ id: 'console_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConsoleEntity` instance with the same client and
options.

#### `client()`

Return the parent `NexardaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FranchisEntity

```ts
const franchis = client.Franchis()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Franchise description |
| `games` | `any[]` | No | Game IDs included in franchise |
| `id` | `string` | No | Unique franchise identifier |
| `logo` | `string` | No | Franchise logo URL |
| `name` | `string` | No | Franchise name |
| `totalGames` | `number` | No | Total number of games in franchise |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Franchis().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Franchis().load({ id: 'franchis_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FranchisEntity` instance with the same client and
options.

#### `client()`

Return the parent `NexardaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GameEntity

```ts
const game = client.Game()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageRating` | `string` | No | Age rating (e.g., ESRB, PEGI) |
| `coverImage` | `string` | No | Cover image URL |
| `description` | `string` | No | Game description |
| `developer` | `string` | No | Developer name |
| `franchiseId` | `string` | No | Associated franchise ID |
| `genres` | `any[]` | No | Game genres |
| `id` | `string` | No | Unique game identifier |
| `name` | `string` | No | Game title |
| `platforms` | `any[]` | No | Supported platforms |
| `publisher` | `string` | No | Publisher name |
| `releaseDate` | `string` | No | Release date |
| `screenshots` | `any[]` | No | Screenshot URLs |
| `videos` | `any[]` | No | Video media |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Game().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Game().load({ id: 'game_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GameEntity` instance with the same client and
options.

#### `client()`

Return the parent `NexardaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PlatformEntity

```ts
const platform = client.Platform()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api` | `Record<string, any>` | No |  |
| `priceUpdates` | `Record<string, any>` | No |  |
| `status` | `string` | No | Overall platform status |
| `timestamp` | `string` | No | Status check timestamp |
| `website` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Platform().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PlatformEntity` instance with the same client and
options.

#### `client()`

Return the parent `NexardaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PriceEntity

```ts
const price = client.Price()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Price().list({ game_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PriceEntity` instance with the same client and
options.

#### `client()`

Return the parent `NexardaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RetailerEntity

```ts
const retailer = client.Retailer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved` | `boolean` | No | Approval status |
| `currencies` | `any[]` | No | Supported currencies |
| `id` | `string` | No | Unique retailer identifier |
| `logo` | `string` | No | Retailer logo URL |
| `name` | `string` | No | Retailer name |
| `regions` | `any[]` | No | Supported regions |
| `website` | `string` | No | Retailer website |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Retailer().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RetailerEntity` instance with the same client and
options.

#### `client()`

Return the parent `NexardaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SearchEntity

```ts
const search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `consoles` | `any[]` | No |  |
| `games` | `any[]` | No |  |
| `totalResults` | `number` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Search().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `NexardaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StudioEntity

```ts
const studio = client.Studio()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Studio description |
| `foundingYear` | `number` | No | Year founded |
| `games` | `any[]` | No | Released game IDs |
| `id` | `string` | No | Unique studio identifier |
| `location` | `Record<string, any>` | No | Studio location |
| `logo` | `string` | No | Studio logo URL |
| `name` | `string` | No | Studio name |
| `type` | `string` | No | Studio type |
| `website` | `string` | No | Official website |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Studio().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Studio().load({ id: 'studio_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StudioEntity` instance with the same client and
options.

#### `client()`

Return the parent `NexardaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserEntity

```ts
const user = client.User()
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
| `genres` | `any[]` | No | Game genres |
| `id` | `string` | No | Unique user identifier |
| `joinDate` | `string` | No | Account creation date |
| `libraryCount` | `number` | No | Number of games in library |
| `name` | `string` | No | Game title |
| `platforms` | `any[]` | No | Supported platforms |
| `publisher` | `string` | No | Publisher name |
| `releaseDate` | `string` | No | Release date |
| `screenshots` | `any[]` | No | Screenshot URLs |
| `username` | `string` | No | Username |
| `videos` | `any[]` | No | Video media |
| `wishlistCount` | `number` | No | Number of items in wishlist |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `library` | `/users/{userId}/library` | `client.User().list({ $action: 'library', ... })` |
| `wishlist` | `/users/{userId}/wishlist` | `client.User().list({ $action: 'wishlist', ... })` |

An action returns that action's OWN response, which is not necessarily a
User record — check the API definition for its shape.

```ts
const result = await client.User().list({
  $action: 'library',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.User().list({ id: "example_id" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.User().load({ id: 'user_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserEntity` instance with the same client and
options.

#### `client()`

Return the parent `NexardaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WidgetEntity

```ts
const widget = client.Widget()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `button` | `/widgets/button` | `client.Widget().load({ $action: 'button', ... })` |
| `product_card` | `/widgets/product-card` | `client.Widget().load({ $action: 'product_card', ... })` |

An action returns that action's OWN response, which is not necessarily a
Widget record — check the API definition for its shape.

```ts
const result = await client.Widget().load({
  $action: 'button',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Widget().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WidgetEntity` instance with the same client and
options.

#### `client()`

Return the parent `NexardaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new NexardaSDK({
  feature: {
    test: { active: true },
  }
})
```

