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
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [Array, nil]
#
# @!attribute [rw] manufacturer
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] specification
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Console = Struct.new(
  :data,
  :description,
  :id,
  :image,
  :manufacturer,
  :name,
  :release_date,
  :specification,
  :success,
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
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [Array, nil]
#
# @!attribute [rw] manufacturer
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] specification
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
ConsoleListMatch = Struct.new(
  :data,
  :description,
  :id,
  :image,
  :manufacturer,
  :name,
  :release_date,
  :specification,
  :success,
  :type,
  keyword_init: true
)

# Franchis entity data model.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] game
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
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] total_game
#   @return [Integer, nil]
Franchis = Struct.new(
  :data,
  :description,
  :game,
  :id,
  :logo,
  :name,
  :success,
  :total_game,
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
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] game
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
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] total_game
#   @return [Integer, nil]
FranchisListMatch = Struct.new(
  :data,
  :description,
  :game,
  :id,
  :logo,
  :name,
  :success,
  :total_game,
  keyword_init: true
)

# Game entity data model.
#
# @!attribute [rw] age_rating
#   @return [String, nil]
#
# @!attribute [rw] cover_image
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] developer
#   @return [String, nil]
#
# @!attribute [rw] franchise_id
#   @return [String, nil]
#
# @!attribute [rw] genre
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] platform
#   @return [Array, nil]
#
# @!attribute [rw] publisher
#   @return [String, nil]
#
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] screenshot
#   @return [Array, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] video
#   @return [Array, nil]
Game = Struct.new(
  :age_rating,
  :cover_image,
  :data,
  :description,
  :developer,
  :franchise_id,
  :genre,
  :id,
  :name,
  :platform,
  :publisher,
  :release_date,
  :screenshot,
  :success,
  :video,
  keyword_init: true
)

# Request payload for Game#load.
#
# @!attribute [rw] platform_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
GameLoadMatch = Struct.new(
  :platform_id,
  :id,
  keyword_init: true
)

# Request payload for Game#list.
#
# @!attribute [rw] age_rating
#   @return [String, nil]
#
# @!attribute [rw] cover_image
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] developer
#   @return [String, nil]
#
# @!attribute [rw] franchise_id
#   @return [String, nil]
#
# @!attribute [rw] genre
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] platform
#   @return [Array, nil]
#
# @!attribute [rw] publisher
#   @return [String, nil]
#
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] screenshot
#   @return [Array, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] video
#   @return [Array, nil]
GameListMatch = Struct.new(
  :age_rating,
  :cover_image,
  :data,
  :description,
  :developer,
  :franchise_id,
  :genre,
  :id,
  :name,
  :platform,
  :publisher,
  :release_date,
  :screenshot,
  :success,
  :video,
  keyword_init: true
)

# Platform entity data model.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Platform = Struct.new(
  :data,
  :success,
  keyword_init: true
)

# Request payload for Platform#load.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
PlatformLoadMatch = Struct.new(
  :data,
  :success,
  keyword_init: true
)

# Price entity data model.
#
# @!attribute [rw] affiliate_link
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] discount
#   @return [Float, nil]
#
# @!attribute [rw] in_stock
#   @return [Boolean, nil]
#
# @!attribute [rw] last_updated
#   @return [String, nil]
#
# @!attribute [rw] original_price
#   @return [Float, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] retailer_id
#   @return [String, nil]
#
# @!attribute [rw] retailer_name
#   @return [String, nil]
Price = Struct.new(
  :affiliate_link,
  :currency,
  :discount,
  :in_stock,
  :last_updated,
  :original_price,
  :price,
  :region,
  :retailer_id,
  :retailer_name,
  keyword_init: true
)

# Request payload for Price#list.
#
# @!attribute [rw] game_id
#   @return [String]
#
# @!attribute [rw] console_id
#   @return [String]
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
# @!attribute [rw] currency
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
# @!attribute [rw] region
#   @return [Array, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
Retailer = Struct.new(
  :approved,
  :currency,
  :id,
  :logo,
  :name,
  :region,
  :website,
  keyword_init: true
)

# Request payload for Retailer#list.
#
# @!attribute [rw] approved
#   @return [Boolean, nil]
#
# @!attribute [rw] currency
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
# @!attribute [rw] region
#   @return [Array, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
RetailerListMatch = Struct.new(
  :approved,
  :currency,
  :id,
  :logo,
  :name,
  :region,
  :website,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Search = Struct.new(
  :data,
  :success,
  keyword_init: true
)

# Request payload for Search#load.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
SearchLoadMatch = Struct.new(
  :data,
  :success,
  keyword_init: true
)

# Studio entity data model.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] founding_year
#   @return [Integer, nil]
#
# @!attribute [rw] game
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
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
Studio = Struct.new(
  :data,
  :description,
  :founding_year,
  :game,
  :id,
  :location,
  :logo,
  :name,
  :success,
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
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] founding_year
#   @return [Integer, nil]
#
# @!attribute [rw] game
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
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
StudioListMatch = Struct.new(
  :data,
  :description,
  :founding_year,
  :game,
  :id,
  :location,
  :logo,
  :name,
  :success,
  :type,
  :website,
  keyword_init: true
)

# User entity data model.
#
# @!attribute [rw] age_rating
#   @return [String, nil]
#
# @!attribute [rw] cover_image
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] developer
#   @return [String, nil]
#
# @!attribute [rw] franchise_id
#   @return [String, nil]
#
# @!attribute [rw] genre
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] platform
#   @return [Array, nil]
#
# @!attribute [rw] publisher
#   @return [String, nil]
#
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] screenshot
#   @return [Array, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] video
#   @return [Array, nil]
User = Struct.new(
  :age_rating,
  :cover_image,
  :data,
  :description,
  :developer,
  :franchise_id,
  :genre,
  :id,
  :name,
  :platform,
  :publisher,
  :release_date,
  :screenshot,
  :success,
  :video,
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

