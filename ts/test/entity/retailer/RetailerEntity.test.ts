

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


describe('RetailerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NEXARDA_TEST_LIVE=TRUE.
  afterEach(liveDelay('NEXARDA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NexardaSDK.test()
    const ent = testsdk.Retailer()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NEXARDA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'retailer.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"approved":{"a":true,"h":"Approved","n":"approved","r":false,"sh":"Approval status","t":"`$BOOLEAN`","key$":"approved","index$":0},"currencies":{"a":true,"h":"Currencies","n":"currencies","r":false,"sh":"Supported currencies","t":"`$ARRAY`","key$":"currencies","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique retailer identifier","t":"`$STRING`","key$":"id","index$":2},"logo":{"a":true,"fo":"uri","h":"Logo","n":"logo","r":false,"sh":"Retailer logo URL","t":"`$STRING`","key$":"logo","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Retailer name","t":"`$STRING`","key$":"name","index$":4},"regions":{"a":true,"h":"Regions","n":"regions","r":false,"sh":"Supported regions","t":"`$ARRAY`","key$":"regions","index$":5},"website":{"a":true,"fo":"uri","h":"Website","n":"website","r":false,"sh":"Retailer website","t":"`$STRING`","key$":"website","index$":6}},"id":{"field":"id","name":"id"},"name":"retailer","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /retailers","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/retailers","q":{},"r":{},"s":[{"lit":"retailers"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"retailer","name__orig":"retailer","Name":"Retailer","name_":"retailer","name-":"retailer","NAME":"RETAILER","index$":5}, {"active":true,"entity":"retailer","key$":"BasicRetailerFlow","kind":"basic","name":"BasicRetailerFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"retailer_ref01"}}],"index$":0}]}, 'Retailer', {"GET /retailers":{"protocol":"http","operationId":"getRetailers","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"key$":"success","type":"boolean"},"data":{"items":{"properties":{"approved":{"description":"Approval status","type":"boolean","key$":"approved"},"currencies":{"description":"Supported currencies","items":{"type":"string"},"type":"array","key$":"currencies"},"id":{"description":"Unique retailer identifier","type":"string","key$":"id"},"logo":{"description":"Retailer logo URL","format":"uri","type":"string","key$":"logo"},"name":{"description":"Retailer name","type":"string","key$":"name"},"regions":{"description":"Supported regions","items":{"type":"string"},"type":"array","key$":"regions"},"website":{"description":"Retailer website","format":"uri","type":"string","key$":"website"}},"type":"object","x-ref":"#/components/schemas/Retailer","index$":0},"key$":"data","type":"array"}}}}}},"429":{"description":"Rate limit exceeded - too many requests","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimitError"},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/ServerError"}},"parameters":[],"securitySource":"unspecified","securitySchemes":{"apiKey":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let retailer_ref01_data = Object.values(setup.data.existing.retailer)[0] as any

    // LIST
    const retailer_ref01_ent = client.Retailer()
    const retailer_ref01_match: any = {}

    const retailer_ref01_list = (await retailer_ref01_ent.list(retailer_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/retailer/RetailerTestData.json')

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
    ['retailer01','retailer02','retailer03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NEXARDA_TEST_RETAILER_ENTID': idmap,
    'NEXARDA_TEST_LIVE': 'FALSE',
    'NEXARDA_TEST_EXPLAIN': 'FALSE',
    'NEXARDA_APIKEY': '',
  })

  idmap = env['NEXARDA_TEST_RETAILER_ENTID']

  const live = 'TRUE' === env.NEXARDA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NEXARDA_TEST_RETAILER_ENTID']
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
  
