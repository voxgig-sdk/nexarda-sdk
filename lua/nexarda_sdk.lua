-- Nexarda SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local NexardaSDK = {}
NexardaSDK.__index = NexardaSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

NexardaSDK._make_feature = _make_feature


function NexardaSDK.new(options)
  local self = setmetatable({}, NexardaSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function NexardaSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function NexardaSDK:get_utility()
  return Utility.copy(self._utility)
end


function NexardaSDK:get_root_ctx()
  return self._rootctx
end


function NexardaSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function NexardaSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:console():list() / client:console():load({ id = ... })
function NexardaSDK:console(data)
  local EntityMod = require("entity.console_entity")
  if data == nil then
    if self._console == nil then
      self._console = EntityMod.new(self, nil)
    end
    return self._console
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:console() instead.
function NexardaSDK:Console(data)
  local EntityMod = require("entity.console_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:franchis():list() / client:franchis():load({ id = ... })
function NexardaSDK:franchis(data)
  local EntityMod = require("entity.franchis_entity")
  if data == nil then
    if self._franchis == nil then
      self._franchis = EntityMod.new(self, nil)
    end
    return self._franchis
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:franchis() instead.
function NexardaSDK:Franchis(data)
  local EntityMod = require("entity.franchis_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:game():list() / client:game():load({ id = ... })
function NexardaSDK:game(data)
  local EntityMod = require("entity.game_entity")
  if data == nil then
    if self._game == nil then
      self._game = EntityMod.new(self, nil)
    end
    return self._game
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:game() instead.
function NexardaSDK:Game(data)
  local EntityMod = require("entity.game_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:platform():list() / client:platform():load({ id = ... })
function NexardaSDK:platform(data)
  local EntityMod = require("entity.platform_entity")
  if data == nil then
    if self._platform == nil then
      self._platform = EntityMod.new(self, nil)
    end
    return self._platform
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:platform() instead.
function NexardaSDK:Platform(data)
  local EntityMod = require("entity.platform_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:price():list() / client:price():load({ id = ... })
function NexardaSDK:price(data)
  local EntityMod = require("entity.price_entity")
  if data == nil then
    if self._price == nil then
      self._price = EntityMod.new(self, nil)
    end
    return self._price
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:price() instead.
function NexardaSDK:Price(data)
  local EntityMod = require("entity.price_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:retailer():list() / client:retailer():load({ id = ... })
function NexardaSDK:retailer(data)
  local EntityMod = require("entity.retailer_entity")
  if data == nil then
    if self._retailer == nil then
      self._retailer = EntityMod.new(self, nil)
    end
    return self._retailer
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:retailer() instead.
function NexardaSDK:Retailer(data)
  local EntityMod = require("entity.retailer_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:search():list() / client:search():load({ id = ... })
function NexardaSDK:search(data)
  local EntityMod = require("entity.search_entity")
  if data == nil then
    if self._search == nil then
      self._search = EntityMod.new(self, nil)
    end
    return self._search
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:search() instead.
function NexardaSDK:Search(data)
  local EntityMod = require("entity.search_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:studio():list() / client:studio():load({ id = ... })
function NexardaSDK:studio(data)
  local EntityMod = require("entity.studio_entity")
  if data == nil then
    if self._studio == nil then
      self._studio = EntityMod.new(self, nil)
    end
    return self._studio
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:studio() instead.
function NexardaSDK:Studio(data)
  local EntityMod = require("entity.studio_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:user():list() / client:user():load({ id = ... })
function NexardaSDK:user(data)
  local EntityMod = require("entity.user_entity")
  if data == nil then
    if self._user == nil then
      self._user = EntityMod.new(self, nil)
    end
    return self._user
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:user() instead.
function NexardaSDK:User(data)
  local EntityMod = require("entity.user_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:widget():list() / client:widget():load({ id = ... })
function NexardaSDK:widget(data)
  local EntityMod = require("entity.widget_entity")
  if data == nil then
    if self._widget == nil then
      self._widget = EntityMod.new(self, nil)
    end
    return self._widget
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:widget() instead.
function NexardaSDK:Widget(data)
  local EntityMod = require("entity.widget_entity")
  return EntityMod.new(self, data)
end




function NexardaSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = NexardaSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return NexardaSDK
