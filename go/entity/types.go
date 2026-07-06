// Typed models for the Nexarda SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Console is the typed data model for the console entity.
type Console struct {
	Data *map[string]any `json:"data,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *[]any `json:"image,omitempty"`
	Manufacturer *string `json:"manufacturer,omitempty"`
	Name *string `json:"name,omitempty"`
	ReleaseDate *string `json:"release_date,omitempty"`
	Specification *map[string]any `json:"specification,omitempty"`
	Success *bool `json:"success,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ConsoleLoadMatch is the typed request payload for Console.LoadTyped.
type ConsoleLoadMatch struct {
	Id string `json:"id"`
}

// ConsoleListMatch is the typed request payload for Console.ListTyped.
type ConsoleListMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *[]any `json:"image,omitempty"`
	Manufacturer *string `json:"manufacturer,omitempty"`
	Name *string `json:"name,omitempty"`
	ReleaseDate *string `json:"release_date,omitempty"`
	Specification *map[string]any `json:"specification,omitempty"`
	Success *bool `json:"success,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Franchis is the typed data model for the franchis entity.
type Franchis struct {
	Data *map[string]any `json:"data,omitempty"`
	Description *string `json:"description,omitempty"`
	Game *[]any `json:"game,omitempty"`
	Id *string `json:"id,omitempty"`
	Logo *string `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	Success *bool `json:"success,omitempty"`
	TotalGame *int `json:"total_game,omitempty"`
}

// FranchisLoadMatch is the typed request payload for Franchis.LoadTyped.
type FranchisLoadMatch struct {
	Id string `json:"id"`
}

// FranchisListMatch is the typed request payload for Franchis.ListTyped.
type FranchisListMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Description *string `json:"description,omitempty"`
	Game *[]any `json:"game,omitempty"`
	Id *string `json:"id,omitempty"`
	Logo *string `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	Success *bool `json:"success,omitempty"`
	TotalGame *int `json:"total_game,omitempty"`
}

// Game is the typed data model for the game entity.
type Game struct {
	AgeRating *string `json:"age_rating,omitempty"`
	CoverImage *string `json:"cover_image,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	Description *string `json:"description,omitempty"`
	Developer *string `json:"developer,omitempty"`
	FranchiseId *string `json:"franchise_id,omitempty"`
	Genre *[]any `json:"genre,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Platform *[]any `json:"platform,omitempty"`
	Publisher *string `json:"publisher,omitempty"`
	ReleaseDate *string `json:"release_date,omitempty"`
	Screenshot *[]any `json:"screenshot,omitempty"`
	Success *bool `json:"success,omitempty"`
	Video *[]any `json:"video,omitempty"`
}

// GameLoadMatch is the typed request payload for Game.LoadTyped.
type GameLoadMatch struct {
	PlatformId string `json:"platform_id"`
	Id string `json:"id"`
}

// GameListMatch is the typed request payload for Game.ListTyped.
type GameListMatch struct {
	AgeRating *string `json:"age_rating,omitempty"`
	CoverImage *string `json:"cover_image,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	Description *string `json:"description,omitempty"`
	Developer *string `json:"developer,omitempty"`
	FranchiseId *string `json:"franchise_id,omitempty"`
	Genre *[]any `json:"genre,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Platform *[]any `json:"platform,omitempty"`
	Publisher *string `json:"publisher,omitempty"`
	ReleaseDate *string `json:"release_date,omitempty"`
	Screenshot *[]any `json:"screenshot,omitempty"`
	Success *bool `json:"success,omitempty"`
	Video *[]any `json:"video,omitempty"`
}

// Platform is the typed data model for the platform entity.
type Platform struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// PlatformLoadMatch is the typed request payload for Platform.LoadTyped.
type PlatformLoadMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// Price is the typed data model for the price entity.
type Price struct {
	AffiliateLink *string `json:"affiliate_link,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Discount *float64 `json:"discount,omitempty"`
	InStock *bool `json:"in_stock,omitempty"`
	LastUpdated *string `json:"last_updated,omitempty"`
	OriginalPrice *float64 `json:"original_price,omitempty"`
	Price *float64 `json:"price,omitempty"`
	Region *string `json:"region,omitempty"`
	RetailerId *string `json:"retailer_id,omitempty"`
	RetailerName *string `json:"retailer_name,omitempty"`
}

// PriceListMatch is the typed request payload for Price.ListTyped.
type PriceListMatch struct {
	GameId string `json:"game_id"`
	ConsoleId string `json:"console_id"`
}

// Retailer is the typed data model for the retailer entity.
type Retailer struct {
	Approved *bool `json:"approved,omitempty"`
	Currency *[]any `json:"currency,omitempty"`
	Id *string `json:"id,omitempty"`
	Logo *string `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	Region *[]any `json:"region,omitempty"`
	Website *string `json:"website,omitempty"`
}

// RetailerListMatch is the typed request payload for Retailer.ListTyped.
type RetailerListMatch struct {
	Approved *bool `json:"approved,omitempty"`
	Currency *[]any `json:"currency,omitempty"`
	Id *string `json:"id,omitempty"`
	Logo *string `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	Region *[]any `json:"region,omitempty"`
	Website *string `json:"website,omitempty"`
}

// Search is the typed data model for the search entity.
type Search struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// SearchLoadMatch is the typed request payload for Search.LoadTyped.
type SearchLoadMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// Studio is the typed data model for the studio entity.
type Studio struct {
	Data *map[string]any `json:"data,omitempty"`
	Description *string `json:"description,omitempty"`
	FoundingYear *int `json:"founding_year,omitempty"`
	Game *[]any `json:"game,omitempty"`
	Id *string `json:"id,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Logo *string `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	Success *bool `json:"success,omitempty"`
	Type *string `json:"type,omitempty"`
	Website *string `json:"website,omitempty"`
}

// StudioLoadMatch is the typed request payload for Studio.LoadTyped.
type StudioLoadMatch struct {
	Id string `json:"id"`
}

// StudioListMatch is the typed request payload for Studio.ListTyped.
type StudioListMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Description *string `json:"description,omitempty"`
	FoundingYear *int `json:"founding_year,omitempty"`
	Game *[]any `json:"game,omitempty"`
	Id *string `json:"id,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Logo *string `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	Success *bool `json:"success,omitempty"`
	Type *string `json:"type,omitempty"`
	Website *string `json:"website,omitempty"`
}

// User is the typed data model for the user entity.
type User struct {
	AgeRating *string `json:"age_rating,omitempty"`
	CoverImage *string `json:"cover_image,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	Description *string `json:"description,omitempty"`
	Developer *string `json:"developer,omitempty"`
	FranchiseId *string `json:"franchise_id,omitempty"`
	Genre *[]any `json:"genre,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Platform *[]any `json:"platform,omitempty"`
	Publisher *string `json:"publisher,omitempty"`
	ReleaseDate *string `json:"release_date,omitempty"`
	Screenshot *[]any `json:"screenshot,omitempty"`
	Success *bool `json:"success,omitempty"`
	Video *[]any `json:"video,omitempty"`
}

// UserLoadMatch is the typed request payload for User.LoadTyped.
type UserLoadMatch struct {
	Id string `json:"id"`
}

// UserListMatch is the typed request payload for User.ListTyped.
type UserListMatch struct {
	Id string `json:"id"`
}

// Widget is the typed data model for the widget entity.
type Widget struct {
}

// WidgetLoadMatch is the typed request payload for Widget.LoadTyped.
type WidgetLoadMatch struct {
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
