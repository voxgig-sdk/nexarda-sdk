# frozen_string_literal: true

# Typed models for the Nexarda SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Console entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] images
#   @return [Array, nil]
#
# @!attribute [rw] manufacturer
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] releaseDate
#   @return [String, nil]
#
# @!attribute [rw] specifications
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Console = Struct.new(
  :description,
  :id,
  :images,
  :manufacturer,
  :name,
  :releaseDate,
  :specifications,
  :type,
  keyword_init: true
)

# Request payload for Console#load.
#
# @!attribute [rw] id
#   @return [String]
ConsoleLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Console#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] images
#   @return [Array, nil]
#
# @!attribute [rw] manufacturer
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] releaseDate
#   @return [String, nil]
#
# @!attribute [rw] specifications
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
ConsoleListMatch = Struct.new(
  :description,
  :id,
  :images,
  :manufacturer,
  :name,
  :releaseDate,
  :specifications,
  :type,
  keyword_init: true
)

# Franchis entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] games
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] logo
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] totalGames
#   @return [Integer, nil]
Franchis = Struct.new(
  :description,
  :games,
  :id,
  :logo,
  :name,
  :totalGames,
  keyword_init: true
)

# Request payload for Franchis#load.
#
# @!attribute [rw] id
#   @return [String]
FranchisLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Franchis#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] games
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] logo
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] totalGames
#   @return [Integer, nil]
FranchisListMatch = Struct.new(
  :description,
  :games,
  :id,
  :logo,
  :name,
  :totalGames,
  keyword_init: true
)

# Game entity data model.
#
# @!attribute [rw] ageRating
#   @return [String, nil]
#
# @!attribute [rw] coverImage
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] developer
#   @return [String, nil]
#
# @!attribute [rw] franchiseId
#   @return [String, nil]
#
# @!attribute [rw] genres
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] platforms
#   @return [Array, nil]
#
# @!attribute [rw] publisher
#   @return [String, nil]
#
# @!attribute [rw] releaseDate
#   @return [String, nil]
#
# @!attribute [rw] screenshots
#   @return [Array, nil]
#
# @!attribute [rw] videos
#   @return [Array, nil]
Game = Struct.new(
  :ageRating,
  :coverImage,
  :description,
  :developer,
  :franchiseId,
  :genres,
  :id,
  :name,
  :platforms,
  :publisher,
  :releaseDate,
  :screenshots,
  :videos,
  keyword_init: true
)

# Request payload for Game#load.
#
# @!attribute [rw] platform_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
GameLoadMatch = Struct.new(
  :platform_id,
  :id,
  keyword_init: true
)

# Request payload for Game#list.
#
# @!attribute [rw] ageRating
#   @return [String, nil]
#
# @!attribute [rw] coverImage
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] developer
#   @return [String, nil]
#
# @!attribute [rw] franchiseId
#   @return [String, nil]
#
# @!attribute [rw] genres
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] platforms
#   @return [Array, nil]
#
# @!attribute [rw] publisher
#   @return [String, nil]
#
# @!attribute [rw] releaseDate
#   @return [String, nil]
#
# @!attribute [rw] screenshots
#   @return [Array, nil]
#
# @!attribute [rw] videos
#   @return [Array, nil]
GameListMatch = Struct.new(
  :ageRating,
  :coverImage,
  :description,
  :developer,
  :franchiseId,
  :genres,
  :id,
  :name,
  :platforms,
  :publisher,
  :releaseDate,
  :screenshots,
  :videos,
  keyword_init: true
)

# Platform entity data model.
#
# @!attribute [rw] api
#   @return [Hash, nil]
#
# @!attribute [rw] priceUpdates
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [Hash, nil]
Platform = Struct.new(
  :api,
  :priceUpdates,
  :status,
  :timestamp,
  :website,
  keyword_init: true
)

# Request payload for Platform#load.
#
# @!attribute [rw] api
#   @return [Hash, nil]
#
# @!attribute [rw] priceUpdates
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [Hash, nil]
PlatformLoadMatch = Struct.new(
  :api,
  :priceUpdates,
  :status,
  :timestamp,
  :website,
  keyword_init: true
)

