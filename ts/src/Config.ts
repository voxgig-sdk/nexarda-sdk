
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Nexarda',
        slug: "nexarda",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.nexarda.com",

    auth: {
      prefix: '',
      name: 'X-API-Key',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        console: {
        },
  
        franchis: {
        },
  
        game: {
        },
  
        platform: {
        },
  
        price: {
        },
  
        retailer: {
        },
  
        search: {
        },
  
        studio: {
        },
  
        user: {
        },
  
        widget: {
        },
  
    }
  }


  entity = {
    "console": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Product description"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique console identifier"
        },
        {
          "name": "images",
          "title": "Images",
          "type": "`$ARRAY`",
          "short": "Product images"
        },
        {
          "name": "manufacturer",
          "title": "Manufacturer",
          "type": "`$STRING`",
          "short": "Manufacturer name"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Console name"
        },
        {
          "name": "releaseDate",
          "title": "Release Date",
          "type": "`$STRING`",
          "short": "Release date",
          "format": "date"
        },
        {
          "name": "specifications",
          "title": "Specifications",
          "type": "`$OBJECT`",
          "short": "Technical specifications"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Product type"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "console",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/consoles",
              "segments": [
                {
                  "lit": "consoles"
                }
              ],
              "parts": [
                "consoles"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  }
                ]
              },
              "select": {
                "exist": [
                  "limit"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/consoles/{consoleId}",
              "segments": [
                {
                  "lit": "consoles"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "consoles",
                "{id}"
              ],
              "rename": {
                "param": {
                  "consoleId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "console_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "franchis": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Franchise description"
        },
        {
          "name": "games",
          "title": "Games",
          "type": "`$ARRAY`",
          "short": "Game IDs included in franchise"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique franchise identifier"
        },
        {
          "name": "logo",
          "title": "Logo",
          "type": "`$STRING`",
          "short": "Franchise logo URL",
          "format": "uri"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Franchise name"
        },
        {
          "name": "totalGames",
          "title": "Total Games",
          "type": "`$INTEGER`",
          "short": "Total number of games in franchise"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "franchis",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/franchises",
              "segments": [
                {
                  "lit": "franchises"
                }
              ],
              "parts": [
                "franchises"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  }
                ]
              },
              "select": {
                "exist": [
                  "limit"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/franchises/{franchiseId}",
              "segments": [
                {
                  "lit": "franchises"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "franchises",
                "{id}"
              ],
              "rename": {
                "param": {
                  "franchiseId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "franchise_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "game": {
      "fields": [
        {
          "name": "ageRating",
          "title": "Age Rating",
          "type": "`$STRING`",
          "short": "Age rating (e.g., ESRB, PEGI)"
        },
        {
          "name": "coverImage",
          "title": "Cover Image",
          "type": "`$STRING`",
          "short": "Cover image URL",
          "format": "uri"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Game description"
        },
        {
          "name": "developer",
          "title": "Developer",
          "type": "`$STRING`",
          "short": "Developer name"
        },
        {
          "name": "franchiseId",
          "title": "Franchise Id",
          "type": "`$STRING`",
          "short": "Associated franchise ID"
        },
        {
          "name": "genres",
          "title": "Genres",
          "type": "`$ARRAY`",
          "short": "Game genres"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique game identifier"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Game title"
        },
        {
          "name": "platforms",
          "title": "Platforms",
          "type": "`$ARRAY`",
          "short": "Supported platforms"
        },
        {
          "name": "publisher",
          "title": "Publisher",
          "type": "`$STRING`",
          "short": "Publisher name"
        },
        {
          "name": "releaseDate",
          "title": "Release Date",
          "type": "`$STRING`",
          "short": "Release date",
          "format": "date"
        },
        {
          "name": "screenshots",
          "title": "Screenshots",
          "type": "`$ARRAY`",
          "short": "Screenshot URLs"
        },
        {
          "name": "videos",
          "title": "Videos",
          "type": "`$ARRAY`",
          "short": "Video media"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "game",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/games",
              "segments": [
                {
                  "lit": "games"
                }
              ],
              "parts": [
                "games"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "limit",
                  "offset"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/games/platform/{platformId}",
              "segments": [
                {
                  "lit": "games"
                },
                {
                  "lit": "platform"
                },
                {
                  "var": "platform_id"
                }
              ],
              "parts": [
                "games",
                "platform",
                "{platform_id}"
              ],
              "rename": {
                "param": {
                  "platformId": "platform_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "platform_id",
                    "orig": "platform_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "platform",
                    "orig": "platform",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "platform",
                  "platform_id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/games/{gameId}",
              "segments": [
                {
                  "lit": "games"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "games",
                "{id}"
              ],
              "rename": {
                "param": {
                  "gameId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "game_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.platform"
          ]
        ]
      }
    },
    "platform": {
      "fields": [
        {
          "name": "api",
          "title": "Api",
          "type": "`$OBJECT`"
        },
        {
          "name": "priceUpdates",
          "title": "Price Updates",
          "type": "`$OBJECT`"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "short": "Overall platform status"
        },
        {
          "name": "timestamp",
          "title": "Timestamp",
          "type": "`$STRING`",
          "short": "Status check timestamp",
          "format": "date-time"
        },
        {
          "name": "website",
          "title": "Website",
          "type": "`$OBJECT`"
        }
      ],
      "name": "platform",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/status",
              "segments": [
                {
                  "lit": "status"
                }
              ],
              "parts": [
                "status"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "price": {
      "fields": [
        {
          "name": "affiliateLink",
          "title": "Affiliate Link",
          "type": "`$STRING`",
          "short": "Affiliate link to retailer (do not modify)",
          "format": "uri"
        },
        {
          "name": "currency",
          "title": "Currency",
          "type": "`$STRING`",
          "short": "Currency code (GBP, EUR, USD)"
        },
        {
          "name": "discount",
          "title": "Discount",
          "type": "`$NUMBER`",
          "short": "Discount percentage",
          "format": "float"
        },
        {
          "name": "inStock",
          "title": "In Stock",
          "type": "`$BOOLEAN`",
          "short": "Stock availability"
        },
        {
          "name": "lastUpdated",
          "title": "Last Updated",
          "type": "`$STRING`",
          "short": "Last price update timestamp",
          "format": "date-time"
        },
        {
          "name": "originalPrice",
          "title": "Original Price",
          "type": "`$NUMBER`",
          "short": "Original price before discount",
          "format": "float"
        },
        {
          "name": "price",
          "title": "Price",
          "type": "`$NUMBER`",
          "short": "Current price",
          "format": "float"
        },
        {
          "name": "region",
          "title": "Region",
          "type": "`$STRING`",
          "short": "Region code"
        },
        {
          "name": "retailerId",
          "title": "Retailer Id",
          "type": "`$STRING`",
          "short": "Retailer identifier"
        },
        {
          "name": "retailerName",
          "title": "Retailer Name",
          "type": "`$STRING`",
          "short": "Retailer name"
        }
      ],
      "name": "price",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/games/{gameId}/prices",
              "segments": [
                {
                  "lit": "games"
                },
                {
                  "var": "game_id"
                },
                {
                  "lit": "prices"
                }
              ],
              "parts": [
                "games",
                "{game_id}",
                "prices"
              ],
              "rename": {
                "param": {
                  "gameId": "game_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "game_id",
                    "orig": "game_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "currency",
                    "orig": "currency",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "USD"
                  },
                  {
                    "name": "region",
                    "orig": "region",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "currency",
                  "game_id",
                  "region"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/consoles/{consoleId}/prices",
              "segments": [
                {
                  "lit": "consoles"
                },
                {
                  "var": "console_id"
                },
                {
                  "lit": "prices"
                }
              ],
              "parts": [
                "consoles",
                "{console_id}",
                "prices"
              ],
              "rename": {
                "param": {
                  "consoleId": "console_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "console_id",
                    "orig": "console_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "currency",
                    "orig": "currency",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "USD"
                  }
                ]
              },
              "select": {
                "exist": [
                  "console_id",
                  "currency"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.console"
          ],
          [
            "$.main.kit.entity.game"
          ]
        ]
      }
    },
    "retailer": {
      "fields": [
        {
          "name": "approved",
          "title": "Approved",
          "type": "`$BOOLEAN`",
          "short": "Approval status"
        },
        {
          "name": "currencies",
          "title": "Currencies",
          "type": "`$ARRAY`",
          "short": "Supported currencies"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique retailer identifier"
        },
        {
          "name": "logo",
          "title": "Logo",
          "type": "`$STRING`",
          "short": "Retailer logo URL",
          "format": "uri"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Retailer name"
        },
        {
          "name": "regions",
          "title": "Regions",
          "type": "`$ARRAY`",
          "short": "Supported regions"
        },
        {
          "name": "website",
          "title": "Website",
          "type": "`$STRING`",
          "short": "Retailer website",
          "format": "uri"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "retailer",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/retailers",
              "segments": [
                {
                  "lit": "retailers"
                }
              ],
              "parts": [
                "retailers"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "search": {
      "fields": [
        {
          "name": "consoles",
          "title": "Consoles",
          "type": "`$ARRAY`"
        },
        {
          "name": "games",
          "title": "Games",
          "type": "`$ARRAY`"
        },
        {
          "name": "totalResults",
          "title": "Total Results",
          "type": "`$INTEGER`"
        }
      ],
      "name": "search",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/search",
              "segments": [
                {
                  "lit": "search"
                }
              ],
              "parts": [
                "search"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  },
                  {
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "type",
                    "orig": "type",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "all"
                  }
                ]
              },
              "select": {
                "exist": [
                  "limit",
                  "q",
                  "type"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "studio": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Studio description"
        },
        {
          "name": "foundingYear",
          "title": "Founding Year",
          "type": "`$INTEGER`",
          "short": "Year founded"
        },
        {
          "name": "games",
          "title": "Games",
          "type": "`$ARRAY`",
          "short": "Released game IDs"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique studio identifier"
        },
        {
          "name": "location",
          "title": "Location",
          "type": "`$OBJECT`",
          "short": "Studio location"
        },
        {
          "name": "logo",
          "title": "Logo",
          "type": "`$STRING`",
          "short": "Studio logo URL",
          "format": "uri"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Studio name"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Studio type"
        },
        {
          "name": "website",
          "title": "Website",
          "type": "`$STRING`",
          "short": "Official website",
          "format": "uri"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "studio",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/studios",
              "segments": [
                {
                  "lit": "studios"
                }
              ],
              "parts": [
                "studios"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  },
                  {
                    "name": "type",
                    "orig": "type",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "limit",
                  "type"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/studios/{studioId}",
              "segments": [
                {
                  "lit": "studios"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "studios",
                "{id}"
              ],
              "rename": {
                "param": {
                  "studioId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "studio_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "user": {
      "fields": [
        {
          "name": "avatar",
          "title": "Avatar",
          "type": "`$STRING`",
          "short": "Avatar image URL",
          "format": "uri"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique user identifier"
        },
        {
          "name": "joinDate",
          "title": "Join Date",
          "type": "`$STRING`",
          "short": "Account creation date",
          "format": "date-time"
        },
        {
          "name": "libraryCount",
          "title": "Library Count",
          "type": "`$INTEGER`",
          "short": "Number of games in library"
        },
        {
          "name": "username",
          "title": "Username",
          "type": "`$STRING`",
          "short": "Username"
        },
        {
          "name": "wishlistCount",
          "title": "Wishlist Count",
          "type": "`$INTEGER`",
          "short": "Number of items in wishlist"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "user",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/users/{userId}/library",
              "segments": [
                {
                  "lit": "users"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "library"
                }
              ],
              "parts": [
                "users",
                "{id}",
                "library"
              ],
              "rename": {
                "param": {
                  "userId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "user_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "$action": "library",
                "exist": [
                  "id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/users/{userId}/wishlist",
              "segments": [
                {
                  "lit": "users"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "wishlist"
                }
              ],
              "parts": [
                "users",
                "{id}",
                "wishlist"
              ],
              "rename": {
                "param": {
                  "userId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "user_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "$action": "wishlist",
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/users/{userId}",
              "segments": [
                {
                  "lit": "users"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "users",
                "{id}"
              ],
              "rename": {
                "param": {
                  "userId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "user_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
              "kind": "http",
              "method": "GET",
              "orig": "/widgets/button",
              "segments": [
                {
                  "lit": "widgets"
                },
                {
                  "lit": "button"
                }
              ],
              "parts": [
                "widgets",
                "button"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "product_id",
                    "orig": "product_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "text",
                    "orig": "text",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "View Deals"
                  }
                ]
              },
              "select": {
                "$action": "button",
                "exist": [
                  "product_id",
                  "text"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/widgets/product-card",
              "segments": [
                {
                  "lit": "widgets"
                },
                {
                  "lit": "product-card"
                }
              ],
              "parts": [
                "widgets",
                "product-card"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "product_id",
                    "orig": "product_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "theme",
                    "orig": "theme",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "light"
                  }
                ]
              },
              "select": {
                "$action": "product_card",
                "exist": [
                  "product_id",
                  "theme"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

