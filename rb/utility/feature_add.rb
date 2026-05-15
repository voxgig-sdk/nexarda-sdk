# Nexarda SDK utility: feature_add
module NexardaUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
