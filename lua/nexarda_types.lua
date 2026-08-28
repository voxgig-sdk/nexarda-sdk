-- Typed models for the Nexarda SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Console
---@field description? string
---@field id? string
---@field images? table
---@field manufacturer? string
---@field name? string
---@field releaseDate? string
---@field specifications? table
---@field type? string

---@class ConsoleLoadMatch
---@field id string

---@class ConsoleListMatch
---@field limit? number

---@class Franchis
---@field description? string
---@field games? table
---@field id? string
---@field logo? string
---@field name? string
---@field totalGames? number

---@class FranchisLoadMatch
---@field id string

---@class FranchisListMatch
---@field limit? number

---@class Game
---@field ageRating? string
---@field coverImage? string
---@field description? string
---@field developer? string
---@field franchiseId? string
---@field genres? table
---@field id? string
---@field name? string
---@field platforms? table
---@field publisher? string
---@field releaseDate? string
---@field screenshots? table
---@field videos? table

---@class GameLoadMatch
---@field id string

---@class GameListMatch
---@field limit? number
---@field offset? number

---@class Platform
---@field api? table
---@field priceUpdates? table
---@field status? string
---@field timestamp? string
---@field website? table

---@class PlatformLoadMatch
---@field api? table
---@field priceUpdates? table
---@field status? string
---@field timestamp? string
---@field website? table

---@class Price
---@field affiliateLink? string
---@field currency? string
---@field discount? number
---@field inStock? boolean
---@field lastUpdated? string
---@field originalPrice? number
---@field price? number
---@field region? string
---@field retailerId? string
---@field retailerName? string

---@class PriceListMatch
---@field game_id string
---@field currency? string
---@field region? string

---@class Retailer
---@field approved? boolean
---@field currencies? table
---@field id? string
---@field logo? string
---@field name? string
---@field regions? table
---@field website? string

---@class RetailerListMatch
---@field approved? boolean
---@field currencies? table
---@field id? string
---@field logo? string
---@field name? string
---@field regions? table
---@field website? string

---@class Search
---@field consoles? table
---@field games? table
---@field totalResults? number

---@class SearchLoadMatch
---@field limit? number
---@field q string
---@field type? string

---@class Studio
---@field description? string
---@field foundingYear? number
---@field games? table
---@field id? string
---@field location? table
---@field logo? string
---@field name? string
---@field type? string
---@field website? string

---@class StudioLoadMatch
---@field id string

---@class StudioListMatch
---@field limit? number
---@field type? string

---@class User
---@field ageRating? string
---@field avatar? string
---@field coverImage? string
---@field description? string
---@field developer? string
---@field franchiseId? string
---@field genres? table
---@field id? string
---@field joinDate? string
---@field libraryCount? number
---@field name? string
---@field platforms? table
---@field publisher? string
---@field releaseDate? string
---@field screenshots? table
---@field username? string
---@field videos? table
---@field wishlistCount? number

---@class UserLoadMatch
---@field id string

---@class UserListMatch
---@field id string

---@class Widget

---@class WidgetLoadMatch
---@field product_id string
---@field text? string
---@field theme? string

local M = {}

return M
