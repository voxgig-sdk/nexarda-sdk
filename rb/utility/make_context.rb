# Nexarda SDK utility: make_context
require_relative '../core/context'
module NexardaUtilities
  MakeContext = ->(ctxmap, basectx) {
    NexardaContext.new(ctxmap, basectx)
  }
end
