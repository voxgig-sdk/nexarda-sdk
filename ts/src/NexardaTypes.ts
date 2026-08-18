// Typed models for the Nexarda SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Console {
  description?: string
  id?: string
  images?: any[]
  manufacturer?: string
  name?: string
  releaseDate?: string
  specifications?: Record<string, any>
  type?: string
}

export interface ConsoleLoadMatch {
  id: string
}

export interface ConsoleListMatch {
  description?: string
  id?: string
  images?: any[]
  manufacturer?: string
  name?: string
  releaseDate?: string
  specifications?: Record<string, any>
  type?: string
}

export interface Franchis {
  description?: string
  games?: any[]
  id?: string
  logo?: string
  name?: string
  totalGames?: number
}

export interface FranchisLoadMatch {
  id: string
}

export interface FranchisListMatch {
  description?: string
  games?: any[]
  id?: string
  logo?: string
  name?: string
  totalGames?: number
}

export interface Game {
  ageRating?: string
  coverImage?: string
  description?: string
  developer?: string
  franchiseId?: string
  genres?: any[]
  id?: string
  name?: string
  platforms?: any[]
  publisher?: string
  releaseDate?: string
  screenshots?: any[]
  videos?: any[]
}

export interface GameLoadMatch {
  id: string
}

export interface GameListMatch {
  ageRating?: string
  coverImage?: string
  description?: string
  developer?: string
  franchiseId?: string
  genres?: any[]
  id?: string
  name?: string
  platforms?: any[]
  publisher?: string
  releaseDate?: string
  screenshots?: any[]
  videos?: any[]
}

export interface Platform {
  api?: Record<string, any>
  priceUpdates?: Record<string, any>
  status?: string
  timestamp?: string
  website?: Record<string, any>
}

export interface PlatformLoadMatch {
  api?: Record<string, any>
  priceUpdates?: Record<string, any>
  status?: string
  timestamp?: string
  website?: Record<string, any>
}

export interface Price {
  affiliateLink?: string
  currency?: string
  discount?: number
  inStock?: boolean
  lastUpdated?: string
  originalPrice?: number
  price?: number
  region?: string
  retailerId?: string
  retailerName?: string
}

export interface PriceListMatch {
  game_id: string
}

export interface Retailer {
  approved?: boolean
  currencies?: any[]
  id?: string
  logo?: string
  name?: string
  regions?: any[]
  website?: string
}

export interface RetailerListMatch {
  approved?: boolean
  currencies?: any[]
  id?: string
  logo?: string
  name?: string
  regions?: any[]
  website?: string
}

export interface Search {
  consoles?: any[]
  games?: any[]
  totalResults?: number
}

export interface SearchLoadMatch {
  consoles?: any[]
  games?: any[]
  totalResults?: number
}

export interface Studio {
  description?: string
  foundingYear?: number
  games?: any[]
  id?: string
  location?: Record<string, any>
  logo?: string
  name?: string
  type?: string
  website?: string
}

export interface StudioLoadMatch {
  id: string
}

export interface StudioListMatch {
  description?: string
  foundingYear?: number
  games?: any[]
  id?: string
  location?: Record<string, any>
  logo?: string
  name?: string
  type?: string
  website?: string
}

export interface User {
  ageRating?: string
  avatar?: string
  coverImage?: string
  description?: string
  developer?: string
  franchiseId?: string
  genres?: any[]
  id?: string
  joinDate?: string
  libraryCount?: number
  name?: string
  platforms?: any[]
  publisher?: string
  releaseDate?: string
  screenshots?: any[]
  username?: string
  videos?: any[]
  wishlistCount?: number
}

export interface UserLoadMatch {
  id: string
}

export interface UserListMatch {
  id: string

  // Selects a custom action instead of the plain list:
  //   'library' | 'wishlist'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Widget {
}

export interface WidgetLoadMatch {

  // Selects a custom action instead of the plain load:
  //   'button' | 'product_card'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

