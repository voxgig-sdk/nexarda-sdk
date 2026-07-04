# Nexarda TypeScript SDK



The TypeScript SDK for the Nexarda API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/nexarda-sdk/releases](https://github.com/voxgig-sdk/nexarda-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { NexardaSDK } from '@voxgig-sdk/nexarda'

const client = new NexardaSDK({
  apikey: process.env.NEXARDA_APIKEY,
})
```

### 2. List consoles

```ts
const result = await client.console.list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```

### 3. Load a console

```ts
const result = await client.console.load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = NexardaSDK.test()

const result = await client.console.load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new NexardaSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.console

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new NexardaSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### NexardaSDK

#### Constructor

```ts
new NexardaSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Console(data?)` | `ConsoleEntity` | Create a Console entity instance. |
| `Franchis(data?)` | `FranchisEntity` | Create a Franchis entity instance. |
| `Game(data?)` | `GameEntity` | Create a Game entity instance. |
| `Platform(data?)` | `PlatformEntity` | Create a Platform entity instance. |
| `Price(data?)` | `PriceEntity` | Create a Price entity instance. |
| `Retailer(data?)` | `RetailerEntity` | Create a Retailer entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `Studio(data?)` | `StudioEntity` | Create a Studio entity instance. |
| `User(data?)` | `UserEntity` | Create a User entity instance. |
| `Widget(data?)` | `WidgetEntity` | Create a Widget entity instance. |
| `tester(testopts?, sdkopts?)` | `NexardaSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `NexardaSDK.test(testopts?, sdkopts?)` | `NexardaSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): NexardaSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

API path: `/games`

#### Platform

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: load.

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

Operations: list.

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

Operations: list.

API path: `/retailers`

#### Search

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: load.

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

Operations: list, load.

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

Operations: list, load.

API path: `/users/{userId}/library`

#### Widget

| Field | Description |
| --- | --- |

Operations: load.

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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
nexarda/
├── src/
│   ├── NexardaSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { NexardaSDK } from '@voxgig-sdk/nexarda'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const console = client.console
await console.load({ id: "example_id" })

// console.data() now returns the loaded console data
// console.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
