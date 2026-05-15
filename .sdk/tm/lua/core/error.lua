-- Nexarda SDK error

local NexardaError = {}
NexardaError.__index = NexardaError


function NexardaError.new(code, msg, ctx)
  local self = setmetatable({}, NexardaError)
  self.is_sdk_error = true
  self.sdk = "Nexarda"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function NexardaError:error()
  return self.msg
end


function NexardaError:__tostring()
  return self.msg
end


return NexardaError
