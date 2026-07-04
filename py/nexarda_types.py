# Typed models for the Nexarda SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Console:
    data: Optional[dict] = None
    description: Optional[str] = None
    id: Optional[str] = None
    image: Optional[list] = None
    manufacturer: Optional[str] = None
    name: Optional[str] = None
    release_date: Optional[str] = None
    specification: Optional[dict] = None
    success: Optional[bool] = None
    type: Optional[str] = None


@dataclass
class ConsoleLoadMatch:
    id: str


@dataclass
class ConsoleListMatch:
    data: Optional[dict] = None
    description: Optional[str] = None
    id: Optional[str] = None
    image: Optional[list] = None
    manufacturer: Optional[str] = None
    name: Optional[str] = None
    release_date: Optional[str] = None
    specification: Optional[dict] = None
    success: Optional[bool] = None
    type: Optional[str] = None


@dataclass
class Franchis:
    data: Optional[dict] = None
    description: Optional[str] = None
    game: Optional[list] = None
    id: Optional[str] = None
    logo: Optional[str] = None
    name: Optional[str] = None
    success: Optional[bool] = None
    total_game: Optional[int] = None


@dataclass
class FranchisLoadMatch:
    id: str


@dataclass
class FranchisListMatch:
    data: Optional[dict] = None
    description: Optional[str] = None
    game: Optional[list] = None
    id: Optional[str] = None
    logo: Optional[str] = None
    name: Optional[str] = None
    success: Optional[bool] = None
    total_game: Optional[int] = None


@dataclass
class Game:
    age_rating: Optional[str] = None
    cover_image: Optional[str] = None
    data: Optional[dict] = None
    description: Optional[str] = None
    developer: Optional[str] = None
    franchise_id: Optional[str] = None
    genre: Optional[list] = None
    id: Optional[str] = None
    name: Optional[str] = None
    platform: Optional[list] = None
    publisher: Optional[str] = None
    release_date: Optional[str] = None
    screenshot: Optional[list] = None
    success: Optional[bool] = None
    video: Optional[list] = None


@dataclass
class GameLoadMatch:
    platform_id: str
    id: str


@dataclass
class GameListMatch:
    age_rating: Optional[str] = None
    cover_image: Optional[str] = None
    data: Optional[dict] = None
    description: Optional[str] = None
    developer: Optional[str] = None
    franchise_id: Optional[str] = None
    genre: Optional[list] = None
    id: Optional[str] = None
    name: Optional[str] = None
    platform: Optional[list] = None
    publisher: Optional[str] = None
    release_date: Optional[str] = None
    screenshot: Optional[list] = None
    success: Optional[bool] = None
    video: Optional[list] = None


@dataclass
class Platform:
    data: Optional[dict] = None
    success: Optional[bool] = None


@dataclass
class PlatformLoadMatch:
    data: Optional[dict] = None
    success: Optional[bool] = None


@dataclass
class Price:
    affiliate_link: Optional[str] = None
    currency: Optional[str] = None
    discount: Optional[float] = None
    in_stock: Optional[bool] = None
    last_updated: Optional[str] = None
    original_price: Optional[float] = None
    price: Optional[float] = None
    region: Optional[str] = None
    retailer_id: Optional[str] = None
    retailer_name: Optional[str] = None


@dataclass
class PriceListMatch:
    game_id: str
    console_id: str


@dataclass
class Retailer:
    approved: Optional[bool] = None
    currency: Optional[list] = None
    id: Optional[str] = None
    logo: Optional[str] = None
    name: Optional[str] = None
    region: Optional[list] = None
    website: Optional[str] = None


@dataclass
class RetailerListMatch:
    approved: Optional[bool] = None
    currency: Optional[list] = None
    id: Optional[str] = None
    logo: Optional[str] = None
    name: Optional[str] = None
    region: Optional[list] = None
    website: Optional[str] = None


@dataclass
class Search:
    data: Optional[dict] = None
    success: Optional[bool] = None


@dataclass
class SearchLoadMatch:
    data: Optional[dict] = None
    success: Optional[bool] = None


@dataclass
class Studio:
    data: Optional[dict] = None
    description: Optional[str] = None
    founding_year: Optional[int] = None
    game: Optional[list] = None
    id: Optional[str] = None
    location: Optional[dict] = None
    logo: Optional[str] = None
    name: Optional[str] = None
    success: Optional[bool] = None
    type: Optional[str] = None
    website: Optional[str] = None


@dataclass
class StudioLoadMatch:
    id: str


@dataclass
class StudioListMatch:
    data: Optional[dict] = None
    description: Optional[str] = None
    founding_year: Optional[int] = None
    game: Optional[list] = None
    id: Optional[str] = None
    location: Optional[dict] = None
    logo: Optional[str] = None
    name: Optional[str] = None
    success: Optional[bool] = None
    type: Optional[str] = None
    website: Optional[str] = None


@dataclass
class User:
    age_rating: Optional[str] = None
    cover_image: Optional[str] = None
    data: Optional[dict] = None
    description: Optional[str] = None
    developer: Optional[str] = None
    franchise_id: Optional[str] = None
    genre: Optional[list] = None
    id: Optional[str] = None
    name: Optional[str] = None
    platform: Optional[list] = None
    publisher: Optional[str] = None
    release_date: Optional[str] = None
    screenshot: Optional[list] = None
    success: Optional[bool] = None
    video: Optional[list] = None


@dataclass
class UserLoadMatch:
    id: str


@dataclass
class UserListMatch:
    id: str


@dataclass
class Widget:
    pass


@dataclass
class WidgetLoadMatch:
    pass

