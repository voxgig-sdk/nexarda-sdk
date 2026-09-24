

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NexardaSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('PlatformEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NEXARDA_TEST_LIVE=TRUE.
  afterEach(liveDelay('NEXARDA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NexardaSDK.test()
    const ent = testsdk.Platform()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NEXARDA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'platform.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"api":{"a":true,"h":"Api","n":"api","r":false,"t":"`$OBJECT`","key$":"api","index$":0},"priceUpdates":{"a":true,"h":"Price Updates","n":"priceUpdates","r":false,"t":"`$OBJECT`","key$":"priceUpdates","index$":1},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Overall platform status","t":"`$STRING`","key$":"status","index$":2},"timestamp":{"a":true,"fo":"date-time","h":"Timestamp","n":"timestamp","r":false,"sh":"Status check timestamp","t":"`$STRING`","key$":"timestamp","index$":3},"website":{"a":true,"h":"Website","n":"website","r":false,"t":"`$OBJECT`","key$":"website","index$":4}},"name":"platform","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /status","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/status","q":{},"r":{},"s":[{"lit":"status"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"platform","name__orig":"platform","Name":"Platform","name_":"platform","name-":"platform","NAME":"PLATFORM","index$":3}, {"active":true,"entity":"platform","key$":"BasicPlatformFlow","kind":"basic","name":"BasicPlatformFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"platform_ref01","srcdatavar":"platform_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-platform_ref01"}}],"index$":0}]}, 'Platform', {"GET /status":{"protocol":"http","operationId":"getPlatformStatus","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"key$":"success","type":"boolean"},"data":{"key$":"data","properties":{"api":{"properties":{"responseTime":{"description":"Average response time in milliseconds","type":"number"},"status":{"enum":["operational","degraded","down"],"type":"string"}},"type":"object","key$":"api"},"priceUpdates":{"properties":{"lastUpdate":{"format":"date-time","type":"string"},"status":{"enum":["operational","degraded","down"],"type":"string"}},"type":"object","key$":"priceUpdates"},"status":{"description":"Overall platform status","enum":["operational","degraded","down"],"type":"string","key$":"status"},"timestamp":{"description":"Status check timestamp","format":"date-time","type":"string","key$":"timestamp"},"website":{"properties":{"status":{"enum":["operational","degraded","down"],"type":"string"}},"type":"object","key$":"website"}},"type":"object","x-ref":"#/components/schemas/PlatformStatus","index$":0}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/ServerError"}},"parameters":[],"securitySource":"unspecified","securitySchemes":{"apiKey":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let platform_ref01_data = Object.values(setup.data.existing.platform)[0] as any

    // LOAD
    const platform_ref01_ent = client.Platform()
    const platform_ref01_match_dt0: any = {}
    const platform_ref01_data_dt0 = (await platform_ref01_ent.load(platform_ref01_match_dt0)).data()
    assert(null != platform_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/platform/PlatformTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = NexardaSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['platform01','platform02','platform03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NEXARDA_TEST_PLATFORM_ENTID': idmap,
    'NEXARDA_TEST_LIVE': 'FALSE',
    'NEXARDA_TEST_EXPLAIN': 'FALSE',
    'NEXARDA_APIKEY': '',
  })

  idmap = env['NEXARDA_TEST_PLATFORM_ENTID']

  const live = 'TRUE' === env.NEXARDA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NEXARDA_TEST_PLATFORM_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new NexardaSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.NEXARDA_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.NEXARDA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
