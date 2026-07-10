package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Nexarda",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.nexarda.com",
			"auth": map[string]any{
				"prefix": "",
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
						"active": true,
						"name": "data",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "description",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "image",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "manufacturer",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "release_date",
						"req": false,
						"type": "`$STRING`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "specification",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "success",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "type",
						"req": false,
						"type": "`$STRING`",
						"index$": 9,
					},
				},
				"name": "console",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
								"method": "GET",
								"orig": "/consoles",
								"parts": []any{
									"consoles",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "console_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"method": "GET",
								"orig": "/consoles/{consoleId}",
								"parts": []any{
									"consoles",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"consoleId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"franchis": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "data",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "description",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "game",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "logo",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "success",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "total_game",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 7,
					},
				},
				"name": "franchis",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
								"method": "GET",
								"orig": "/franchises",
								"parts": []any{
									"franchises",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "franchise_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"method": "GET",
								"orig": "/franchises/{franchiseId}",
								"parts": []any{
									"franchises",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"franchiseId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"game": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "age_rating",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "cover_image",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "data",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "description",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "developer",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "franchise_id",
						"req": false,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "genre",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"req": false,
						"type": "`$STRING`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "platform",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "publisher",
						"req": false,
						"type": "`$STRING`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "release_date",
						"req": false,
						"type": "`$STRING`",
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "screenshot",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "success",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 13,
					},
					map[string]any{
						"active": true,
						"name": "video",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 14,
					},
				},
				"name": "game",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
								"method": "GET",
								"orig": "/games",
								"parts": []any{
									"games",
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
								"index$": 0,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "platform_id",
											"orig": "platform_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "platform",
											"orig": "platform",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"method": "GET",
								"orig": "/games/platform/{platformId}",
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
								"select": map[string]any{
									"exist": []any{
										"platform",
										"platform_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "game_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"method": "GET",
								"orig": "/games/{gameId}",
								"parts": []any{
									"games",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"gameId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 1,
							},
						},
						"key$": "load",
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
						"active": true,
						"name": "data",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "success",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 1,
					},
				},
				"name": "platform",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"method": "GET",
								"orig": "/status",
								"parts": []any{
									"status",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"price": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "affiliate_link",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "currency",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "discount",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "in_stock",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "last_updated",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "original_price",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "price",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "region",
						"req": false,
						"type": "`$STRING`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "retailer_id",
						"req": false,
						"type": "`$STRING`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "retailer_name",
						"req": false,
						"type": "`$STRING`",
						"index$": 9,
					},
				},
				"name": "price",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "game_id",
											"orig": "game_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"example": "USD",
											"kind": "query",
											"name": "currency",
											"orig": "currency",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "region",
											"orig": "region",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
								"method": "GET",
								"orig": "/games/{gameId}/prices",
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
								"select": map[string]any{
									"exist": []any{
										"currency",
										"game_id",
										"region",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "console_id",
											"orig": "console_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"example": "USD",
											"kind": "query",
											"name": "currency",
											"orig": "currency",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
								"method": "GET",
								"orig": "/consoles/{consoleId}/prices",
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
								"select": map[string]any{
									"exist": []any{
										"console_id",
										"currency",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 1,
							},
						},
						"key$": "list",
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
						"active": true,
						"name": "approved",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "currency",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "logo",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "region",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "website",
						"req": false,
						"type": "`$STRING`",
						"index$": 6,
					},
				},
				"name": "retailer",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"method": "GET",
								"orig": "/retailers",
								"parts": []any{
									"retailers",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "data",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "success",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 1,
					},
				},
				"name": "search",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "all",
											"kind": "query",
											"name": "type",
											"orig": "type",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
								"method": "GET",
								"orig": "/search",
								"parts": []any{
									"search",
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"studio": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "data",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "description",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "founding_year",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "game",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "location",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "logo",
						"req": false,
						"type": "`$STRING`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "success",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "type",
						"req": false,
						"type": "`$STRING`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "website",
						"req": false,
						"type": "`$STRING`",
						"index$": 10,
					},
				},
				"name": "studio",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "type",
											"orig": "type",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
								"method": "GET",
								"orig": "/studios",
								"parts": []any{
									"studios",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "studio_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"method": "GET",
								"orig": "/studios/{studioId}",
								"parts": []any{
									"studios",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"studioId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "age_rating",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "cover_image",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "data",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "description",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "developer",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "franchise_id",
						"req": false,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "genre",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"req": false,
						"type": "`$STRING`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "platform",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "publisher",
						"req": false,
						"type": "`$STRING`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "release_date",
						"req": false,
						"type": "`$STRING`",
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "screenshot",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "success",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 13,
					},
					map[string]any{
						"active": true,
						"name": "video",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 14,
					},
				},
				"name": "user",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"method": "GET",
								"orig": "/users/{userId}/library",
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
								"select": map[string]any{
									"$action": "library",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"method": "GET",
								"orig": "/users/{userId}/wishlist",
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
								"select": map[string]any{
									"$action": "wishlist",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 1,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"method": "GET",
								"orig": "/users/{userId}",
								"parts": []any{
									"users",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
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
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "product_id",
											"orig": "product_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "View Deals",
											"kind": "query",
											"name": "text",
											"orig": "text",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
								"method": "GET",
								"orig": "/widgets/button",
								"parts": []any{
									"widgets",
									"button",
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "product_id",
											"orig": "product_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "light",
											"kind": "query",
											"name": "theme",
											"orig": "theme",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
								"method": "GET",
								"orig": "/widgets/product-card",
								"parts": []any{
									"widgets",
									"product-card",
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
								"index$": 1,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
