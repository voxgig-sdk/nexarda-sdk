
import { Context } from './Context'


class NexardaError extends Error {

  isNexardaError = true

  sdk = 'Nexarda'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  NexardaError
}

