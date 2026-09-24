
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NexardaSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = NexardaSDK.test()
    equal(testsdk instanceof NexardaSDK, true,
      'NexardaSDK.test() must return a client synchronously')
  })

})
