# Nexarda SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Nexarda",
            "slug": "nexarda",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.nexarda.com",
            "auth": {
                "prefix": "",
                "name": "X-API-Key",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "console": {},
                "franchis": {},
                "game": {},
                "platform": {},
                "price": {},
                "retailer": {},
                "search": {},
                "studio": {},
                "user": {},
                "widget": {},
            },
        },
        "entity": {
      "console": {
        "fields": [
          {
            "name": "description",
            "short": "Product description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique console identifier",
            "type": "`$STRING`",
          },
          {
            "name": "images",
            "short": "Product images",
            "type": "`$ARRAY`",
          },
          {
            "name": "manufacturer",
            "short": "Manufacturer name",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "Console name",
            "type": "`$STRING`",
          },
          {
            "format": "date",
            "name": "releaseDate",
            "short": "Release date",
            "type": "`$STRING`",
          },
          {
            "name": "specifications",
            "short": "Technical specifications",
            "type": "`$OBJECT`",
          },
          {
            "name": "type",
            "short": "Product type",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "console",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/consoles",
                "segments": [
                  {
                    "lit": "consoles",
                  },
                ],
                "select": {
                  "exist": [
                    "limit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "consoles",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "console_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/consoles/{consoleId}",
                "rename": {
                  "param": {
                    "consoleId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "consoles",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "consoles",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "franchis": {
        "fields": [
          {
            "name": "description",
            "short": "Franchise description",
            "type": "`$STRING`",
          },
          {
            "name": "games",
            "short": "Game IDs included in franchise",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "short": "Unique franchise identifier",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "logo",
            "short": "Franchise logo URL",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "Franchise name",
            "type": "`$STRING`",
          },
          {
            "name": "totalGames",
            "short": "Total number of games in franchise",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "franchis",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/franchises",
                "segments": [
                  {
                    "lit": "franchises",
                  },
                ],
                "select": {
                  "exist": [
                    "limit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "franchises",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "franchise_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/franchises/{franchiseId}",
                "rename": {
                  "param": {
                    "franchiseId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "franchises",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "franchises",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "game": {
        "fields": [
          {
            "name": "ageRating",
            "short": "Age rating (e.g., ESRB, PEGI)",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "coverImage",
            "short": "Cover image URL",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Game description",
            "type": "`$STRING`",
          },
          {
            "name": "developer",
            "short": "Developer name",
            "type": "`$STRING`",
          },
          {
            "name": "franchiseId",
            "short": "Associated franchise ID",
            "type": "`$STRING`",
          },
          {
            "name": "genres",
            "short": "Game genres",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "short": "Unique game identifier",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "Game title",
            "type": "`$STRING`",
          },
          {
            "name": "platforms",
            "short": "Supported platforms",
            "type": "`$ARRAY`",
          },
          {
            "name": "publisher",
            "short": "Publisher name",
            "type": "`$STRING`",
          },
          {
            "format": "date",
            "name": "releaseDate",
            "short": "Release date",
            "type": "`$STRING`",
          },
          {
            "name": "screenshots",
            "short": "Screenshot URLs",
            "type": "`$ARRAY`",
          },
          {
            "name": "videos",
            "short": "Video media",
            "type": "`$ARRAY`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "game",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/games",
                "segments": [
                  {
                    "lit": "games",
                  },
                ],
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "games",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "platform_id",
                      "orig": "platform_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "platform",
                      "orig": "platform",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/games/platform/{platformId}",
                "rename": {
                  "param": {
                    "platformId": "platform_id",
                  },
                },
                "segments": [
                  {
                    "lit": "games",
                  },
                  {
                    "lit": "platform",
                  },
                  {
                    "var": "platform_id",
                  },
                ],
                "select": {
                  "exist": [
                    "platform",
                    "platform_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "games",
                  "platform",
                  "{platform_id}",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "game_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/games/{gameId}",
                "rename": {
                  "param": {
                    "gameId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "games",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "games",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "platform",
            ],
          ],
        },
      },
      "platform": {
        "fields": [
          {
            "name": "api",
            "type": "`$OBJECT`",
          },
          {
            "name": "priceUpdates",
            "type": "`$OBJECT`",
          },
          {
            "name": "status",
            "short": "Overall platform status",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "timestamp",
            "short": "Status check timestamp",
            "type": "`$STRING`",
          },
          {
            "name": "website",
            "type": "`$OBJECT`",
          },
        ],
        "name": "platform",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/status",
                "segments": [
                  {
                    "lit": "status",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "status",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "price": {
        "fields": [
          {
            "format": "uri",
            "name": "affiliateLink",
            "short": "Affiliate link to retailer (do not modify)",
            "type": "`$STRING`",
          },
          {
            "name": "currency",
            "short": "Currency code (GBP, EUR, USD)",
            "type": "`$STRING`",
          },
          {
            "format": "float",
            "name": "discount",
            "short": "Discount percentage",
            "type": "`$NUMBER`",
          },
          {
            "name": "inStock",
            "short": "Stock availability",
            "type": "`$BOOLEAN`",
          },
          {
            "format": "date-time",
            "name": "lastUpdated",
            "short": "Last price update timestamp",
            "type": "`$STRING`",
          },
          {
            "format": "float",
            "name": "originalPrice",
            "short": "Original price before discount",
            "type": "`$NUMBER`",
          },
          {
            "format": "float",
            "name": "price",
            "short": "Current price",
            "type": "`$NUMBER`",
          },
          {
            "name": "region",
            "short": "Region code",
            "type": "`$STRING`",
          },
          {
            "name": "retailerId",
            "short": "Retailer identifier",
            "type": "`$STRING`",
          },
          {
            "name": "retailerName",
            "short": "Retailer name",
            "type": "`$STRING`",
          },
        ],
        "name": "price",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "game_id",
                      "orig": "game_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "USD",
                      "kind": "query",
                      "name": "currency",
                      "orig": "currency",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "region",
                      "orig": "region",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/games/{gameId}/prices",
                "rename": {
                  "param": {
                    "gameId": "game_id",
                  },
                },
                "segments": [
                  {
                    "lit": "games",
                  },
                  {
                    "var": "game_id",
                  },
                  {
                    "lit": "prices",
                  },
                ],
                "select": {
                  "exist": [
                    "currency",
                    "game_id",
                    "region",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "games",
                  "{game_id}",
                  "prices",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "console_id",
                      "orig": "console_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "USD",
                      "kind": "query",
                      "name": "currency",
                      "orig": "currency",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/consoles/{consoleId}/prices",
                "rename": {
                  "param": {
                    "consoleId": "console_id",
                  },
                },
                "segments": [
                  {
                    "lit": "consoles",
                  },
                  {
                    "var": "console_id",
                  },
                  {
                    "lit": "prices",
                  },
                ],
                "select": {
                  "exist": [
                    "console_id",
                    "currency",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "consoles",
                  "{console_id}",
                  "prices",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "console",
            ],
            [
              "game",
            ],
          ],
        },
      },
      "retailer": {
        "fields": [
          {
            "name": "approved",
            "short": "Approval status",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "currencies",
            "short": "Supported currencies",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "short": "Unique retailer identifier",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "logo",
            "short": "Retailer logo URL",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "Retailer name",
            "type": "`$STRING`",
          },
          {
            "name": "regions",
            "short": "Supported regions",
            "type": "`$ARRAY`",
          },
          {
            "format": "uri",
            "name": "website",
            "short": "Retailer website",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "retailer",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/retailers",
                "segments": [
                  {
                    "lit": "retailers",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "retailers",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "search": {
        "fields": [
          {
            "name": "consoles",
            "type": "`$ARRAY`",
          },
          {
            "name": "games",
            "type": "`$ARRAY`",
          },
          {
            "name": "totalResults",
            "type": "`$INTEGER`",
          },
        ],
        "name": "search",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "all",
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/search",
                "segments": [
                  {
                    "lit": "search",
                  },
                ],
                "select": {
                  "exist": [
                    "limit",
                    "q",
                    "type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "search",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "studio": {
        "fields": [
          {
            "name": "description",
            "short": "Studio description",
            "type": "`$STRING`",
          },
          {
            "name": "foundingYear",
            "short": "Year founded",
            "type": "`$INTEGER`",
          },
          {
            "name": "games",
            "short": "Released game IDs",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "short": "Unique studio identifier",
            "type": "`$STRING`",
          },
          {
            "name": "location",
            "short": "Studio location",
            "type": "`$OBJECT`",
          },
          {
            "format": "uri",
            "name": "logo",
            "short": "Studio logo URL",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "Studio name",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "Studio type",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "website",
            "short": "Official website",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "studio",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/studios",
                "segments": [
                  {
                    "lit": "studios",
                  },
                ],
                "select": {
                  "exist": [
                    "limit",
                    "type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "studios",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "studio_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/studios/{studioId}",
                "rename": {
                  "param": {
                    "studioId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "studios",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "studios",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "user": {
        "fields": [
          {
            "format": "uri",
            "name": "avatar",
            "short": "Avatar image URL",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique user identifier",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "joinDate",
            "short": "Account creation date",
            "type": "`$STRING`",
          },
          {
            "name": "libraryCount",
            "short": "Number of games in library",
            "type": "`$INTEGER`",
          },
          {
            "name": "username",
            "short": "Username",
            "type": "`$STRING`",
          },
          {
            "name": "wishlistCount",
            "short": "Number of items in wishlist",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "user",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/users/{userId}/library",
                "rename": {
                  "param": {
                    "userId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "library",
                  },
                ],
                "select": {
                  "$action": "library",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "users",
                  "{id}",
                  "library",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/users/{userId}/wishlist",
                "rename": {
                  "param": {
                    "userId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "wishlist",
                  },
                ],
                "select": {
                  "$action": "wishlist",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "users",
                  "{id}",
                  "wishlist",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/users/{userId}",
                "rename": {
                  "param": {
                    "userId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "users",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "widget": {
        "fields": [],
        "name": "widget",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "product_id",
                      "orig": "product_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "View Deals",
                      "kind": "query",
                      "name": "text",
                      "orig": "text",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/widgets/button",
                "segments": [
                  {
                    "lit": "widgets",
                  },
                  {
                    "lit": "button",
                  },
                ],
                "select": {
                  "$action": "button",
                  "exist": [
                    "product_id",
                    "text",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "widgets",
                  "button",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "product_id",
                      "orig": "product_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "light",
                      "kind": "query",
                      "name": "theme",
                      "orig": "theme",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/widgets/product-card",
                "segments": [
                  {
                    "lit": "widgets",
                  },
                  {
                    "lit": "product-card",
                  },
                ],
                "select": {
                  "$action": "product_card",
                  "exist": [
                    "product_id",
                    "theme",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "widgets",
                  "product-card",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
