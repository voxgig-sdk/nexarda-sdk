# Nexarda SDK

Compare video game prices across 90+ approved retailers in GBP, EUR, and USD

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About NEXARDA API

[NEXARDA](https://www.nexarda.com) is a video game price-comparison platform that aggregates real-time offers from over 90 approved retailers across multiple regions and currencies (GBP, EUR, USD). This SDK wraps its public HTTP API, hosted at `https://api.nexarda.com`, with companion documentation on the [project wiki](https://github.com/NEXARDA/NEXARDA/wiki).

What you can pull from the API:

- Game records with release dates, ratings, screenshots and other media.
- Live pricing for games and gaming hardware from participating retailers.
- Console and gaming-gear specifications and franchise / studio metadata.
- Public user profile data such as avatars, wishlists and libraries.
- Search across games, studios, franchises, users and consoles (e.g. `GET /api/v3/search?type=games&q=Example+Game`).
- Embeddable widgets for integrating NEXARDA data into your own site.

Most endpoints are open and CORS-enabled, so they can be called directly from the browser. Premium endpoints require an API key issued by the NEXARDA dev team on request.

## Try it

**TypeScript**
```bash
npm install nexarda
```

**Python**
```bash
pip install nexarda-sdk
```

**PHP**
```bash
composer require voxgig/nexarda-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/nexarda-sdk/go
```

**Ruby**
```bash
gem install nexarda-sdk
```

**Lua**
```bash
luarocks install nexarda-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { NexardaSDK } from 'nexarda'

const client = new NexardaSDK({})

// List all consoles
const consoles = await client.Console().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o nexarda-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "nexarda": {
      "command": "/abs/path/to/nexarda-mcp"
    }
  }
}
```

## Entities

The API exposes 10 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Console** | Gaming console records with specifications and identifiers used across the catalogue. | `/consoles` |
| **Franchis** | Game franchise metadata grouping related titles under a shared series. | `/franchises` |
| **Game** | Core video game records including release dates, ratings, screenshots and other media. | `/games` |
| **Platform** | Distribution platform identifiers (for example Steam or GOG) used to scope offers and game data. | `/status` |
| **Price** | Real-time pricing data for games and gaming hardware sourced from 90+ approved retailers. | `/games/{gameId}/prices` |
| **Retailer** | Approved retailer entries that supply offers and affiliate links surfaced by the price comparison. | `/retailers` |
| **Search** | Cross-cutting search over games, studios, franchises, users and consoles via `GET /api/v3/search?type=...&q=...`. | `/search` |
| **Studio** | Developer and publisher records associated with games and franchises. | `/studios` |
| **User** | Public NEXARDA user profiles including avatars, wishlists and libraries. | `/users/{userId}/library` |
| **Widget** | Embeddable website widgets that render NEXARDA data on third-party sites. | `/widgets/button` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from nexarda_sdk import NexardaSDK

client = NexardaSDK({})

# List all consoles
consoles, err = client.Console(None).list(None, None)

# Load a specific console
console, err = client.Console(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'nexarda_sdk.php';

$client = new NexardaSDK([]);

// List all consoles
[$consoles, $err] = $client->Console(null)->list(null, null);

// Load a specific console
[$console, $err] = $client->Console(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/nexarda-sdk/go"

client := sdk.NewNexardaSDK(map[string]any{})

// List all consoles
consoles, err := client.Console(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Nexarda_sdk"

client = NexardaSDK.new({})

# List all consoles
consoles, err = client.Console(nil).list(nil, nil)

# Load a specific console
console, err = client.Console(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("nexarda_sdk")

local client = sdk.new({})

-- List all consoles
local consoles, err = client:Console(nil):list(nil, nil)

-- Load a specific console
local console, err = client:Console(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = NexardaSDK.test()
const result = await client.Console().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = NexardaSDK.test(None, None)
result, err = client.Console(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = NexardaSDK::test(null, null);
[$result, $err] = $client->Console(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Console(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = NexardaSDK.test(nil, nil)
result, err = client.Console(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Console(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the NEXARDA API

- Upstream: [https://www.nexarda.com](https://www.nexarda.com)
- API docs: [https://github.com/NEXARDA/NEXARDA/wiki](https://github.com/NEXARDA/NEXARDA/wiki)

- Most endpoints are free and public; some premium endpoints require an API key obtained by emailing `devteam@nexarda.com`.
- Affiliate links inside retailer offers must not be altered or stripped.
- Reselling or sublicensing API access is prohibited; copyrighted game data may not be commercialised.
- Attribution to NEXARDA is optional but appreciated.

---

Generated from the NEXARDA API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
