package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Nexarda",
			"slug": "nexarda",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.nexarda.com",
			"auth": map[string]any{
				"prefix": "",
				"name": "X-API-Key",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"console": map[string]any{},
				"franchis": map[string]any{},
				"game": map[string]any{},
				"platform": map[string]any{},
				"price": map[string]any{},
				"retailer": map[string]any{},
				"search": map[string]any{},
				"studio": map[string]any{},
				"user": map[string]any{},
				"widget": map[string]any{},
			},
		},
		"entity": map[string]any{
			"console": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Product description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique console identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "images",
						"short": "Product images",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "manufacturer",
						"short": "Manufacturer name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Console name",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date",
						"name": "releaseDate",
						"short": "Release date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "specifications",
						"short": "Technical specifications",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"short": "Product type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "console",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/consoles",
								"segments": []any{
									map[string]any{
										"lit": "consoles",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"consoles",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "console_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/consoles/{consoleId}",
								"rename": map[string]any{
									"param": map[string]any{
										"consoleId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "consoles",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"consoles",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"franchis": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Franchise description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "games",
						"short": "Game IDs included in franchise",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique franchise identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "logo",
						"short": "Franchise logo URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Franchise name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "totalGames",
						"short": "Total number of games in franchise",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "franchis",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/franchises",
								"segments": []any{
									map[string]any{
										"lit": "franchises",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"franchises",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "franchise_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/franchises/{franchiseId}",
								"rename": map[string]any{
									"param": map[string]any{
										"franchiseId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "franchises",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"franchises",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"game": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ageRating",
						"short": "Age rating (e.g., ESRB, PEGI)",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "coverImage",
						"short": "Cover image URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Game description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "developer",
						"short": "Developer name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "franchiseId",
						"short": "Associated franchise ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "genres",
						"short": "Game genres",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique game identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Game title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "platforms",
						"short": "Supported platforms",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "publisher",
						"short": "Publisher name",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date",
						"name": "releaseDate",
						"short": "Release date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "screenshots",
						"short": "Screenshot URLs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "videos",
						"short": "Video media",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "game",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/games",
								"segments": []any{
									map[string]any{
										"lit": "games",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"games",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "platform_id",
											"orig": "platform_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "platform",
											"orig": "platform",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/games/platform/{platformId}",
								"rename": map[string]any{
									"param": map[string]any{
										"platformId": "platform_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "games",
									},
									map[string]any{
										"lit": "platform",
									},
									map[string]any{
										"var": "platform_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"platform",
										"platform_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"games",
									"platform",
									"{platform_id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "game_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/games/{gameId}",
								"rename": map[string]any{
									"param": map[string]any{
										"gameId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "games",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"games",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"platform",
						},
					},
				},
			},
			"platform": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "api",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "priceUpdates",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"short": "Overall platform status",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "timestamp",
						"short": "Status check timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "website",
						"type": "`$OBJECT`",
					},
				},
				"name": "platform",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/status",
								"segments": []any{
									map[string]any{
										"lit": "status",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"status",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"price": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "uri",
						"name": "affiliateLink",
						"short": "Affiliate link to retailer (do not modify)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currency",
						"short": "Currency code (GBP, EUR, USD)",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "float",
						"name": "discount",
						"short": "Discount percentage",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "inStock",
						"short": "Stock availability",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"format": "date-time",
						"name": "lastUpdated",
						"short": "Last price update timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "float",
						"name": "originalPrice",
						"short": "Original price before discount",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "float",
						"name": "price",
						"short": "Current price",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "region",
						"short": "Region code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "retailerId",
						"short": "Retailer identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "retailerName",
						"short": "Retailer name",
						"type": "`$STRING`",
					},
				},
				"name": "price",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "game_id",
											"orig": "game_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "USD",
											"kind": "query",
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "region",
											"orig": "region",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/games/{gameId}/prices",
								"rename": map[string]any{
									"param": map[string]any{
										"gameId": "game_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "games",
									},
									map[string]any{
										"var": "game_id",
									},
									map[string]any{
										"lit": "prices",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"currency",
										"game_id",
										"region",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"games",
									"{game_id}",
									"prices",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "console_id",
											"orig": "console_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "USD",
											"kind": "query",
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/consoles/{consoleId}/prices",
								"rename": map[string]any{
									"param": map[string]any{
										"consoleId": "console_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "consoles",
									},
									map[string]any{
										"var": "console_id",
									},
									map[string]any{
										"lit": "prices",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"console_id",
										"currency",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"consoles",
									"{console_id}",
									"prices",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"console",
						},
						[]any{
							"game",
						},
					},
				},
			},
			"retailer": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "approved",
						"short": "Approval status",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "currencies",
						"short": "Supported currencies",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique retailer identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "logo",
						"short": "Retailer logo URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Retailer name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "regions",
						"short": "Supported regions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "uri",
						"name": "website",
						"short": "Retailer website",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "retailer",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/retailers",
								"segments": []any{
									map[string]any{
										"lit": "retailers",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"retailers",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "consoles",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "games",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "totalResults",
						"type": "`$INTEGER`",
					},
				},
				"name": "search",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "all",
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"q",
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"search",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"studio": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Studio description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "foundingYear",
						"short": "Year founded",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "games",
						"short": "Released game IDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique studio identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "location",
						"short": "Studio location",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "uri",
						"name": "logo",
						"short": "Studio logo URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Studio name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Studio type",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "website",
						"short": "Official website",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "studio",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/studios",
								"segments": []any{
									map[string]any{
										"lit": "studios",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"studios",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "studio_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/studios/{studioId}",
								"rename": map[string]any{
									"param": map[string]any{
										"studioId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "studios",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"studios",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "uri",
						"name": "avatar",
						"short": "Avatar image URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique user identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "joinDate",
						"short": "Account creation date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "libraryCount",
						"short": "Number of games in library",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "username",
						"short": "Username",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wishlistCount",
						"short": "Number of items in wishlist",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "user",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/library",
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "library",
									},
								},
								"select": map[string]any{
									"$action": "library",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"users",
									"{id}",
									"library",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/wishlist",
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "wishlist",
									},
								},
								"select": map[string]any{
									"$action": "wishlist",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"users",
									"{id}",
									"wishlist",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}",
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"users",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"widget": map[string]any{
				"fields": []any{},
				"name": "widget",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "product_id",
											"orig": "product_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "View Deals",
											"kind": "query",
											"name": "text",
											"orig": "text",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/widgets/button",
								"segments": []any{
									map[string]any{
										"lit": "widgets",
									},
									map[string]any{
										"lit": "button",
									},
								},
								"select": map[string]any{
									"$action": "button",
									"exist": []any{
										"product_id",
										"text",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"widgets",
									"button",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "product_id",
											"orig": "product_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "light",
											"kind": "query",
											"name": "theme",
											"orig": "theme",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/widgets/product-card",
								"segments": []any{
									map[string]any{
										"lit": "widgets",
									},
									map[string]any{
										"lit": "product-card",
									},
								},
								"select": map[string]any{
									"$action": "product_card",
									"exist": []any{
										"product_id",
										"theme",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"widgets",
									"product-card",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
