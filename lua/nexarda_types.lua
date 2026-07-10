-- Typed models for the Nexarda SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Console
---@field data? table
---@field description? string
---@field id? string
---@field image? table
---@field manufacturer? string
---@field name? string
---@field release_date? string
---@field specification? table
---@field success? boolean
---@field type? string

---@class ConsoleLoadMatch
---@field id string

---@class ConsoleListMatch
---@field data? table
---@field description? string
---@field id? string
---@field image? table
---@field manufacturer? string
---@field name? string
---@field release_date? string
---@field specification? table
---@field success? boolean
---@field type? string

---@class Franchis
---@field data? table
---@field description? string
---@field game? table
---@field id? string
---@field logo? string
---@field name? string
---@field success? boolean
---@field total_game? number

---@class FranchisLoadMatch
---@field id string

---@class FranchisListMatch
---@field data? table
---@field description? string
---@field game? table
---@field id? string
---@field logo? string
---@field name? string
---@field success? boolean
---@field total_game? number

---@class Game
---@field age_rating? string
---@field cover_image? string
---@field data? table
---@field description? string
---@field developer? string
---@field franchise_id? string
---@field genre? table
---@field id? string
---@field name? string
---@field platform? table
---@field publisher? string
---@field release_date? string
---@field screenshot? table
---@field success? boolean
---@field video? table

---@class GameLoadMatch
---@field platform_id? string
---@field id? string

---@class GameListMatch
---@field age_rating? string
---@field cover_image? string
---@field data? table
---@field description? string
---@field developer? string
---@field franchise_id? string
---@field genre? table
---@field id? string
---@field name? string
---@field platform? table
---@field publisher? string
---@field release_date? string
---@field screenshot? table
---@field success? boolean
---@field video? table

---@class Platform
---@field data? table
---@field success? boolean

---@class PlatformLoadMatch
---@field data? table
---@field success? boolean

---@class Price
---@field affiliate_link? string
---@field currency? string
---@field discount? number
---@field in_stock? boolean
---@field last_updated? string
---@field original_price? number
---@field price? number
---@field region? string
---@field retailer_id? string
---@field retailer_name? string

---@class PriceListMatch
---@field game_id? string
---@field console_id? string

---@class Retailer
---@field approved? boolean
---@field currency? table
---@field id? string
---@field logo? string
---@field name? string
---@field region? table
---@field website? string

---@class RetailerListMatch
---@field approved? boolean
---@field currency? table
---@field id? string
---@field logo? string
---@field name? string
---@field region? table
---@field website? string

---@class Search
---@field data? table
---@field success? boolean

---@class SearchLoadMatch
---@field data? table
---@field success? boolean

---@class Studio
---@field data? table
---@field description? string
---@field founding_year? number
---@field game? table
---@field id? string
---@field location? table
---@field logo? string
---@field name? string
---@field success? boolean
---@field type? string
---@field website? string

---@class StudioLoadMatch
---@field id string

---@class StudioListMatch
---@field data? table
---@field description? string
---@field founding_year? number
---@field game? table
---@field id? string
---@field location? table
---@field logo? string
---@field name? string
---@field success? boolean
---@field type? string
---@field website? string

---@class User
---@field age_rating? string
---@field cover_image? string
---@field data? table
---@field description? string
---@field developer? string
---@field franchise_id? string
---@field genre? table
---@field id? string
---@field name? string
---@field platform? table
---@field publisher? string
---@field release_date? string
---@field screenshot? table
---@field success? boolean
---@field video? table

---@class UserLoadMatch
---@field id string

---@class UserListMatch
---@field id string

---@class Widget

---@class WidgetLoadMatch

local M = {}

return M