# Price entity data model.
#
# @!attribute [rw] affiliateLink
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] discount
#   @return [Float, nil]
#
# @!attribute [rw] inStock
#   @return [Boolean, nil]
#
# @!attribute [rw] lastUpdated
#   @return [String, nil]
#
# @!attribute [rw] originalPrice
#   @return [Float, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] retailerId
#   @return [String, nil]
#
# @!attribute [rw] retailerName
#   @return [String, nil]
Price = Struct.new(
  :affiliateLink,
  :currency,
  :discount,
  :inStock,
  :lastUpdated,
  :originalPrice,
  :price,
  :region,
  :retailerId,
  :retailerName,
  keyword_init: true
)

# Request payload for Price#list.
#
# @!attribute [rw] game_id
#   @return [String, nil]
#
# @!attribute [rw] console_id
#   @return [String, nil]
PriceListMatch = Struct.new(
  :game_id,
  :console_id,
  keyword_init: true
)

# Retailer entity data model.
#
# @!attribute [rw] approved
#   @return [Boolean, nil]
#
# @!attribute [rw] currencies
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] logo
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] regions
#   @return [Array, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
Retailer = Struct.new(
  :approved,
  :currencies,
  :id,
  :logo,
  :name,
  :regions,
  :website,
  keyword_init: true
)

# Request payload for Retailer#list.
#
# @!attribute [rw] approved
#   @return [Boolean, nil]
#
# @!attribute [rw] currencies
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] logo
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] regions
#   @return [Array, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
RetailerListMatch = Struct.new(
  :approved,
  :currencies,
  :id,
  :logo,
  :name,
  :regions,
  :website,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] consoles
#   @return [Array, nil]
#
# @!attribute [rw] games
#   @return [Array, nil]
#
# @!attribute [rw] totalResults
#   @return [Integer, nil]
Search = Struct.new(
  :consoles,
  :games,
  :totalResults,
  keyword_init: true
)

# Request payload for Search#load.
#
# @!attribute [rw] consoles
#   @return [Array, nil]
#
# @!attribute [rw] games
#   @return [Array, nil]
#
# @!attribute [rw] totalResults
#   @return [Integer, nil]
SearchLoadMatch = Struct.new(
  :consoles,
  :games,
  :totalResults,
  keyword_init: true
)

# Studio entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] foundingYear
#   @return [Integer, nil]
#
# @!attribute [rw] games
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] logo
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
Studio = Struct.new(
  :description,
  :foundingYear,
  :games,
  :id,
  :location,
  :logo,
  :name,
  :type,
  :website,
  keyword_init: true
)

# Request payload for Studio#load.
#
# @!attribute [rw] id
#   @return [String]
StudioLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Studio#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] foundingYear
#   @return [Integer, nil]
#
# @!attribute [rw] games
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] logo
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
StudioListMatch = Struct.new(
  :description,
  :foundingYear,
  :games,
  :id,
  :location,
  :logo,
  :name,
  :type,
  :website,
  keyword_init: true
)

# User entity data model.
#
# @!attribute [rw] ageRating
#   @return [String, nil]
#
# @!attribute [rw] avatar
#   @return [String, nil]
#
# @!attribute [rw] coverImage
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] developer
#   @return [String, nil]
#
# @!attribute [rw] franchiseId
#   @return [String, nil]
#
# @!attribute [rw] genres
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] joinDate
#   @return [String, nil]
#
# @!attribute [rw] libraryCount
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] platforms
#   @return [Array, nil]
#
# @!attribute [rw] publisher
#   @return [String, nil]
#
# @!attribute [rw] releaseDate
#   @return [String, nil]
#
# @!attribute [rw] screenshots
#   @return [Array, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
#
# @!attribute [rw] videos
#   @return [Array, nil]
#
# @!attribute [rw] wishlistCount
#   @return [Integer, nil]
User = Struct.new(
  :ageRating,
  :avatar,
  :coverImage,
  :description,
  :developer,
  :franchiseId,
  :genres,
  :id,
  :joinDate,
  :libraryCount,
  :name,
  :platforms,
  :publisher,
  :releaseDate,
  :screenshots,
  :username,
  :videos,
  :wishlistCount,
  keyword_init: true
)

# Request payload for User#load.
#
# @!attribute [rw] id
#   @return [String]
UserLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for User#list.
#
# @!attribute [rw] id
#   @return [String]
UserListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Widget entity data model.
class Widget
end

# Request payload for Widget#load.
class WidgetLoadMatch
end

