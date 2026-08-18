<?php
declare(strict_types=1);

// Typed models for the Nexarda SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Console entity data model. */
class Console
{
    public ?string $description = null;
    public ?string $id = null;
    public ?array $images = null;
    public ?string $manufacturer = null;
    public ?string $name = null;
    public ?string $releaseDate = null;
    public ?array $specifications = null;
    public ?string $type = null;
}

/** Request payload for Console#load. */
class ConsoleLoadMatch
{
    public string $id;
}

/** Request payload for Console#list. */
class ConsoleListMatch
{
    public ?string $description = null;
    public ?string $id = null;
    public ?array $images = null;
    public ?string $manufacturer = null;
    public ?string $name = null;
    public ?string $releaseDate = null;
    public ?array $specifications = null;
    public ?string $type = null;
}

/** Franchis entity data model. */
class Franchis
{
    public ?string $description = null;
    public ?array $games = null;
    public ?string $id = null;
    public ?string $logo = null;
    public ?string $name = null;
    public ?int $totalGames = null;
}

/** Request payload for Franchis#load. */
class FranchisLoadMatch
{
    public string $id;
}

/** Request payload for Franchis#list. */
class FranchisListMatch
{
    public ?string $description = null;
    public ?array $games = null;
    public ?string $id = null;
    public ?string $logo = null;
    public ?string $name = null;
    public ?int $totalGames = null;
}

/** Game entity data model. */
class Game
{
    public ?string $ageRating = null;
    public ?string $coverImage = null;
    public ?string $description = null;
    public ?string $developer = null;
    public ?string $franchiseId = null;
    public ?array $genres = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $platforms = null;
    public ?string $publisher = null;
    public ?string $releaseDate = null;
    public ?array $screenshots = null;
    public ?array $videos = null;
}

/** Request payload for Game#load. */
class GameLoadMatch
{
    public string $id;
}

/** Request payload for Game#list. */
class GameListMatch
{
    public ?string $ageRating = null;
    public ?string $coverImage = null;
    public ?string $description = null;
    public ?string $developer = null;
    public ?string $franchiseId = null;
    public ?array $genres = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $platforms = null;
    public ?string $publisher = null;
    public ?string $releaseDate = null;
    public ?array $screenshots = null;
    public ?array $videos = null;
}

/** Platform entity data model. */
class Platform
{
    public ?array $api = null;
    public ?array $priceUpdates = null;
    public ?string $status = null;
    public ?string $timestamp = null;
    public ?array $website = null;
}

/** Request payload for Platform#load. */
class PlatformLoadMatch
{
    public ?array $api = null;
    public ?array $priceUpdates = null;
    public ?string $status = null;
    public ?string $timestamp = null;
    public ?array $website = null;
}

/** Price entity data model. */
class Price
{
    public ?string $affiliateLink = null;
    public ?string $currency = null;
    public ?float $discount = null;
    public ?bool $inStock = null;
    public ?string $lastUpdated = null;
    public ?float $originalPrice = null;
    public ?float $price = null;
    public ?string $region = null;
    public ?string $retailerId = null;
    public ?string $retailerName = null;
}

/** Request payload for Price#list. */
class PriceListMatch
{
    public string $game_id;
}

/** Retailer entity data model. */
class Retailer
{
    public ?bool $approved = null;
    public ?array $currencies = null;
    public ?string $id = null;
    public ?string $logo = null;
    public ?string $name = null;
    public ?array $regions = null;
    public ?string $website = null;
}

/** Request payload for Retailer#list. */
class RetailerListMatch
{
    public ?bool $approved = null;
    public ?array $currencies = null;
    public ?string $id = null;
    public ?string $logo = null;
    public ?string $name = null;
    public ?array $regions = null;
    public ?string $website = null;
}

/** Search entity data model. */
class Search
{
    public ?array $consoles = null;
    public ?array $games = null;
    public ?int $totalResults = null;
}

/** Request payload for Search#load. */
class SearchLoadMatch
{
    public ?array $consoles = null;
    public ?array $games = null;
    public ?int $totalResults = null;
}

/** Studio entity data model. */
class Studio
{
    public ?string $description = null;
    public ?int $foundingYear = null;
    public ?array $games = null;
    public ?string $id = null;
    public ?array $location = null;
    public ?string $logo = null;
    public ?string $name = null;
    public ?string $type = null;
    public ?string $website = null;
}

/** Request payload for Studio#load. */
class StudioLoadMatch
{
    public string $id;
}

/** Request payload for Studio#list. */
class StudioListMatch
{
    public ?string $description = null;
    public ?int $foundingYear = null;
    public ?array $games = null;
    public ?string $id = null;
    public ?array $location = null;
    public ?string $logo = null;
    public ?string $name = null;
    public ?string $type = null;
    public ?string $website = null;
}

/** User entity data model. */
class User
{
    public ?string $ageRating = null;
    public ?string $avatar = null;
    public ?string $coverImage = null;
    public ?string $description = null;
    public ?string $developer = null;
    public ?string $franchiseId = null;
    public ?array $genres = null;
    public ?string $id = null;
    public ?string $joinDate = null;
    public ?int $libraryCount = null;
    public ?string $name = null;
    public ?array $platforms = null;
    public ?string $publisher = null;
    public ?string $releaseDate = null;
    public ?array $screenshots = null;
    public ?string $username = null;
    public ?array $videos = null;
    public ?int $wishlistCount = null;
}

/** Request payload for User#load. */
class UserLoadMatch
{
    public string $id;
}

/** Request payload for User#list. */
class UserListMatch
{
    public string $id;
}

/** Widget entity data model. */
class Widget
{
}

/** Request payload for Widget#load. */
class WidgetLoadMatch
{
}

