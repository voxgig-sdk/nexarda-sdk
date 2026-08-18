-- Nexarda SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Nexarda",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.nexarda.com",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["console"] = {},
        ["franchis"] = {},
        ["game"] = {},
        ["platform"] = {},
        ["price"] = {},
        ["retailer"] = {},
        ["search"] = {},
        ["studio"] = {},
        ["user"] = {},
        ["widget"] = {},
      },
    },
    entity = {
      ["console"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "images",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "manufacturer",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "releaseDate",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "specifications",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "type",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "console",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 20,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/consoles",
                ["parts"] = {
                  "consoles",
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "console_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/consoles/{consoleId}",
                ["parts"] = {
                  "consoles",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["consoleId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["franchis"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "games",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "logo",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "totalGames",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "franchis",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 20,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/franchises",
                ["parts"] = {
                  "franchises",
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "franchise_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/franchises/{franchiseId}",
                ["parts"] = {
                  "franchises",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["franchiseId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["game"] = {
        ["fields"] = {
          {
            ["name"] = "ageRating",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "coverImage",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "developer",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "franchiseId",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "genres",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "platforms",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "publisher",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "releaseDate",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "screenshots",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "videos",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "game",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 20,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/games",
                ["parts"] = {
                  "games",
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "offset",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "platform_id",
                      ["orig"] = "platform_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "platform",
                      ["orig"] = "platform",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/games/platform/{platformId}",
                ["parts"] = {
                  "games",
                  "platform",
                  "{platform_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["platformId"] = "platform_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "platform",
                    "platform_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "game_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/games/{gameId}",
                ["parts"] = {
                  "games",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["gameId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "platform",
            },
          },
        },
      },
      ["platform"] = {
        ["fields"] = {
          {
            ["name"] = "api",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "priceUpdates",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "timestamp",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "website",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "platform",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/status",
                ["parts"] = {
                  "status",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["price"] = {
        ["fields"] = {
          {
            ["name"] = "affiliateLink",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "currency",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "discount",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "inStock",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "lastUpdated",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "originalPrice",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "price",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "region",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "retailerId",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "retailerName",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "price",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "game_id",
                      ["orig"] = "game_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "USD",
                      ["kind"] = "query",
                      ["name"] = "currency",
                      ["orig"] = "currency",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "region",
                      ["orig"] = "region",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/games/{gameId}/prices",
                ["parts"] = {
                  "games",
                  "{game_id}",
                  "prices",
                },
                ["rename"] = {
                  ["param"] = {
                    ["gameId"] = "game_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "currency",
                    "game_id",
                    "region",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "console_id",
                      ["orig"] = "console_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "USD",
                      ["kind"] = "query",
                      ["name"] = "currency",
                      ["orig"] = "currency",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/consoles/{consoleId}/prices",
                ["parts"] = {
                  "consoles",
                  "{console_id}",
                  "prices",
                },
                ["rename"] = {
                  ["param"] = {
                    ["consoleId"] = "console_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "console_id",
                    "currency",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "console",
            },
            {
              "game",
            },
          },
        },
      },
      ["retailer"] = {
        ["fields"] = {
          {
            ["name"] = "approved",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "currencies",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "logo",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "regions",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "website",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "retailer",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/retailers",
                ["parts"] = {
                  "retailers",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["search"] = {
        ["fields"] = {
          {
            ["name"] = "consoles",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "games",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "totalResults",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "search",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 20,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "all",
                      ["kind"] = "query",
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/search",
                ["parts"] = {
                  "search",
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "q",
                    "type",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["studio"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "foundingYear",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "games",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "location",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "logo",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "website",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "studio",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 20,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/studios",
                ["parts"] = {
                  "studios",
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "type",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "studio_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/studios/{studioId}",
                ["parts"] = {
                  "studios",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["studioId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["user"] = {
        ["fields"] = {
          {
            ["name"] = "ageRating",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "avatar",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "coverImage",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "developer",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "franchiseId",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "genres",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "joinDate",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "libraryCount",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "platforms",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "publisher",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "releaseDate",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "screenshots",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "username",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "videos",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "wishlistCount",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "user",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{userId}/library",
                ["parts"] = {
                  "users",
                  "{id}",
                  "library",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["select"] = {
                  ["$action"] = "library",
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{userId}/wishlist",
                ["parts"] = {
                  "users",
                  "{id}",
                  "wishlist",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["select"] = {
                  ["$action"] = "wishlist",
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{userId}",
                ["parts"] = {
                  "users",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["widget"] = {
        ["fields"] = {},
        ["name"] = "widget",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "product_id",
                      ["orig"] = "product_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "View Deals",
                      ["kind"] = "query",
                      ["name"] = "text",
                      ["orig"] = "text",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/widgets/button",
                ["parts"] = {
                  "widgets",
                  "button",
                },
                ["select"] = {
                  ["$action"] = "button",
                  ["exist"] = {
                    "product_id",
                    "text",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "product_id",
                      ["orig"] = "product_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "light",
                      ["kind"] = "query",
                      ["name"] = "theme",
                      ["orig"] = "theme",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/widgets/product-card",
                ["parts"] = {
                  "widgets",
                  "product-card",
                },
                ["select"] = {
                  ["$action"] = "product_card",
                  ["exist"] = {
                    "product_id",
                    "theme",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
