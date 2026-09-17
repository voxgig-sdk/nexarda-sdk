export interface Console {
    description?: string;
    id?: string;
    images?: any[];
    manufacturer?: string;
    name?: string;
    releaseDate?: string;
    specifications?: Record<string, any>;
    type?: string;
}
export interface ConsoleLoadMatch {
    id: string;
}
export interface ConsoleListMatch {
    limit?: number;
}
export interface Franchis {
    description?: string;
    games?: any[];
    id?: string;
    logo?: string;
    name?: string;
    totalGames?: number;
}
export interface FranchisLoadMatch {
    id: string;
}
export interface FranchisListMatch {
    limit?: number;
}
export interface Game {
    ageRating?: string;
    coverImage?: string;
    description?: string;
    developer?: string;
    franchiseId?: string;
    genres?: any[];
    id?: string;
    name?: string;
    platforms?: any[];
    publisher?: string;
    releaseDate?: string;
    screenshots?: any[];
    videos?: any[];
}
export interface GameLoadMatch {
    id: string;
}
export interface GameListMatch {
    limit?: number;
    offset?: number;
}
export interface Platform {
    api?: Record<string, any>;
    priceUpdates?: Record<string, any>;
    status?: string;
    timestamp?: string;
    website?: Record<string, any>;
}
export interface PlatformLoadMatch {
    api?: Record<string, any>;
    priceUpdates?: Record<string, any>;
    status?: string;
    timestamp?: string;
    website?: Record<string, any>;
}
export interface Price {
    affiliateLink?: string;
    currency?: string;
    discount?: number;
    inStock?: boolean;
    lastUpdated?: string;
    originalPrice?: number;
    price?: number;
    region?: string;
    retailerId?: string;
    retailerName?: string;
}
export interface PriceListMatch {
    game_id: string;
    currency?: string;
    region?: string;
}
export interface Retailer {
    approved?: boolean;
    currencies?: any[];
    id?: string;
    logo?: string;
    name?: string;
    regions?: any[];
    website?: string;
}
export interface RetailerListMatch {
    approved?: boolean;
    currencies?: any[];
    id?: string;
    logo?: string;
    name?: string;
    regions?: any[];
    website?: string;
}
export interface Search {
    consoles?: any[];
    games?: any[];
    totalResults?: number;
}
export interface SearchLoadMatch {
    limit?: number;
    q: string;
    type?: string;
}
export interface Studio {
    description?: string;
    foundingYear?: number;
    games?: any[];
    id?: string;
    location?: Record<string, any>;
    logo?: string;
    name?: string;
    type?: string;
    website?: string;
}
export interface StudioLoadMatch {
    id: string;
}
export interface StudioListMatch {
    limit?: number;
    type?: string;
}
export interface User {
    avatar?: string;
    id?: string;
    joinDate?: string;
    libraryCount?: number;
    username?: string;
    wishlistCount?: number;
}
export interface UserLoadMatch {
    id: string;
}
export interface UserListMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface Widget {
}
export interface WidgetLoadMatch {
    product_id: string;
    text?: string;
    theme?: string;
    $action?: string;
    [action: string]: any;
}
