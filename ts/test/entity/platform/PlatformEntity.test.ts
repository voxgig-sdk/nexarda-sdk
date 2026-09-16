

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"api","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"priceUpdates","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"name":"status","req":false,"short":"Overall platform status","type":"`$STRING`","index$":2},{"active":true,"format":"date-time","name":"timestamp","req":false,"short":"Status check timestamp","type":"`$STRING`","index$":3},{"active":true,"name":"website","req":false,"type":"`$OBJECT`","index$":4}],"name":"platform","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /status","json":"{\"operationId\":\"getPlatformStatus\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"api\":{\"properties\":{\"responseTime\":{\"description\":\"Average response time in milliseconds\",\"type\":\"number\"},\"status\":{\"enum\":[\"operational\",\"degraded\",\"down\"],\"type\":\"string\"}},\"type\":\"object\"},\"priceUpdates\":{\"properties\":{\"lastUpdate\":{\"format\":\"date-time\",\"type\":\"string\"},\"status\":{\"enum\":[\"operational\",\"degraded\",\"down\"],\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"description\":\"Overall platform status\",\"enum\":[\"operational\",\"degraded\",\"down\"],\"type\":\"string\"},\"timestamp\":{\"description\":\"Status check timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"website\":{\"properties\":{\"status\":{\"enum\":[\"operational\",\"degraded\",\"down\"],\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/status","segments":[{"lit":"status"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"platform","name__orig":"platform","Name":"Platform","name_":"platform","name-":"platform","NAME":"PLATFORM","index$":3}, {"active":true,"entity":"platform","key$":"BasicPlatformFlow","kind":"basic","name":"BasicPlatformFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"platform_ref01","srcdatavar":"platform_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-platform_ref01"}}],"index$":0}]}, 'Platform')
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
  
