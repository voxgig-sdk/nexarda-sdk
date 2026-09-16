

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"description","req":false,"short":"Franchise description","type":"`$STRING`","index$":0},{"active":true,"name":"games","req":false,"short":"Game IDs included in franchise","type":"`$ARRAY`","index$":1},{"active":true,"name":"id","req":false,"short":"Unique franchise identifier","type":"`$STRING`","index$":2},{"active":true,"format":"uri","name":"logo","req":false,"short":"Franchise logo URL","type":"`$STRING`","index$":3},{"active":true,"name":"name","req":false,"short":"Franchise name","type":"`$STRING`","index$":4},{"active":true,"name":"totalGames","req":false,"short":"Total number of games in franchise","type":"`$INTEGER`","index$":5}],"id":{"field":"id","name":"id"},"name":"franchis","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /franchises","json":"{\"operationId\":\"getFranchises\",\"parameters\":[{\"description\":\"Maximum number of results to return\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":20,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"description\":{\"description\":\"Franchise description\",\"type\":\"string\"},\"games\":{\"description\":\"Game IDs included in franchise\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"Unique franchise identifier\",\"type\":\"string\"},\"logo\":{\"description\":\"Franchise logo URL\",\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"description\":\"Franchise name\",\"type\":\"string\"},\"totalGames\":{\"description\":\"Total number of games in franchise\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded - too many requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/franchises","segments":[{"lit":"franchises"}],"select":{"exist":["limit"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"franchise_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /franchises/{franchiseId}","json":"{\"operationId\":\"getFranchiseById\",\"parameters\":[{\"description\":\"Unique identifier for the franchise\",\"in\":\"path\",\"name\":\"franchiseId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"description\":{\"description\":\"Franchise description\",\"type\":\"string\"},\"games\":{\"description\":\"Game IDs included in franchise\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"Unique franchise identifier\",\"type\":\"string\"},\"logo\":{\"description\":\"Franchise logo URL\",\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"description\":\"Franchise name\",\"type\":\"string\"},\"totalGames\":{\"description\":\"Total number of games in franchise\",\"type\":\"integer\"}},\"type\":\"object\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded - too many requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/franchises/{franchiseId}","rename":{"param":{"franchiseId":"id"}},"segments":[{"lit":"franchises"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"franchis","name__orig":"franchis","Name":"Franchis","name_":"franchis","name-":"franchis","NAME":"FRANCHIS","index$":1}, {"active":true,"entity":"franchis","key$":"BasicFranchisFlow","kind":"basic","name":"BasicFranchisFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"franchis_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"franchis_ref01","srcdatavar":"franchis_ref01_data","suffix":"_dt0"},"match":{"id":"franchis01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-franchis_ref01"}}],"index$":1}]}, 'Franchis')
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
  
