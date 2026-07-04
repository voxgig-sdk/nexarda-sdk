// Typed models for the Nexarda SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Console {
  data?: Record<string, any>
  description?: string
  id?: string
  image?: any[]
  manufacturer?: string
  name?: string
  release_date?: string
  specification?: Record<string, any>
  success?: boolean
  type?: string
}

export interface ConsoleLoadMatch {
  id: string
}

export type ConsoleListMatch = Partial<Console>

export interface Franchis {
  data?: Record<string, any>
  description?: string
  game?: any[]
  id?: string
  logo?: string
  name?: string
  success?: boolean
  total_game?: number
}

export interface FranchisLoadMatch {
  id: string
}

export type FranchisListMatch = Partial<Franchis>

export interface Game {
  age_rating?: string
  cover_image?: string
  data?: Record<string, any>
  description?: string
  developer?: string
  franchise_id?: string
  genre?: any[]
  id?: string
  name?: string
  platform?: any[]
  publisher?: string
  release_date?: string
  screenshot?: any[]
  success?: boolean
  video?: any[]
}

export interface GameLoadMatch {
  platform_id: string
  id: string
}

export type GameListMatch = Partial<Game>

export interface Platform {
  data?: Record<string, any>
  success?: boolean
}

export type PlatformLoadMatch = Partial<Platform>

export interface Price {
  affiliate_link?: string
  currency?: string
  discount?: number
  in_stock?: boolean
  last_updated?: string
  original_price?: number
  price?: number
  region?: string
  retailer_id?: string
  retailer_name?: string
}

export interface PriceListMatch {
  game_id: string
  console_id: string
}

export interface Retailer {
  approved?: boolean
  currency?: any[]
  id?: string
  logo?: string
  name?: string
  region?: any[]
  website?: string
}

export type RetailerListMatch = Partial<Retailer>

export interface Search {
  data?: Record<string, any>
  success?: boolean
}

export type SearchLoadMatch = Partial<Search>

export interface Studio {
  data?: Record<string, any>
  description?: string
  founding_year?: number
  game?: any[]
  id?: string
  location?: Record<string, any>
  logo?: string
  name?: string
  success?: boolean
  type?: string
  website?: string
}

export interface StudioLoadMatch {
  id: string
}

export type StudioListMatch = Partial<Studio>

export interface User {
  age_rating?: string
  cover_image?: string
  data?: Record<string, any>
  description?: string
  developer?: string
  franchise_id?: string
  genre?: any[]
  id?: string
  name?: string
  platform?: any[]
  publisher?: string
  release_date?: string
  screenshot?: any[]
  success?: boolean
  video?: any[]
}

export interface UserLoadMatch {
  id: string
}

export interface UserListMatch {
  id: string
}

export interface Widget {
}

export type WidgetLoadMatch = Partial<Widget>

