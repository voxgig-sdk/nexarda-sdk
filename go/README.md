# Nexarda Golang SDK



The Golang SDK for the Nexarda API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Console(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/nexarda-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/nexarda-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/nexarda-sdk/go=../nexarda-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/nexarda-sdk/go"
)

func main() {
    client := sdk.NewNexardaSDK(map[string]any{
        "apikey": os.Getenv("NEXARDA_APIKEY"),
    })

    // List console records — the value is the array of records itself.
    consoles, err := client.Console(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range consoles.([]any) {
        fmt.Println(item)
    }

    // Load a single console — the value is the loaded record.
    console, err := client.Console(nil).Load(map[string]any{"id": "example"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(console)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
consoles, err := client.Console(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = consoles
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

console, err := client.Console(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(console) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewNexardaSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewNexardaSDK

```go
func NewNexardaSDK(options map[string]any) *NexardaSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *NexardaSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### NexardaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Console` | `(data map[string]any) NexardaEntity` | Create a Console entity instance. |
| `Franchis` | `(data map[string]any) NexardaEntity` | Create a Franchis entity instance. |
| `Game` | `(data map[string]any) NexardaEntity` | Create a Game entity instance. |
| `Platform` | `(data map[string]any) NexardaEntity` | Create a Platform entity instance. |
| `Price` | `(data map[string]any) NexardaEntity` | Create a Price entity instance. |
| `Retailer` | `(data map[string]any) NexardaEntity` | Create a Retailer entity instance. |
| `Search` | `(data map[string]any) NexardaEntity` | Create a Search entity instance. |
| `Studio` | `(data map[string]any) NexardaEntity` | Create a Studio entity instance. |
| `User` | `(data map[string]any) NexardaEntity` | Create an User entity instance. |
| `Widget` | `(data map[string]any) NexardaEntity` | Create a Widget entity instance. |

### Entity interface (NexardaEntity)

All entities implement the `NexardaEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    console, err := client.Console(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // console is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Console

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"description"` |  |
| `"id"` |  |
| `"image"` |  |
| `"manufacturer"` |  |
| `"name"` |  |
| `"release_date"` |  |
| `"specification"` |  |
| `"success"` |  |
| `"type"` |  |

Operations: List, Load.

API path: `/consoles`

#### Franchis

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"description"` |  |
| `"game"` |  |
| `"id"` |  |
| `"logo"` |  |
| `"name"` |  |
| `"success"` |  |
| `"total_game"` |  |

Operations: List, Load.

API path: `/franchises`

#### Game

| Field | Description |
| --- | --- |
| `"age_rating"` |  |
| `"cover_image"` |  |
| `"data"` |  |
| `"description"` |  |
| `"developer"` |  |
| `"franchise_id"` |  |
| `"genre"` |  |
| `"id"` |  |
| `"name"` |  |
| `"platform"` |  |
| `"publisher"` |  |
| `"release_date"` |  |
| `"screenshot"` |  |
| `"success"` |  |
| `"video"` |  |

Operations: List, Load.

API path: `/games`

#### Platform

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"success"` |  |

Operations: Load.

API path: `/status`

#### Price

| Field | Description |
| --- | --- |
| `"affiliate_link"` |  |
| `"currency"` |  |
| `"discount"` |  |
| `"in_stock"` |  |
| `"last_updated"` |  |
| `"original_price"` |  |
| `"price"` |  |
| `"region"` |  |
| `"retailer_id"` |  |
| `"retailer_name"` |  |

Operations: List.

API path: `/games/{gameId}/prices`

#### Retailer

| Field | Description |
| --- | --- |
| `"approved"` |  |
| `"currency"` |  |
| `"id"` |  |
| `"logo"` |  |
| `"name"` |  |
| `"region"` |  |
| `"website"` |  |

Operations: List.

API path: `/retailers`

#### Search

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"success"` |  |

Operations: Load.

API path: `/search`

#### Studio

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"description"` |  |
| `"founding_year"` |  |
| `"game"` |  |
| `"id"` |  |
| `"location"` |  |
| `"logo"` |  |
| `"name"` |  |
| `"success"` |  |
| `"type"` |  |
| `"website"` |  |

Operations: List, Load.

API path: `/studios`

#### User

| Field | Description |
| --- | --- |
| `"age_rating"` |  |
| `"cover_image"` |  |
| `"data"` |  |
| `"description"` |  |
| `"developer"` |  |
| `"franchise_id"` |  |
| `"genre"` |  |
| `"id"` |  |
| `"name"` |  |
| `"platform"` |  |
| `"publisher"` |  |
| `"release_date"` |  |
| `"screenshot"` |  |
| `"success"` |  |
| `"video"` |  |

Operations: List, Load.

API path: `/users/{userId}/library`

#### Widget

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/widgets/button`



## Entities


### Console

Create an instance: `console := client.Console(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `image` | `[]any` |  |
| `manufacturer` | `string` |  |
| `name` | `string` |  |
| `release_date` | `string` |  |
| `specification` | `map[string]any` |  |
| `success` | `bool` |  |
| `type` | `string` |  |

#### Example: Load

```go
console, err := client.Console(nil).Load(map[string]any{"id": "console_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(console) // the loaded record
```

#### Example: List

```go
consoles, err := client.Console(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(consoles) // the array of records
```


### Franchis

Create an instance: `franchis := client.Franchis(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `description` | `string` |  |
| `game` | `[]any` |  |
| `id` | `string` |  |
| `logo` | `string` |  |
| `name` | `string` |  |
| `success` | `bool` |  |
| `total_game` | `int` |  |

#### Example: Load

```go
franchis, err := client.Franchis(nil).Load(map[string]any{"id": "franchis_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(franchis) // the loaded record
```

#### Example: List

```go
franchiss, err := client.Franchis(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(franchiss) // the array of records
```


### Game

Create an instance: `game := client.Game(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_rating` | `string` |  |
| `cover_image` | `string` |  |
| `data` | `map[string]any` |  |
| `description` | `string` |  |
| `developer` | `string` |  |
| `franchise_id` | `string` |  |
| `genre` | `[]any` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `platform` | `[]any` |  |
| `publisher` | `string` |  |
| `release_date` | `string` |  |
| `screenshot` | `[]any` |  |
| `success` | `bool` |  |
| `video` | `[]any` |  |

#### Example: Load

```go
game, err := client.Game(nil).Load(map[string]any{"id": "game_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(game) // the loaded record
```

#### Example: List

```go
games, err := client.Game(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(games) // the array of records
```


### Platform

Create an instance: `platform := client.Platform(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `success` | `bool` |  |

#### Example: Load

```go
platform, err := client.Platform(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(platform) // the loaded record
```


### Price

Create an instance: `price := client.Price(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliate_link` | `string` |  |
| `currency` | `string` |  |
| `discount` | `float64` |  |
| `in_stock` | `bool` |  |
| `last_updated` | `string` |  |
| `original_price` | `float64` |  |
| `price` | `float64` |  |
| `region` | `string` |  |
| `retailer_id` | `string` |  |
| `retailer_name` | `string` |  |

#### Example: List

```go
prices, err := client.Price(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(prices) // the array of records
```


### Retailer

Create an instance: `retailer := client.Retailer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved` | `bool` |  |
| `currency` | `[]any` |  |
| `id` | `string` |  |
| `logo` | `string` |  |
| `name` | `string` |  |
| `region` | `[]any` |  |
| `website` | `string` |  |

#### Example: List

```go
retailers, err := client.Retailer(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(retailers) // the array of records
```


### Search

Create an instance: `search := client.Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `success` | `bool` |  |

#### Example: Load

```go
search, err := client.Search(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(search) // the loaded record
```


### Studio

Create an instance: `studio := client.Studio(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `description` | `string` |  |
| `founding_year` | `int` |  |
| `game` | `[]any` |  |
| `id` | `string` |  |
| `location` | `map[string]any` |  |
| `logo` | `string` |  |
| `name` | `string` |  |
| `success` | `bool` |  |
| `type` | `string` |  |
| `website` | `string` |  |

#### Example: Load

```go
studio, err := client.Studio(nil).Load(map[string]any{"id": "studio_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(studio) // the loaded record
```

#### Example: List

```go
studios, err := client.Studio(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(studios) // the array of records
```


### User

Create an instance: `user := client.User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_rating` | `string` |  |
| `cover_image` | `string` |  |
| `data` | `map[string]any` |  |
| `description` | `string` |  |
| `developer` | `string` |  |
| `franchise_id` | `string` |  |
| `genre` | `[]any` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `platform` | `[]any` |  |
| `publisher` | `string` |  |
| `release_date` | `string` |  |
| `screenshot` | `[]any` |  |
| `success` | `bool` |  |
| `video` | `[]any` |  |

#### Example: Load

```go
user, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(user) // the loaded record
```

#### Example: List

```go
users, err := client.User(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(users) // the array of records
```


### Widget

Create an instance: `widget := client.Widget(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
widget, err := client.Widget(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(widget) // the loaded record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/nexarda-sdk/go/
├── nexarda.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/nexarda-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
console := client.Console(nil)
console.List(nil, nil)

// console.Data() now returns the console data from the last list
// console.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
