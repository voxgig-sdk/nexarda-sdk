# Nexarda SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module NexardaFeatures
  def self.make_feature(name)
    case name
    when "base"
      NexardaBaseFeature.new
    when "ratelimit"
      NexardaRatelimitFeature.new
    when "retry"
      NexardaRetryFeature.new
    when "test"
      NexardaTestFeature.new
    when "timeout"
      NexardaTimeoutFeature.new
    else
      NexardaBaseFeature.new
    end
  end
end
