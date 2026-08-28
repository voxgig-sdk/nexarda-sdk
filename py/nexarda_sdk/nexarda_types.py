# Typed models for the Nexarda SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Console(TypedDict, total=False):
    description: str
    id: str
    images: list
    manufacturer: str
    name: str
    releaseDate: str
    specifications: dict
    type: str


class ConsoleLoadMatch(TypedDict):
    id: str


class ConsoleListMatch(TypedDict, total=False):
    limit: int


class Franchis(TypedDict, total=False):
    description: str
    games: list
    id: str
    logo: str
    name: str
    totalGames: int


class FranchisLoadMatch(TypedDict):
    id: str


class FranchisListMatch(TypedDict, total=False):
    limit: int


class Game(TypedDict, total=False):
    ageRating: str
    coverImage: str
    description: str
    developer: str
    franchiseId: str
    genres: list
    id: str
    name: str
    platforms: list
    publisher: str
    releaseDate: str
    screenshots: list
    videos: list


class GameLoadMatch(TypedDict):
    id: str


class GameListMatch(TypedDict, total=False):
    limit: int
    offset: int


class Platform(TypedDict, total=False):
    api: dict
    priceUpdates: dict
    status: str
    timestamp: str
    website: dict


class PlatformLoadMatch(TypedDict, total=False):
    api: dict
    priceUpdates: dict
    status: str
    timestamp: str
    website: dict


class Price(TypedDict, total=False):
    affiliateLink: str
    currency: str
    discount: float
    inStock: bool
    lastUpdated: str
    originalPrice: float
    price: float
    region: str
    retailerId: str
    retailerName: str


class PriceListMatchRequired(TypedDict):
    game_id: str


class PriceListMatch(PriceListMatchRequired, total=False):
    currency: str
    region: str


class Retailer(TypedDict, total=False):
    approved: bool
    currencies: list
    id: str
    logo: str
    name: str
    regions: list
    website: str


class RetailerListMatch(TypedDict, total=False):
    approved: bool
    currencies: list
    id: str
    logo: str
    name: str
    regions: list
    website: str


class Search(TypedDict, total=False):
    consoles: list
    games: list
    totalResults: int


class SearchLoadMatchRequired(TypedDict):
    q: str


class SearchLoadMatch(SearchLoadMatchRequired, total=False):
    limit: int
    type: str


class Studio(TypedDict, total=False):
    description: str
    foundingYear: int
    games: list
    id: str
    location: dict
    logo: str
    name: str
    type: str
    website: str


class StudioLoadMatch(TypedDict):
    id: str


class StudioListMatch(TypedDict, total=False):
    limit: int
    type: str


class User(TypedDict, total=False):
    ageRating: str
    avatar: str
    coverImage: str
    description: str
    developer: str
    franchiseId: str
    genres: list
    id: str
    joinDate: str
    libraryCount: int
    name: str
    platforms: list
    publisher: str
    releaseDate: str
    screenshots: list
    username: str
    videos: list
    wishlistCount: int


class UserLoadMatch(TypedDict):
    id: str


class UserListMatch(TypedDict):
    id: str


class Widget(TypedDict):
    pass


class WidgetLoadMatchRequired(TypedDict):
    product_id: str


class WidgetLoadMatch(WidgetLoadMatchRequired, total=False):
    text: str
    theme: str
