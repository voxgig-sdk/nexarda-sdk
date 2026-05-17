# Nexarda Golang SDK

The Golang SDK for the Nexarda API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/nexarda-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/nexarda-sdk/go=../path/to/github.com/voxgig-sdk/nexarda-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/nexarda-sdk/go"
    "github.com/voxgig-sdk/nexarda-sdk/go/core"
)

func main() {
    client := sdk.NewNexardaSDK(map[string]any{
        "apikey": os.Getenv("NEXARDA_APIKEY"),
    })
```

### 2. List consoles

```go
    result, err := client.Console(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```

### 3. Load a console

```go
    result, err = client.Console(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
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
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
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
| `User` | `(data map[string]any) NexardaEntity` | Create a User entity instance. |
| `Widget` | `(data map[string]any) NexardaEntity` | Create a Widget entity instance. |

### Entity interface (NexardaEntity)

All entities implement the `NexardaEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

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

```go
result, err := client.Console(nil).Load(map[string]any{"id": "console_id"}, nil)
```

#### Example: List

```go
results, err := client.Console(nil).List(nil, nil)
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
| `data` | ``$OBJECT`` |  |
| `description` | ``$STRING`` |  |
| `game` | ``$ARRAY`` |  |
| `id` | ``$STRING`` |  |
| `logo` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |
| `total_game` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.Franchis(nil).Load(map[string]any{"id": "franchis_id"}, nil)
```

#### Example: List

```go
results, err := client.Franchis(nil).List(nil, nil)
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

```go
result, err := client.Game(nil).Load(map[string]any{"id": "game_id"}, nil)
```

#### Example: List

```go
results, err := client.Game(nil).List(nil, nil)
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
| `data` | ``$OBJECT`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```go
result, err := client.Platform(nil).Load(map[string]any{"id": "platform_id"}, nil)
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

```go
results, err := client.Price(nil).List(nil, nil)
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
| `approved` | ``$BOOLEAN`` |  |
| `currency` | ``$ARRAY`` |  |
| `id` | ``$STRING`` |  |
| `logo` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `region` | ``$ARRAY`` |  |
| `website` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Retailer(nil).List(nil, nil)
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
| `data` | ``$OBJECT`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```go
result, err := client.Search(nil).Load(map[string]any{"id": "search_id"}, nil)
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

```go
result, err := client.Studio(nil).Load(map[string]any{"id": "studio_id"}, nil)
```

#### Example: List

```go
results, err := client.Studio(nil).List(nil, nil)
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

```go
result, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
```

#### Example: List

```go
results, err := client.User(nil).List(nil, nil)
```


### Widget

Create an instance: `widget := client.Widget(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.Widget(nil).Load(map[string]any{"id": "widget_id"}, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

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

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
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
