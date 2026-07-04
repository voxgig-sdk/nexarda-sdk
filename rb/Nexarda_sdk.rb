# Nexarda SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'Nexarda_types'


class NexardaSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = NexardaUtility.new
    @_utility = utility

    config = NexardaConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = NexardaHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = NexardaHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, NexardaFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    NexardaUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = NexardaHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = NexardaHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = NexardaHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = NexardaSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue NexardaError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = NexardaHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = NexardaHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.console.list / client.console.load({ "id" => ... })
  def console
    require_relative 'entity/console_entity'
    @console ||= ConsoleEntity.new(self, nil)
  end

  # Deprecated: use client.console instead.
  def Console(data = nil)
    require_relative 'entity/console_entity'
    ConsoleEntity.new(self, data)
  end


  # Idiomatic facade: client.franchis.list / client.franchis.load({ "id" => ... })
  def franchis
    require_relative 'entity/franchis_entity'
    @franchis ||= FranchisEntity.new(self, nil)
  end

  # Deprecated: use client.franchis instead.
  def Franchis(data = nil)
    require_relative 'entity/franchis_entity'
    FranchisEntity.new(self, data)
  end


  # Idiomatic facade: client.game.list / client.game.load({ "id" => ... })
  def game
    require_relative 'entity/game_entity'
    @game ||= GameEntity.new(self, nil)
  end

  # Deprecated: use client.game instead.
  def Game(data = nil)
    require_relative 'entity/game_entity'
    GameEntity.new(self, data)
  end


  # Idiomatic facade: client.platform.list / client.platform.load({ "id" => ... })
  def platform
    require_relative 'entity/platform_entity'
    @platform ||= PlatformEntity.new(self, nil)
  end

  # Deprecated: use client.platform instead.
  def Platform(data = nil)
    require_relative 'entity/platform_entity'
    PlatformEntity.new(self, data)
  end


  # Idiomatic facade: client.price.list / client.price.load({ "id" => ... })
  def price
    require_relative 'entity/price_entity'
    @price ||= PriceEntity.new(self, nil)
  end

  # Deprecated: use client.price instead.
  def Price(data = nil)
    require_relative 'entity/price_entity'
    PriceEntity.new(self, data)
  end


  # Idiomatic facade: client.retailer.list / client.retailer.load({ "id" => ... })
  def retailer
    require_relative 'entity/retailer_entity'
    @retailer ||= RetailerEntity.new(self, nil)
  end

  # Deprecated: use client.retailer instead.
  def Retailer(data = nil)
    require_relative 'entity/retailer_entity'
    RetailerEntity.new(self, data)
  end


  # Idiomatic facade: client.search.list / client.search.load({ "id" => ... })
  def search
    require_relative 'entity/search_entity'
    @search ||= SearchEntity.new(self, nil)
  end

  # Deprecated: use client.search instead.
  def Search(data = nil)
    require_relative 'entity/search_entity'
    SearchEntity.new(self, data)
  end


  # Idiomatic facade: client.studio.list / client.studio.load({ "id" => ... })
  def studio
    require_relative 'entity/studio_entity'
    @studio ||= StudioEntity.new(self, nil)
  end

  # Deprecated: use client.studio instead.
  def Studio(data = nil)
    require_relative 'entity/studio_entity'
    StudioEntity.new(self, data)
  end


  # Idiomatic facade: client.user.list / client.user.load({ "id" => ... })
  def user
    require_relative 'entity/user_entity'
    @user ||= UserEntity.new(self, nil)
  end

  # Deprecated: use client.user instead.
  def User(data = nil)
    require_relative 'entity/user_entity'
    UserEntity.new(self, data)
  end


  # Idiomatic facade: client.widget.list / client.widget.load({ "id" => ... })
  def widget
    require_relative 'entity/widget_entity'
    @widget ||= WidgetEntity.new(self, nil)
  end

  # Deprecated: use client.widget instead.
  def Widget(data = nil)
    require_relative 'entity/widget_entity'
    WidgetEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = NexardaSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
