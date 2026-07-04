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
    public ?array $data = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?array $image = null;
    public ?string $manufacturer = null;
    public ?string $name = null;
    public ?string $release_date = null;
    public ?array $specification = null;
    public ?bool $success = null;
    public ?string $type = null;
}

/** Request payload for Console#load. */
class ConsoleLoadMatch
{
    public string $id;
}

/** Match filter for Console#list (any subset of Console fields). */
class ConsoleListMatch
{
    public ?array $data = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?array $image = null;
    public ?string $manufacturer = null;
    public ?string $name = null;
    public ?string $release_date = null;
    public ?array $specification = null;
    public ?bool $success = null;
    public ?string $type = null;
}

/** Franchis entity data model. */
class Franchis
{
    public ?array $data = null;
    public ?string $description = null;
    public ?array $game = null;
    public ?string $id = null;
    public ?string $logo = null;
    public ?string $name = null;
    public ?bool $success = null;
    public ?int $total_game = null;
}

/** Request payload for Franchis#load. */
class FranchisLoadMatch
{
    public string $id;
}

/** Match filter for Franchis#list (any subset of Franchis fields). */
class FranchisListMatch
{
    public ?array $data = null;
    public ?string $description = null;
    public ?array $game = null;
    public ?string $id = null;
    public ?string $logo = null;
    public ?string $name = null;
    public ?bool $success = null;
    public ?int $total_game = null;
}

/** Game entity data model. */
class Game
{
    public ?string $age_rating = null;
    public ?string $cover_image = null;
    public ?array $data = null;
    public ?string $description = null;
    public ?string $developer = null;
    public ?string $franchise_id = null;
    public ?array $genre = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $platform = null;
    public ?string $publisher = null;
    public ?string $release_date = null;
    public ?array $screenshot = null;
    public ?bool $success = null;
    public ?array $video = null;
}

/** Request payload for Game#load. */
class GameLoadMatch
{
    public string $platform_id;
    public string $id;
}

/** Match filter for Game#list (any subset of Game fields). */
class GameListMatch
{
    public ?string $age_rating = null;
    public ?string $cover_image = null;
    public ?array $data = null;
    public ?string $description = null;
    public ?string $developer = null;
    public ?string $franchise_id = null;
    public ?array $genre = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $platform = null;
    public ?string $publisher = null;
    public ?string $release_date = null;
    public ?array $screenshot = null;
    public ?bool $success = null;
    public ?array $video = null;
}

/** Platform entity data model. */
class Platform
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Match filter for Platform#load (any subset of Platform fields). */
class PlatformLoadMatch
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Price entity data model. */
class Price
{
    public ?string $affiliate_link = null;
    public ?string $currency = null;
    public ?float $discount = null;
    public ?bool $in_stock = null;
    public ?string $last_updated = null;
    public ?float $original_price = null;
    public ?float $price = null;
    public ?string $region = null;
    public ?string $retailer_id = null;
    public ?string $retailer_name = null;
}

/** Request payload for Price#list. */
class PriceListMatch
{
    public string $game_id;
    public string $console_id;
}

/** Retailer entity data model. */
class Retailer
{
    public ?bool $approved = null;
    public ?array $currency = null;
    public ?string $id = null;
    public ?string $logo = null;
    public ?string $name = null;
    public ?array $region = null;
    public ?string $website = null;
}

/** Match filter for Retailer#list (any subset of Retailer fields). */
class RetailerListMatch
{
    public ?bool $approved = null;
    public ?array $currency = null;
    public ?string $id = null;
    public ?string $logo = null;
    public ?string $name = null;
    public ?array $region = null;
    public ?string $website = null;
}

/** Search entity data model. */
class Search
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Match filter for Search#load (any subset of Search fields). */
class SearchLoadMatch
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Studio entity data model. */
class Studio
{
    public ?array $data = null;
    public ?string $description = null;
    public ?int $founding_year = null;
    public ?array $game = null;
    public ?string $id = null;
    public ?array $location = null;
    public ?string $logo = null;
    public ?string $name = null;
    public ?bool $success = null;
    public ?string $type = null;
    public ?string $website = null;
}

/** Request payload for Studio#load. */
class StudioLoadMatch
{
    public string $id;
}

/** Match filter for Studio#list (any subset of Studio fields). */
class StudioListMatch
{
    public ?array $data = null;
    public ?string $description = null;
    public ?int $founding_year = null;
    public ?array $game = null;
    public ?string $id = null;
    public ?array $location = null;
    public ?string $logo = null;
    public ?string $name = null;
    public ?bool $success = null;
    public ?string $type = null;
    public ?string $website = null;
}

/** User entity data model. */
class User
{
    public ?string $age_rating = null;
    public ?string $cover_image = null;
    public ?array $data = null;
    public ?string $description = null;
    public ?string $developer = null;
    public ?string $franchise_id = null;
    public ?array $genre = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $platform = null;
    public ?string $publisher = null;
    public ?string $release_date = null;
    public ?array $screenshot = null;
    public ?bool $success = null;
    public ?array $video = null;
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

/** Match filter for Widget#load (any subset of Widget fields). */
class WidgetLoadMatch
{
}

