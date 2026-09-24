

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


describe('FranchisEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NEXARDA_TEST_LIVE=TRUE.
  afterEach(liveDelay('NEXARDA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NexardaSDK.test()
    const ent = testsdk.Franchis()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NEXARDA_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'franchis.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Franchise description","t":"`$STRING`","key$":"description","index$":0},"games":{"a":true,"h":"Games","n":"games","r":false,"sh":"Game IDs included in franchise","t":"`$ARRAY`","key$":"games","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique franchise identifier","t":"`$STRING`","key$":"id","index$":2},"logo":{"a":true,"fo":"uri","h":"Logo","n":"logo","r":false,"sh":"Franchise logo URL","t":"`$STRING`","key$":"logo","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Franchise name","t":"`$STRING`","key$":"name","index$":4},"totalGames":{"a":true,"h":"Total Games","n":"totalGames","r":false,"sh":"Total number of games in franchise","t":"`$INTEGER`","key$":"totalGames","index$":5}},"id":{"field":"id","name":"id"},"name":"franchis","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /franchises","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/franchises","q":{"exist":["limit"]},"r":{},"s":[{"lit":"franchises"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /franchises/{franchiseId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"franchise_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/franchises/{franchiseId}","q":{"exist":["id"]},"r":{"param":{"franchiseId":"id"}},"s":[{"lit":"franchises"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"franchis","name__orig":"franchis","Name":"Franchis","name_":"franchis","name-":"franchis","NAME":"FRANCHIS","index$":1}, {"active":true,"entity":"franchis","key$":"BasicFranchisFlow","kind":"basic","name":"BasicFranchisFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"franchis_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"franchis_ref01","srcdatavar":"franchis_ref01_data","suffix":"_dt0"},"m":{"id":"franchis01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-franchis_ref01"}}],"index$":1}]}, 'Franchis', {"GET /franchises":{"protocol":"http","operationId":"getFranchises","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"key$":"success","type":"boolean"},"data":{"items":{"properties":{"description":{"description":"Franchise description","type":"string","key$":"description"},"games":{"description":"Game IDs included in franchise","items":{"type":"string"},"type":"array","key$":"games"},"id":{"description":"Unique franchise identifier","type":"string","key$":"id"},"logo":{"description":"Franchise logo URL","format":"uri","type":"string","key$":"logo"},"name":{"description":"Franchise name","type":"string","key$":"name"},"totalGames":{"description":"Total number of games in franchise","type":"integer","key$":"totalGames"}},"type":"object","x-ref":"#/components/schemas/Franchise","index$":0},"key$":"data","type":"array"}}}}}},"429":{"description":"Rate limit exceeded - too many requests","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimitError"},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/ServerError"}},"parameters":[{"name":"limit","in":"query","description":"Maximum number of results to return","schema":{"type":"integer","default":20,"minimum":1,"maximum":100},"index$":0}],"securitySource":"unspecified","securitySchemes":{"apiKey":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key."}}},"GET /franchises/{franchiseId}":{"protocol":"http","operationId":"getFranchiseById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean"},"data":{"type":"object","properties":{"id":{"description":"Unique franchise identifier","type":"string","key$":"id"},"name":{"description":"Franchise name","type":"string","key$":"name"},"description":{"description":"Franchise description","type":"string","key$":"description"},"logo":{"description":"Franchise logo URL","format":"uri","type":"string","key$":"logo"},"games":{"description":"Game IDs included in franchise","items":{"type":"string"},"type":"array","key$":"games"},"totalGames":{"description":"Total number of games in franchise","type":"integer","key$":"totalGames"}},"x-ref":"#/components/schemas/Franchise","index$":0}}}}}},"404":{"description":"Resource not found","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFoundError"},"429":{"description":"Rate limit exceeded - too many requests","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimitError"},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/ServerError"}},"parameters":[{"name":"franchiseId","in":"path","required":true,"description":"Unique identifier for the franchise","schema":{"type":"string"},"index$":0}],"securitySource":"unspecified","securitySchemes":{"apiKey":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let franchis_ref01_data = Object.values(setup.data.existing.franchis)[0] as any

    // LIST
    const franchis_ref01_ent = client.Franchis()
    const franchis_ref01_match: any = {}

    const franchis_ref01_list = (await franchis_ref01_ent.list(franchis_ref01_match)).map((e: any) => e.data())


    // LOAD
    const franchis_ref01_match_dt0: any = {}
    franchis_ref01_match_dt0.id = franchis_ref01_data.id
    const franchis_ref01_data_dt0 = (await franchis_ref01_ent.load(franchis_ref01_match_dt0)).data()
    assert(franchis_ref01_data_dt0.id === franchis_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/franchis/FranchisTestData.json')

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
    ['franchis01','franchis02','franchis03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NEXARDA_TEST_FRANCHIS_ENTID': idmap,
    'NEXARDA_TEST_LIVE': 'FALSE',
    'NEXARDA_TEST_EXPLAIN': 'FALSE',
    'NEXARDA_APIKEY': '',
  })

  idmap = env['NEXARDA_TEST_FRANCHIS_ENTID']

  const live = 'TRUE' === env.NEXARDA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NEXARDA_TEST_FRANCHIS_ENTID']
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
  
