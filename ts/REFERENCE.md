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
| `description` | `string` | No |  |
| `id` | `string` | No |  |
| `images` | `any[]` | No |  |
| `manufacturer` | `string` | No |  |
| `name` | `string` | No |  |
| `releaseDate` | `string` | No |  |
| `specifications` | `Record<string, any>` | No |  |
| `type` | `string` | No |  |

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
| `description` | `string` | No |  |
| `games` | `any[]` | No |  |
| `id` | `string` | No |  |
| `logo` | `string` | No |  |
| `name` | `string` | No |  |
| `totalGames` | `number` | No |  |

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
| `ageRating` | `string` | No |  |
| `coverImage` | `string` | No |  |
| `description` | `string` | No |  |
| `developer` | `string` | No |  |
| `franchiseId` | `string` | No |  |
| `genres` | `any[]` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `platforms` | `any[]` | No |  |
| `publisher` | `string` | No |  |
| `releaseDate` | `string` | No |  |
| `screenshots` | `any[]` | No |  |
| `videos` | `any[]` | No |  |

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
| `status` | `string` | No |  |
| `timestamp` | `string` | No |  |
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
| `affiliateLink` | `string` | No |  |
| `currency` | `string` | No |  |
| `discount` | `number` | No |  |
| `inStock` | `boolean` | No |  |
| `lastUpdated` | `string` | No |  |
| `originalPrice` | `number` | No |  |
| `price` | `number` | No |  |
| `region` | `string` | No |  |
| `retailerId` | `string` | No |  |
| `retailerName` | `string` | No |  |

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
| `approved` | `boolean` | No |  |
| `currencies` | `any[]` | No |  |
| `id` | `string` | No |  |
| `logo` | `string` | No |  |
| `name` | `string` | No |  |
| `regions` | `any[]` | No |  |
| `website` | `string` | No |  |

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
| `description` | `string` | No |  |
| `foundingYear` | `number` | No |  |
| `games` | `any[]` | No |  |
| `id` | `string` | No |  |
| `location` | `Record<string, any>` | No |  |
| `logo` | `string` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |
| `website` | `string` | No |  |

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
| `ageRating` | `string` | No |  |
| `avatar` | `string` | No |  |
| `coverImage` | `string` | No |  |
| `description` | `string` | No |  |
| `developer` | `string` | No |  |
| `franchiseId` | `string` | No |  |
| `genres` | `any[]` | No |  |
| `id` | `string` | No |  |
| `joinDate` | `string` | No |  |
| `libraryCount` | `number` | No |  |
| `name` | `string` | No |  |
| `platforms` | `any[]` | No |  |
| `publisher` | `string` | No |  |
| `releaseDate` | `string` | No |  |
| `screenshots` | `any[]` | No |  |
| `username` | `string` | No |  |
| `videos` | `any[]` | No |  |
| `wishlistCount` | `number` | No |  |

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

