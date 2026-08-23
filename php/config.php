<?php
declare(strict_types=1);

// Nexarda SDK configuration

class NexardaConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Nexarda",
                "slug" => "nexarda",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.nexarda.com",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "console" => [],
                    "franchis" => [],
                    "game" => [],
                    "platform" => [],
                    "price" => [],
                    "retailer" => [],
                    "search" => [],
                    "studio" => [],
                    "user" => [],
                    "widget" => [],
                ],
            ],
            "entity" => [
        'console' => [
          'fields' => [
            [
              'name' => 'description',
              'short' => 'Product description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique console identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'images',
              'short' => 'Product images',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'manufacturer',
              'short' => 'Manufacturer name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Console name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'releaseDate',
              'short' => 'Release date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'specifications',
              'short' => 'Technical specifications',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'type',
              'short' => 'Product type',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'console',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/consoles',
                  'parts' => [
                    'consoles',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'console_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/consoles/{consoleId}',
                  'parts' => [
                    'consoles',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'consoleId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'franchis' => [
          'fields' => [
            [
              'name' => 'description',
              'short' => 'Franchise description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'games',
              'short' => 'Game IDs included in franchise',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique franchise identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'logo',
              'short' => 'Franchise logo URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Franchise name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'totalGames',
              'short' => 'Total number of games in franchise',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'franchis',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/franchises',
                  'parts' => [
                    'franchises',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'franchise_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/franchises/{franchiseId}',
                  'parts' => [
                    'franchises',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'franchiseId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'game' => [
          'fields' => [
            [
              'name' => 'ageRating',
              'short' => 'Age rating (e.g., ESRB, PEGI)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'coverImage',
              'short' => 'Cover image URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'Game description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'developer',
              'short' => 'Developer name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'franchiseId',
              'short' => 'Associated franchise ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'genres',
              'short' => 'Game genres',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique game identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Game title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'platforms',
              'short' => 'Supported platforms',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'publisher',
              'short' => 'Publisher name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'releaseDate',
              'short' => 'Release date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'screenshots',
              'short' => 'Screenshot URLs',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'videos',
              'short' => 'Video media',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'game',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/games',
                  'parts' => [
                    'games',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'offset',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'platform_id',
                        'orig' => 'platform_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'platform',
                        'orig' => 'platform',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/games/platform/{platformId}',
                  'parts' => [
                    'games',
                    'platform',
                    '{platform_id}',
                  ],
                  'rename' => [
                    'param' => [
                      'platformId' => 'platform_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'platform',
                      'platform_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'game_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/games/{gameId}',
                  'parts' => [
                    'games',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'gameId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'platform',
              ],
            ],
          ],
        ],
        'platform' => [
          'fields' => [
            [
              'name' => 'api',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'priceUpdates',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'status',
              'short' => 'Overall platform status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'timestamp',
              'short' => 'Status check timestamp',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'website',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'platform',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/status',
                  'parts' => [
                    'status',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'price' => [
          'fields' => [
            [
              'name' => 'affiliateLink',
              'short' => 'Affiliate link to retailer (do not modify)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'currency',
              'short' => 'Currency code (GBP, EUR, USD)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'discount',
              'short' => 'Discount percentage',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'inStock',
              'short' => 'Stock availability',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'lastUpdated',
              'short' => 'Last price update timestamp',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'originalPrice',
              'short' => 'Original price before discount',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'price',
              'short' => 'Current price',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'region',
              'short' => 'Region code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'retailerId',
              'short' => 'Retailer identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'retailerName',
              'short' => 'Retailer name',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'price',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'game_id',
                        'orig' => 'game_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'USD',
                        'kind' => 'query',
                        'name' => 'currency',
                        'orig' => 'currency',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'region',
                        'orig' => 'region',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/games/{gameId}/prices',
                  'parts' => [
                    'games',
                    '{game_id}',
                    'prices',
                  ],
                  'rename' => [
                    'param' => [
                      'gameId' => 'game_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'currency',
                      'game_id',
                      'region',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'console_id',
                        'orig' => 'console_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'USD',
                        'kind' => 'query',
                        'name' => 'currency',
                        'orig' => 'currency',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/consoles/{consoleId}/prices',
                  'parts' => [
                    'consoles',
                    '{console_id}',
                    'prices',
                  ],
                  'rename' => [
                    'param' => [
                      'consoleId' => 'console_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'console_id',
                      'currency',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'console',
              ],
              [
                'game',
              ],
            ],
          ],
        ],
        'retailer' => [
          'fields' => [
            [
              'name' => 'approved',
              'short' => 'Approval status',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'currencies',
              'short' => 'Supported currencies',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique retailer identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'logo',
              'short' => 'Retailer logo URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Retailer name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'regions',
              'short' => 'Supported regions',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'website',
              'short' => 'Retailer website',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'retailer',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/retailers',
                  'parts' => [
                    'retailers',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'search' => [
          'fields' => [
            [
              'name' => 'consoles',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'games',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'totalResults',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'search',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'all',
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/search',
                  'parts' => [
                    'search',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'q',
                      'type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'studio' => [
          'fields' => [
            [
              'name' => 'description',
              'short' => 'Studio description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'foundingYear',
              'short' => 'Year founded',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'games',
              'short' => 'Released game IDs',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique studio identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'location',
              'short' => 'Studio location',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'logo',
              'short' => 'Studio logo URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Studio name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'short' => 'Studio type',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'website',
              'short' => 'Official website',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'studio',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/studios',
                  'parts' => [
                    'studios',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'studio_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/studios/{studioId}',
                  'parts' => [
                    'studios',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'studioId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'user' => [
          'fields' => [
            [
              'name' => 'ageRating',
              'short' => 'Age rating (e.g., ESRB, PEGI)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'avatar',
              'short' => 'Avatar image URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'coverImage',
              'short' => 'Cover image URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'Game description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'developer',
              'short' => 'Developer name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'franchiseId',
              'short' => 'Associated franchise ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'genres',
              'short' => 'Game genres',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique user identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'joinDate',
              'short' => 'Account creation date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'libraryCount',
              'short' => 'Number of games in library',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'short' => 'Game title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'platforms',
              'short' => 'Supported platforms',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'publisher',
              'short' => 'Publisher name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'releaseDate',
              'short' => 'Release date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'screenshots',
              'short' => 'Screenshot URLs',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'username',
              'short' => 'Username',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'videos',
              'short' => 'Video media',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'wishlistCount',
              'short' => 'Number of items in wishlist',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'user',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'user_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/users/{userId}/library',
                  'parts' => [
                    'users',
                    '{id}',
                    'library',
                  ],
                  'rename' => [
                    'param' => [
                      'userId' => 'id',
                    ],
                  ],
                  'select' => [
                    '$action' => 'library',
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'user_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/users/{userId}/wishlist',
                  'parts' => [
                    'users',
                    '{id}',
                    'wishlist',
                  ],
                  'rename' => [
                    'param' => [
                      'userId' => 'id',
                    ],
                  ],
                  'select' => [
                    '$action' => 'wishlist',
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'user_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/users/{userId}',
                  'parts' => [
                    'users',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'userId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'widget' => [
          'fields' => [],
          'name' => 'widget',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'product_id',
                        'orig' => 'product_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'View Deals',
                        'kind' => 'query',
                        'name' => 'text',
                        'orig' => 'text',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/widgets/button',
                  'parts' => [
                    'widgets',
                    'button',
                  ],
                  'select' => [
                    '$action' => 'button',
                    'exist' => [
                      'product_id',
                      'text',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'product_id',
                        'orig' => 'product_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'light',
                        'kind' => 'query',
                        'name' => 'theme',
                        'orig' => 'theme',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/widgets/product-card',
                  'parts' => [
                    'widgets',
                    'product-card',
                  ],
                  'select' => [
                    '$action' => 'product_card',
                    'exist' => [
                      'product_id',
                      'theme',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return NexardaFeatures::make_feature($name);
    }
}
