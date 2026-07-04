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
    data: dict
    description: str
    id: str
    image: list
    manufacturer: str
    name: str
    release_date: str
    specification: dict
    success: bool
    type: str


class ConsoleLoadMatch(TypedDict):
    id: str


class ConsoleListMatch(TypedDict, total=False):
    data: dict
    description: str
    id: str
    image: list
    manufacturer: str
    name: str
    release_date: str
    specification: dict
    success: bool
    type: str


class Franchis(TypedDict, total=False):
    data: dict
    description: str
    game: list
    id: str
    logo: str
    name: str
    success: bool
    total_game: int


class FranchisLoadMatch(TypedDict):
    id: str


class FranchisListMatch(TypedDict, total=False):
    data: dict
    description: str
    game: list
    id: str
    logo: str
    name: str
    success: bool
    total_game: int


class Game(TypedDict, total=False):
    age_rating: str
    cover_image: str
    data: dict
    description: str
    developer: str
    franchise_id: str
    genre: list
    id: str
    name: str
    platform: list
    publisher: str
    release_date: str
    screenshot: list
    success: bool
    video: list


class GameLoadMatch(TypedDict):
    platform_id: str
    id: str


class GameListMatch(TypedDict, total=False):
    age_rating: str
    cover_image: str
    data: dict
    description: str
    developer: str
    franchise_id: str
    genre: list
    id: str
    name: str
    platform: list
    publisher: str
    release_date: str
    screenshot: list
    success: bool
    video: list


class Platform(TypedDict, total=False):
    data: dict
    success: bool


class PlatformLoadMatch(TypedDict, total=False):
    data: dict
    success: bool


class Price(TypedDict, total=False):
    affiliate_link: str
    currency: str
    discount: float
    in_stock: bool
    last_updated: str
    original_price: float
    price: float
    region: str
    retailer_id: str
    retailer_name: str


class PriceListMatch(TypedDict):
    game_id: str
    console_id: str


class Retailer(TypedDict, total=False):
    approved: bool
    currency: list
    id: str
    logo: str
    name: str
    region: list
    website: str


class RetailerListMatch(TypedDict, total=False):
    approved: bool
    currency: list
    id: str
    logo: str
    name: str
    region: list
    website: str


class Search(TypedDict, total=False):
    data: dict
    success: bool


class SearchLoadMatch(TypedDict, total=False):
    data: dict
    success: bool


class Studio(TypedDict, total=False):
    data: dict
    description: str
    founding_year: int
    game: list
    id: str
    location: dict
    logo: str
    name: str
    success: bool
    type: str
    website: str


class StudioLoadMatch(TypedDict):
    id: str


class StudioListMatch(TypedDict, total=False):
    data: dict
    description: str
    founding_year: int
    game: list
    id: str
    location: dict
    logo: str
    name: str
    success: bool
    type: str
    website: str


class User(TypedDict, total=False):
    age_rating: str
    cover_image: str
    data: dict
    description: str
    developer: str
    franchise_id: str
    genre: list
    id: str
    name: str
    platform: list
    publisher: str
    release_date: str
    screenshot: list
    success: bool
    video: list


class UserLoadMatch(TypedDict):
    id: str


class UserListMatch(TypedDict):
    id: str


class Widget(TypedDict):
    pass


class WidgetLoadMatch(TypedDict):
    pass
