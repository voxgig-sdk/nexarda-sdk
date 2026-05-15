package = "voxgig-sdk-nexarda"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/nexarda-sdk.git"
}
description = {
  summary = "Nexarda SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["nexarda_sdk"] = "nexarda_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
