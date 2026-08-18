// Typed models for the Nexarda SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/nexarda-sdk/go/core"
)

// Console is the typed data model for the console entity.
type Console struct {
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Images *[]any `json:"images,omitempty"`
	Manufacturer *string `json:"manufacturer,omitempty"`
	Name *string `json:"name,omitempty"`
	ReleaseDate *string `json:"releaseDate,omitempty"`
	Specifications *map[string]any `json:"specifications,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ConsoleLoadMatch is the typed request payload for Console.LoadTyped.
type ConsoleLoadMatch struct {
	Id string `json:"id"`
}

// ConsoleListMatch is the typed request payload for Console.ListTyped.
type ConsoleListMatch struct {
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Images *[]any `json:"images,omitempty"`
	Manufacturer *string `json:"manufacturer,omitempty"`
	Name *string `json:"name,omitempty"`
	ReleaseDate *string `json:"releaseDate,omitempty"`
	Specifications *map[string]any `json:"specifications,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Franchis is the typed data model for the franchis entity.
type Franchis struct {
	Description *string `json:"description,omitempty"`
	Games *[]any `json:"games,omitempty"`
	Id *string `json:"id,omitempty"`
	Logo *string `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	TotalGames *int `json:"totalGames,omitempty"`
}

// FranchisLoadMatch is the typed request payload for Franchis.LoadTyped.
type FranchisLoadMatch struct {
	Id string `json:"id"`
}

// FranchisListMatch is the typed request payload for Franchis.ListTyped.
type FranchisListMatch struct {
	Description *string `json:"description,omitempty"`
	Games *[]any `json:"games,omitempty"`
	Id *string `json:"id,omitempty"`
	Logo *string `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	TotalGames *int `json:"totalGames,omitempty"`
}

// Game is the typed data model for the game entity.
type Game struct {
	AgeRating *string `json:"ageRating,omitempty"`
	CoverImage *string `json:"coverImage,omitempty"`
	Description *string `json:"description,omitempty"`
	Developer *string `json:"developer,omitempty"`
	FranchiseId *string `json:"franchiseId,omitempty"`
	Genres *[]any `json:"genres,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Platforms *[]any `json:"platforms,omitempty"`
	Publisher *string `json:"publisher,omitempty"`
	ReleaseDate *string `json:"releaseDate,omitempty"`
	Screenshots *[]any `json:"screenshots,omitempty"`
	Videos *[]any `json:"videos,omitempty"`
}

// GameLoadMatch is the typed request payload for Game.LoadTyped.
type GameLoadMatch struct {
	Id string `json:"id"`
}

// GameListMatch is the typed request payload for Game.ListTyped.
type GameListMatch struct {
	AgeRating *string `json:"ageRating,omitempty"`
	CoverImage *string `json:"coverImage,omitempty"`
	Description *string `json:"description,omitempty"`
	Developer *string `json:"developer,omitempty"`
	FranchiseId *string `json:"franchiseId,omitempty"`
	Genres *[]any `json:"genres,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Platforms *[]any `json:"platforms,omitempty"`
	Publisher *string `json:"publisher,omitempty"`
	ReleaseDate *string `json:"releaseDate,omitempty"`
	Screenshots *[]any `json:"screenshots,omitempty"`
	Videos *[]any `json:"videos,omitempty"`
}

// Platform is the typed data model for the platform entity.
type Platform struct {
	Api *map[string]any `json:"api,omitempty"`
	PriceUpdates *map[string]any `json:"priceUpdates,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Website *map[string]any `json:"website,omitempty"`
}

// PlatformLoadMatch is the typed request payload for Platform.LoadTyped.
type PlatformLoadMatch struct {
	Api *map[string]any `json:"api,omitempty"`
	PriceUpdates *map[string]any `json:"priceUpdates,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Website *map[string]any `json:"website,omitempty"`
}

// Price is the typed data model for the price entity.
type Price struct {
	AffiliateLink *string `json:"affiliateLink,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Discount *float64 `json:"discount,omitempty"`
	InStock *bool `json:"inStock,omitempty"`
	LastUpdated *string `json:"lastUpdated,omitempty"`
	OriginalPrice *float64 `json:"originalPrice,omitempty"`
	Price *float64 `json:"price,omitempty"`
	Region *string `json:"region,omitempty"`
	RetailerId *string `json:"retailerId,omitempty"`
	RetailerName *string `json:"retailerName,omitempty"`
}

// PriceListMatch is the typed request payload for Price.ListTyped.
type PriceListMatch struct {
	GameId string `json:"game_id"`
}

// Retailer is the typed data model for the retailer entity.
type Retailer struct {
	Approved *bool `json:"approved,omitempty"`
	Currencies *[]any `json:"currencies,omitempty"`
	Id *string `json:"id,omitempty"`
	Logo *string `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	Regions *[]any `json:"regions,omitempty"`
	Website *string `json:"website,omitempty"`
}

// RetailerListMatch is the typed request payload for Retailer.ListTyped.
type RetailerListMatch struct {
	Approved *bool `json:"approved,omitempty"`
	Currencies *[]any `json:"currencies,omitempty"`
	Id *string `json:"id,omitempty"`
	Logo *string `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	Regions *[]any `json:"regions,omitempty"`
	Website *string `json:"website,omitempty"`
}

// Search is the typed data model for the search entity.
type Search struct {
	Consoles *[]any `json:"consoles,omitempty"`
	Games *[]any `json:"games,omitempty"`
	TotalResults *int `json:"totalResults,omitempty"`
}

// SearchLoadMatch is the typed request payload for Search.LoadTyped.
type SearchLoadMatch struct {
	Consoles *[]any `json:"consoles,omitempty"`
	Games *[]any `json:"games,omitempty"`
	TotalResults *int `json:"totalResults,omitempty"`
}

// Studio is the typed data model for the studio entity.
type Studio struct {
	Description *string `json:"description,omitempty"`
	FoundingYear *int `json:"foundingYear,omitempty"`
	Games *[]any `json:"games,omitempty"`
	Id *string `json:"id,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Logo *string `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
	Website *string `json:"website,omitempty"`
}

// StudioLoadMatch is the typed request payload for Studio.LoadTyped.
type StudioLoadMatch struct {
	Id string `json:"id"`
}

// StudioListMatch is the typed request payload for Studio.ListTyped.
type StudioListMatch struct {
	Description *string `json:"description,omitempty"`
	FoundingYear *int `json:"foundingYear,omitempty"`
	Games *[]any `json:"games,omitempty"`
	Id *string `json:"id,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Logo *string `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
	Website *string `json:"website,omitempty"`
}

// User is the typed data model for the user entity.
type User struct {
	AgeRating *string `json:"ageRating,omitempty"`
	Avatar *string `json:"avatar,omitempty"`
	CoverImage *string `json:"coverImage,omitempty"`
	Description *string `json:"description,omitempty"`
	Developer *string `json:"developer,omitempty"`
	FranchiseId *string `json:"franchiseId,omitempty"`
	Genres *[]any `json:"genres,omitempty"`
	Id *string `json:"id,omitempty"`
	JoinDate *string `json:"joinDate,omitempty"`
	LibraryCount *int `json:"libraryCount,omitempty"`
	Name *string `json:"name,omitempty"`
	Platforms *[]any `json:"platforms,omitempty"`
	Publisher *string `json:"publisher,omitempty"`
	ReleaseDate *string `json:"releaseDate,omitempty"`
	Screenshots *[]any `json:"screenshots,omitempty"`
	Username *string `json:"username,omitempty"`
	Videos *[]any `json:"videos,omitempty"`
	WishlistCount *int `json:"wishlistCount,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
