package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewConsoleEntityFunc func(client *NexardaSDK, entopts map[string]any) NexardaEntity

var NewFranchisEntityFunc func(client *NexardaSDK, entopts map[string]any) NexardaEntity

var NewGameEntityFunc func(client *NexardaSDK, entopts map[string]any) NexardaEntity

var NewPlatformEntityFunc func(client *NexardaSDK, entopts map[string]any) NexardaEntity

var NewPriceEntityFunc func(client *NexardaSDK, entopts map[string]any) NexardaEntity

var NewRetailerEntityFunc func(client *NexardaSDK, entopts map[string]any) NexardaEntity

var NewSearchEntityFunc func(client *NexardaSDK, entopts map[string]any) NexardaEntity

var NewStudioEntityFunc func(client *NexardaSDK, entopts map[string]any) NexardaEntity

var NewUserEntityFunc func(client *NexardaSDK, entopts map[string]any) NexardaEntity

var NewWidgetEntityFunc func(client *NexardaSDK, entopts map[string]any) NexardaEntity

