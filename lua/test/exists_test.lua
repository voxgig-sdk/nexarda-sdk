-- Nexarda SDK exists test

local sdk = require("nexarda_sdk")

describe("NexardaSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
