
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NexardaSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await NexardaSDK.test()
    equal(null !== testsdk, true)
  })

})
