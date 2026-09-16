# NEXARDA API

The NEXARDA API provides access to a video game price comparison service, allowing users to find deals from over 90 approved retailers. It enables developers to integrate price checks for video games, consoles, and gaming gear directly into their applications. Most endpoints are free to use and don&#39;t require authentication.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 10 entities and 19 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Console

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Product description
- `id`: Unique console identifier
- `images`: Product images
- `manufacturer`: Manufacturer name
- `name`: Console name

### Franchis

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Franchise description
- `games`: Game IDs included in franchise
- `id`: Unique franchise identifier
- `logo`: Franchise logo URL
- `name`: Franchise name

### Game

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `ageRating`: Age rating (for example, ESRB, PEGI)
- `coverImage`: Cover image URL
- `description`: Game description
- `developer`: Developer name
- `franchiseId`: Associated franchise ID

### Platform

Results: Successful response.

SDK operations: `load`.

Key fields to recognise:

- `status`: Overall platform status
- `timestamp`: Status check timestamp

### Price

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `affiliateLink`: Affiliate link to retailer (do not modify)
- `currency`: Currency code (GBP, EUR, USD)
- `discount`: Discount percentage
- `inStock`: Stock availability
- `lastUpdated`: Last price update timestamp

### Retailer

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `approved`: Approval status
- `currencies`: Supported currencies
- `id`: Unique retailer identifier
- `logo`: Retailer logo URL
- `name`: Retailer name

### Search

Results: Successful response.

SDK operations: `load`.

### Studio

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Studio description
- `foundingYear`: Year founded
- `games`: Released game IDs
- `id`: Unique studio identifier
- `location`: Studio location

### User

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `ageRating`: Age rating (for example, ESRB, PEGI)
- `avatar`: Avatar image URL
- `coverImage`: Cover image URL
- `description`: Game description
- `developer`: Developer name

### Widget

Results: Successful response.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Console | `list` | `GET /consoles` | See reference |
| Console | `load` | `GET /consoles/{consoleId}` | See reference |
| Franchis | `list` | `GET /franchises` | See reference |
| Franchis | `load` | `GET /franchises/{franchiseId}` | See reference |
| Game | `list` | `GET /games` | See reference |
| Game | `load` | `GET /games/platform/{platformId}` | See reference |
| Game | `load` | `GET /games/{gameId}` | See reference |
| Platform | `load` | `GET /status` | See reference |
| Price | `list` | `GET /games/{gameId}/prices` | See reference |
| Price | `list` | `GET /consoles/{consoleId}/prices` | See reference |
| Retailer | `list` | `GET /retailers` | See reference |
| Search | `load` | `GET /search` | See reference |
| Studio | `list` | `GET /studios` | See reference |
| Studio | `load` | `GET /studios/{studioId}` | See reference |
| User | `list` | `GET /users/{userId}/library` | Required |
| User | `list` | `GET /users/{userId}/wishlist` | Required |
| User | `load` | `GET /users/{userId}` | Required |
| Widget | `load` | `GET /widgets/button` | See reference |
| Widget | `load` | `GET /widgets/product-card` | See reference |

## Connect to the API

- Production server: `https://api.nexarda.com`

The default credential is sent in the `X-API-Key` header.

API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `nexarda_list`: List records for an entity. Supported entities: `console`, `franchis`, `game`, `price`, `retailer`, `studio`, `user`.
- `nexarda_load`: Load one record for an entity. Supported entities: `console`, `franchis`, `game`, `platform`, `search`, `studio`, `user`, `widget`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

