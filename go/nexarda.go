package voxgignexardasdk

import (
	"github.com/voxgig-sdk/nexarda-sdk/go/core"
	"github.com/voxgig-sdk/nexarda-sdk/go/entity"
	"github.com/voxgig-sdk/nexarda-sdk/go/feature"
	_ "github.com/voxgig-sdk/nexarda-sdk/go/utility"
)

// Type aliases preserve external API.
type NexardaSDK = core.NexardaSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type NexardaEntity = core.NexardaEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type NexardaError = core.NexardaError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewConsoleEntityFunc = func(client *core.NexardaSDK, entopts map[string]any) core.NexardaEntity {
		return entity.NewConsoleEntity(client, entopts)
	}
	core.NewFranchisEntityFunc = func(client *core.NexardaSDK, entopts map[string]any) core.NexardaEntity {
		return entity.NewFranchisEntity(client, entopts)
	}
	core.NewGameEntityFunc = func(client *core.NexardaSDK, entopts map[string]any) core.NexardaEntity {
		return entity.NewGameEntity(client, entopts)
	}
	core.NewPlatformEntityFunc = func(client *core.NexardaSDK, entopts map[string]any) core.NexardaEntity {
		return entity.NewPlatformEntity(client, entopts)
	}
	core.NewPriceEntityFunc = func(client *core.NexardaSDK, entopts map[string]any) core.NexardaEntity {
		return entity.NewPriceEntity(client, entopts)
	}
	core.NewRetailerEntityFunc = func(client *core.NexardaSDK, entopts map[string]any) core.NexardaEntity {
		return entity.NewRetailerEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.NexardaSDK, entopts map[string]any) core.NexardaEntity {
		return entity.NewSearchEntity(client, entopts)
	}
	core.NewStudioEntityFunc = func(client *core.NexardaSDK, entopts map[string]any) core.NexardaEntity {
		return entity.NewStudioEntity(client, entopts)
	}
	core.NewUserEntityFunc = func(client *core.NexardaSDK, entopts map[string]any) core.NexardaEntity {
		return entity.NewUserEntity(client, entopts)
	}
	core.NewWidgetEntityFunc = func(client *core.NexardaSDK, entopts map[string]any) core.NexardaEntity {
		return entity.NewWidgetEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewNexardaSDK = core.NewNexardaSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewNexardaSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *NexardaSDK  { return NewNexardaSDK(nil) }
func Test() *NexardaSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
