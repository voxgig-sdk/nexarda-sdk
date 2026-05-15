# Nexarda SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module NexardaFeatures
  def self.make_feature(name)
    case name
    when "base"
      NexardaBaseFeature.new
    when "test"
      NexardaTestFeature.new
    else
      NexardaBaseFeature.new
    end
  end
end
