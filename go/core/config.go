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
						"title": "Description",
						"type": "`$STRING`",
						"short": "Product description",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique console identifier",
					},
					map[string]any{
						"name": "images",
						"title": "Images",
						"type": "`$ARRAY`",
						"short": "Product images",
					},
					map[string]any{
						"name": "manufacturer",
						"title": "Manufacturer",
						"type": "`$STRING`",
						"short": "Manufacturer name",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Console name",
					},
					map[string]any{
						"name": "releaseDate",
						"title": "Release Date",
						"type": "`$STRING`",
						"short": "Release date",
						"format": "date",
					},
					map[string]any{
						"name": "specifications",
						"title": "Specifications",
						"type": "`$OBJECT`",
						"short": "Technical specifications",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Product type",
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
								"kind": "http",
								"method": "GET",
								"orig": "/consoles",
								"segments": []any{
									map[string]any{
										"lit": "consoles",
									},
								},
								"parts": []any{
									"consoles",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/consoles/{consoleId}",
								"segments": []any{
									map[string]any{
										"lit": "consoles",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"consoles",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"consoleId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "console_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Description",
						"type": "`$STRING`",
						"short": "Franchise description",
					},
					map[string]any{
						"name": "games",
						"title": "Games",
						"type": "`$ARRAY`",
						"short": "Game IDs included in franchise",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique franchise identifier",
					},
					map[string]any{
						"name": "logo",
						"title": "Logo",
						"type": "`$STRING`",
						"short": "Franchise logo URL",
						"format": "uri",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Franchise name",
					},
					map[string]any{
						"name": "totalGames",
						"title": "Total Games",
						"type": "`$INTEGER`",
						"short": "Total number of games in franchise",
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
								"kind": "http",
								"method": "GET",
								"orig": "/franchises",
								"segments": []any{
									map[string]any{
										"lit": "franchises",
									},
								},
								"parts": []any{
									"franchises",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/franchises/{franchiseId}",
								"segments": []any{
									map[string]any{
										"lit": "franchises",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"franchises",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"franchiseId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "franchise_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Age Rating",
						"type": "`$STRING`",
						"short": "Age rating (e.g., ESRB, PEGI)",
					},
					map[string]any{
						"name": "coverImage",
						"title": "Cover Image",
						"type": "`$STRING`",
						"short": "Cover image URL",
						"format": "uri",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Game description",
					},
					map[string]any{
						"name": "developer",
						"title": "Developer",
						"type": "`$STRING`",
						"short": "Developer name",
					},
					map[string]any{
						"name": "franchiseId",
						"title": "Franchise Id",
						"type": "`$STRING`",
						"short": "Associated franchise ID",
					},
					map[string]any{
						"name": "genres",
						"title": "Genres",
						"type": "`$ARRAY`",
						"short": "Game genres",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique game identifier",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Game title",
					},
					map[string]any{
						"name": "platforms",
						"title": "Platforms",
						"type": "`$ARRAY`",
						"short": "Supported platforms",
					},
					map[string]any{
						"name": "publisher",
						"title": "Publisher",
						"type": "`$STRING`",
						"short": "Publisher name",
					},
					map[string]any{
						"name": "releaseDate",
						"title": "Release Date",
						"type": "`$STRING`",
						"short": "Release date",
						"format": "date",
					},
					map[string]any{
						"name": "screenshots",
						"title": "Screenshots",
						"type": "`$ARRAY`",
						"short": "Screenshot URLs",
					},
					map[string]any{
						"name": "videos",
						"title": "Videos",
						"type": "`$ARRAY`",
						"short": "Video media",
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
								"kind": "http",
								"method": "GET",
								"orig": "/games",
								"segments": []any{
									map[string]any{
										"lit": "games",
									},
								},
								"parts": []any{
									"games",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/games/platform/{platformId}",
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
								"parts": []any{
									"games",
									"platform",
									"{platform_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"platformId": "platform_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "platform_id",
											"orig": "platform_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "platform",
											"orig": "platform",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"platform",
										"platform_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/games/{gameId}",
								"segments": []any{
									map[string]any{
										"lit": "games",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"games",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"gameId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "game_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.platform",
						},
					},
				},
			},
			"platform": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "api",
						"title": "Api",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "priceUpdates",
						"title": "Price Updates",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Overall platform status",
					},
					map[string]any{
						"name": "timestamp",
						"title": "Timestamp",
						"type": "`$STRING`",
						"short": "Status check timestamp",
						"format": "date-time",
					},
					map[string]any{
						"name": "website",
						"title": "Website",
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
								"kind": "http",
								"method": "GET",
								"orig": "/status",
								"segments": []any{
									map[string]any{
										"lit": "status",
									},
								},
								"parts": []any{
									"status",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"name": "affiliateLink",
						"title": "Affiliate Link",
						"type": "`$STRING`",
						"short": "Affiliate link to retailer (do not modify)",
						"format": "uri",
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"short": "Currency code (GBP, EUR, USD)",
					},
					map[string]any{
						"name": "discount",
						"title": "Discount",
						"type": "`$NUMBER`",
						"short": "Discount percentage",
						"format": "float",
					},
					map[string]any{
						"name": "inStock",
						"title": "In Stock",
						"type": "`$BOOLEAN`",
						"short": "Stock availability",
					},
					map[string]any{
						"name": "lastUpdated",
						"title": "Last Updated",
						"type": "`$STRING`",
						"short": "Last price update timestamp",
						"format": "date-time",
					},
					map[string]any{
						"name": "originalPrice",
						"title": "Original Price",
						"type": "`$NUMBER`",
						"short": "Original price before discount",
						"format": "float",
					},
					map[string]any{
						"name": "price",
						"title": "Price",
						"type": "`$NUMBER`",
						"short": "Current price",
						"format": "float",
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$STRING`",
						"short": "Region code",
					},
					map[string]any{
						"name": "retailerId",
						"title": "Retailer Id",
						"type": "`$STRING`",
						"short": "Retailer identifier",
					},
					map[string]any{
						"name": "retailerName",
						"title": "Retailer Name",
						"type": "`$STRING`",
						"short": "Retailer name",
					},
				},
				"name": "price",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/games/{gameId}/prices",
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
								"parts": []any{
									"games",
									"{game_id}",
									"prices",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"gameId": "game_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "game_id",
											"orig": "game_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
											"kind": "query",
											"example": "USD",
										},
										map[string]any{
											"name": "region",
											"orig": "region",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"currency",
										"game_id",
										"region",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/consoles/{consoleId}/prices",
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
								"parts": []any{
									"consoles",
									"{console_id}",
									"prices",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"consoleId": "console_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "console_id",
											"orig": "console_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
											"kind": "query",
											"example": "USD",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"console_id",
										"currency",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.console",
						},
						[]any{
							"$.main.kit.entity.game",
						},
					},
				},
			},
			"retailer": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "approved",
						"title": "Approved",
						"type": "`$BOOLEAN`",
						"short": "Approval status",
					},
					map[string]any{
						"name": "currencies",
						"title": "Currencies",
						"type": "`$ARRAY`",
						"short": "Supported currencies",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique retailer identifier",
					},
					map[string]any{
						"name": "logo",
						"title": "Logo",
						"type": "`$STRING`",
						"short": "Retailer logo URL",
						"format": "uri",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Retailer name",
					},
					map[string]any{
						"name": "regions",
						"title": "Regions",
						"type": "`$ARRAY`",
						"short": "Supported regions",
					},
					map[string]any{
						"name": "website",
						"title": "Website",
						"type": "`$STRING`",
						"short": "Retailer website",
						"format": "uri",
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
								"kind": "http",
								"method": "GET",
								"orig": "/retailers",
								"segments": []any{
									map[string]any{
										"lit": "retailers",
									},
								},
								"parts": []any{
									"retailers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Consoles",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "games",
						"title": "Games",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "totalResults",
						"title": "Total Results",
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
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "all",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"q",
										"type",
									},
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
						"title": "Description",
						"type": "`$STRING`",
						"short": "Studio description",
					},
					map[string]any{
						"name": "foundingYear",
						"title": "Founding Year",
						"type": "`$INTEGER`",
						"short": "Year founded",
					},
					map[string]any{
						"name": "games",
						"title": "Games",
						"type": "`$ARRAY`",
						"short": "Released game IDs",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique studio identifier",
					},
					map[string]any{
						"name": "location",
						"title": "Location",
						"type": "`$OBJECT`",
						"short": "Studio location",
					},
					map[string]any{
						"name": "logo",
						"title": "Logo",
						"type": "`$STRING`",
						"short": "Studio logo URL",
						"format": "uri",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Studio name",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Studio type",
					},
					map[string]any{
						"name": "website",
						"title": "Website",
						"type": "`$STRING`",
						"short": "Official website",
						"format": "uri",
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
								"kind": "http",
								"method": "GET",
								"orig": "/studios",
								"segments": []any{
									map[string]any{
										"lit": "studios",
									},
								},
								"parts": []any{
									"studios",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"type",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/studios/{studioId}",
								"segments": []any{
									map[string]any{
										"lit": "studios",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"studios",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"studioId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "studio_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"name": "avatar",
						"title": "Avatar",
						"type": "`$STRING`",
						"short": "Avatar image URL",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique user identifier",
					},
					map[string]any{
						"name": "joinDate",
						"title": "Join Date",
						"type": "`$STRING`",
						"short": "Account creation date",
						"format": "date-time",
					},
					map[string]any{
						"name": "libraryCount",
						"title": "Library Count",
						"type": "`$INTEGER`",
						"short": "Number of games in library",
					},
					map[string]any{
						"name": "username",
						"title": "Username",
						"type": "`$STRING`",
						"short": "Username",
					},
					map[string]any{
						"name": "wishlistCount",
						"title": "Wishlist Count",
						"type": "`$INTEGER`",
						"short": "Number of items in wishlist",
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
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/library",
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
								"parts": []any{
									"users",
									"{id}",
									"library",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "library",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/wishlist",
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
								"parts": []any{
									"users",
									"{id}",
									"wishlist",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "wishlist",
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"users",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
								"parts": []any{
									"widgets",
									"button",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "product_id",
											"orig": "product_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "text",
											"orig": "text",
											"type": "`$STRING`",
											"kind": "query",
											"example": "View Deals",
										},
									},
								},
								"select": map[string]any{
									"$action": "button",
									"exist": []any{
										"product_id",
										"text",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"widgets",
									"product-card",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "product_id",
											"orig": "product_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "theme",
											"orig": "theme",
											"type": "`$STRING`",
											"kind": "query",
											"example": "light",
										},
									},
								},
								"select": map[string]any{
									"$action": "product_card",
									"exist": []any{
										"product_id",
										"theme",
									},
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
