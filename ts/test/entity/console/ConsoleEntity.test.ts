

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


describe('ConsoleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NEXARDA_TEST_LIVE=TRUE.
  afterEach(liveDelay('NEXARDA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NexardaSDK.test()
    const ent = testsdk.Console()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NEXARDA_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'console.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Product description","t":"`$STRING`","key$":"description","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique console identifier","t":"`$STRING`","key$":"id","index$":1},"images":{"a":true,"h":"Images","n":"images","r":false,"sh":"Product images","t":"`$ARRAY`","key$":"images","index$":2},"manufacturer":{"a":true,"h":"Manufacturer","n":"manufacturer","r":false,"sh":"Manufacturer name","t":"`$STRING`","key$":"manufacturer","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Console name","t":"`$STRING`","key$":"name","index$":4},"releaseDate":{"a":true,"fo":"date","h":"Release Date","n":"releaseDate","r":false,"sh":"Release date","t":"`$STRING`","key$":"releaseDate","index$":5},"specifications":{"a":true,"h":"Specifications","n":"specifications","r":false,"sh":"Technical specifications","t":"`$OBJECT`","key$":"specifications","index$":6},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Product type","t":"`$STRING`","key$":"type","index$":7}},"id":{"field":"id","name":"id"},"name":"console","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /consoles","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/consoles","q":{"exist":["limit"]},"r":{},"s":[{"lit":"consoles"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /consoles/{consoleId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"console_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/consoles/{consoleId}","q":{"exist":["id"]},"r":{"param":{"consoleId":"id"}},"s":[{"lit":"consoles"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"console","name__orig":"console","Name":"Console","name_":"console","name-":"console","NAME":"CONSOLE","index$":0}, {"active":true,"entity":"console","key$":"BasicConsoleFlow","kind":"basic","name":"BasicConsoleFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"console_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"console_ref01","srcdatavar":"console_ref01_data","suffix":"_dt0"},"m":{"id":"console01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-console_ref01"}}],"index$":1}]}, 'Console', {"GET /consoles":{"protocol":"http","operationId":"getConsoles","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"key$":"success","type":"boolean"},"data":{"items":{"properties":{"description":{"description":"Product description","type":"string","key$":"description"},"id":{"description":"Unique console identifier","type":"string","key$":"id"},"images":{"description":"Product images","items":{"format":"uri","type":"string"},"type":"array","key$":"images"},"manufacturer":{"description":"Manufacturer name","type":"string","key$":"manufacturer"},"name":{"description":"Console name","type":"string","key$":"name"},"releaseDate":{"description":"Release date","format":"date","type":"string","key$":"releaseDate"},"specifications":{"additionalProperties":{"type":"string"},"description":"Technical specifications","type":"object","key$":"specifications"},"type":{"description":"Product type","enum":["console","gear"],"type":"string","key$":"type"}},"type":"object","x-ref":"#/components/schemas/Console","index$":0},"key$":"data","type":"array"}}}}}},"429":{"description":"Rate limit exceeded - too many requests","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimitError"},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/ServerError"}},"parameters":[{"name":"limit","in":"query","description":"Maximum number of results to return","schema":{"type":"integer","default":20,"minimum":1,"maximum":100},"index$":0}],"securitySource":"unspecified","securitySchemes":{"apiKey":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key."}}},"GET /consoles/{consoleId}":{"protocol":"http","operationId":"getConsoleById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean"},"data":{"type":"object","properties":{"id":{"description":"Unique console identifier","type":"string","key$":"id"},"name":{"description":"Console name","type":"string","key$":"name"},"type":{"description":"Product type","enum":["console","gear"],"type":"string","key$":"type"},"manufacturer":{"description":"Manufacturer name","type":"string","key$":"manufacturer"},"releaseDate":{"description":"Release date","format":"date","type":"string","key$":"releaseDate"},"description":{"description":"Product description","type":"string","key$":"description"},"images":{"description":"Product images","items":{"format":"uri","type":"string"},"type":"array","key$":"images"},"specifications":{"additionalProperties":{"type":"string"},"description":"Technical specifications","type":"object","key$":"specifications"}},"x-ref":"#/components/schemas/Console","index$":0}}}}}},"404":{"description":"Resource not found","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFoundError"},"429":{"description":"Rate limit exceeded - too many requests","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimitError"},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/ServerError"}},"parameters":[{"name":"consoleId","in":"path","required":true,"description":"Unique identifier for the console","schema":{"type":"string"},"index$":0}],"securitySource":"unspecified","securitySchemes":{"apiKey":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let console_ref01_data = Object.values(setup.data.existing.console)[0] as any

    // LIST
    const console_ref01_ent = client.Console()
    const console_ref01_match: any = {}

    const console_ref01_list = (await console_ref01_ent.list(console_ref01_match)).map((e: any) => e.data())


    // LOAD
    const console_ref01_match_dt0: any = {}
    console_ref01_match_dt0.id = console_ref01_data.id
    const console_ref01_data_dt0 = (await console_ref01_ent.load(console_ref01_match_dt0)).data()
    assert(console_ref01_data_dt0.id === console_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/console/ConsoleTestData.json')

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
    ['console01','console02','console03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NEXARDA_TEST_CONSOLE_ENTID': idmap,
    'NEXARDA_TEST_LIVE': 'FALSE',
    'NEXARDA_TEST_EXPLAIN': 'FALSE',
    'NEXARDA_APIKEY': '',
  })

  idmap = env['NEXARDA_TEST_CONSOLE_ENTID']

  const live = 'TRUE' === env.NEXARDA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NEXARDA_TEST_CONSOLE_ENTID']
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
  
