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

/** Request payload for Console#list. */
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

/** Request payload for Franchis#list. */
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
    public ?string $platform_id = null;
    public ?string $id = null;
}

/** Request payload for Game#list. */
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

/** Request payload for Platform#load. */
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
    public ?string $game_id = null;
    public ?string $console_id = null;
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

/** Request payload for Retailer#list. */
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

/** Request payload for Search#load. */
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

/** Request payload for Studio#list. */
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

/** Request payload for Widget#load. */
class WidgetLoadMatch
{
}

