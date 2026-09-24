

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


describe('GameEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NEXARDA_TEST_LIVE=TRUE.
  afterEach(liveDelay('NEXARDA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NexardaSDK.test()
    const ent = testsdk.Game()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NEXARDA_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'game.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ageRating":{"a":true,"h":"Age Rating","n":"ageRating","r":false,"sh":"Age rating (e.g., ESRB, PEGI)","t":"`$STRING`","key$":"ageRating","index$":0},"coverImage":{"a":true,"fo":"uri","h":"Cover Image","n":"coverImage","r":false,"sh":"Cover image URL","t":"`$STRING`","key$":"coverImage","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Game description","t":"`$STRING`","key$":"description","index$":2},"developer":{"a":true,"h":"Developer","n":"developer","r":false,"sh":"Developer name","t":"`$STRING`","key$":"developer","index$":3},"franchiseId":{"a":true,"h":"Franchise Id","n":"franchiseId","r":false,"sh":"Associated franchise ID","t":"`$STRING`","key$":"franchiseId","index$":4},"genres":{"a":true,"h":"Genres","n":"genres","r":false,"sh":"Game genres","t":"`$ARRAY`","key$":"genres","index$":5},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique game identifier","t":"`$STRING`","key$":"id","index$":6},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Game title","t":"`$STRING`","key$":"name","index$":7},"platforms":{"a":true,"h":"Platforms","n":"platforms","r":false,"sh":"Supported platforms","t":"`$ARRAY`","key$":"platforms","index$":8},"publisher":{"a":true,"h":"Publisher","n":"publisher","r":false,"sh":"Publisher name","t":"`$STRING`","key$":"publisher","index$":9},"releaseDate":{"a":true,"fo":"date","h":"Release Date","n":"releaseDate","r":false,"sh":"Release date","t":"`$STRING`","key$":"releaseDate","index$":10},"screenshots":{"a":true,"h":"Screenshots","n":"screenshots","r":false,"sh":"Screenshot URLs","t":"`$ARRAY`","key$":"screenshots","index$":11},"videos":{"a":true,"h":"Videos","n":"videos","r":false,"sh":"Video media","t":"`$ARRAY`","key$":"videos","index$":12}},"id":{"field":"id","name":"id"},"name":"game","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /games","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/games","q":{"exist":["limit","offset"]},"r":{},"s":[{"lit":"games"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /games/platform/{platformId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"platform_id","or":"platform_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"platform","or":"platform","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/games/platform/{platformId}","q":{"exist":["platform","platform_id"]},"r":{"param":{"platformId":"platform_id"}},"s":[{"lit":"games"},{"lit":"platform"},{"var":"platform_id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /games/{gameId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"game_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/games/{gameId}","q":{"exist":["id"]},"r":{"param":{"gameId":"id"}},"s":[{"lit":"games"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.platform"]]},"key$":"game","name__orig":"game","Name":"Game","name_":"game","name-":"game","NAME":"GAME","index$":2}, {"active":true,"entity":"game","key$":"BasicGameFlow","kind":"basic","name":"BasicGameFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"game_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"game_ref01","srcdatavar":"game_ref01_data","suffix":"_dt0"},"m":{"id":"game01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-game_ref01"}}],"index$":1}]}, 'Game', {"GET /games":{"protocol":"http","operationId":"getGames","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"key$":"success","type":"boolean"},"data":{"items":{"properties":{"ageRating":{"description":"Age rating (e.g., ESRB, PEGI)","type":"string","key$":"ageRating"},"coverImage":{"description":"Cover image URL","format":"uri","type":"string","key$":"coverImage"},"description":{"description":"Game description","type":"string","key$":"description"},"developer":{"description":"Developer name","type":"string","key$":"developer"},"franchiseId":{"description":"Associated franchise ID","type":"string","key$":"franchiseId"},"genres":{"description":"Game genres","items":{"type":"string"},"type":"array","key$":"genres"},"id":{"description":"Unique game identifier","type":"string","key$":"id"},"name":{"description":"Game title","type":"string","key$":"name"},"platforms":{"description":"Supported platforms","items":{"type":"string"},"type":"array","key$":"platforms"},"publisher":{"description":"Publisher name","type":"string","key$":"publisher"},"releaseDate":{"description":"Release date","format":"date","type":"string","key$":"releaseDate"},"screenshots":{"description":"Screenshot URLs","items":{"format":"uri","type":"string"},"type":"array","key$":"screenshots"},"videos":{"description":"Video media","items":{"properties":{"type":{"type":"string"},"url":{"format":"uri","type":"string"}},"type":"object"},"type":"array","key$":"videos"}},"type":"object","x-ref":"#/components/schemas/Game","index$":0},"key$":"data","type":"array"},"pagination":{"key$":"pagination","properties":{"hasMore":{"description":"Whether more results are available","type":"boolean"},"limit":{"description":"Results per page","type":"integer"},"offset":{"description":"Current offset","type":"integer"},"total":{"description":"Total number of results","type":"integer"}},"type":"object","x-ref":"#/components/schemas/Pagination"}}}}}},"429":{"description":"Rate limit exceeded - too many requests","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimitError"},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/ServerError"}},"parameters":[{"name":"limit","in":"query","description":"Maximum number of results to return","schema":{"type":"integer","default":20,"minimum":1,"maximum":100},"index$":0},{"name":"offset","in":"query","description":"Number of results to skip for pagination","schema":{"type":"integer","default":0,"minimum":0},"index$":1}],"securitySource":"unspecified","securitySchemes":{"apiKey":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key."}}},"GET /games/platform/{platformId}":{"protocol":"http","operationId":"getGameByPlatformId","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean"},"data":{"type":"object","properties":{"id":{"description":"Unique game identifier","type":"string","key$":"id"},"name":{"description":"Game title","type":"string","key$":"name"},"description":{"description":"Game description","type":"string","key$":"description"},"releaseDate":{"description":"Release date","format":"date","type":"string","key$":"releaseDate"},"ageRating":{"description":"Age rating (e.g., ESRB, PEGI)","type":"string","key$":"ageRating"},"platforms":{"description":"Supported platforms","items":{"type":"string"},"type":"array","key$":"platforms"},"genres":{"description":"Game genres","items":{"type":"string"},"type":"array","key$":"genres"},"developer":{"description":"Developer name","type":"string","key$":"developer"},"publisher":{"description":"Publisher name","type":"string","key$":"publisher"},"screenshots":{"description":"Screenshot URLs","items":{"format":"uri","type":"string"},"type":"array","key$":"screenshots"},"coverImage":{"description":"Cover image URL","format":"uri","type":"string","key$":"coverImage"},"videos":{"description":"Video media","items":{"properties":{"type":{"type":"string"},"url":{"format":"uri","type":"string"}},"type":"object"},"type":"array","key$":"videos"},"franchiseId":{"description":"Associated franchise ID","type":"string","key$":"franchiseId"}},"x-ref":"#/components/schemas/Game","index$":0}}}}}},"404":{"description":"Resource not found","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFoundError"},"429":{"description":"Rate limit exceeded - too many requests","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimitError"},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/ServerError"}},"parameters":[{"name":"platformId","in":"path","required":true,"description":"Platform-specific ID (e.g., Steam App ID)","schema":{"type":"string"},"index$":0},{"name":"platform","in":"query","description":"Platform name","required":true,"schema":{"type":"string","enum":["steam","gog","epic","playstation","xbox","nintendo"]},"index$":1}],"securitySource":"unspecified","securitySchemes":{"apiKey":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key."}}},"GET /games/{gameId}":{"protocol":"http","operationId":"getGameById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean"},"data":{"type":"object","properties":{"id":{"description":"Unique game identifier","type":"string","key$":"id"},"name":{"description":"Game title","type":"string","key$":"name"},"description":{"description":"Game description","type":"string","key$":"description"},"releaseDate":{"description":"Release date","format":"date","type":"string","key$":"releaseDate"},"ageRating":{"description":"Age rating (e.g., ESRB, PEGI)","type":"string","key$":"ageRating"},"platforms":{"description":"Supported platforms","items":{"type":"string"},"type":"array","key$":"platforms"},"genres":{"description":"Game genres","items":{"type":"string"},"type":"array","key$":"genres"},"developer":{"description":"Developer name","type":"string","key$":"developer"},"publisher":{"description":"Publisher name","type":"string","key$":"publisher"},"screenshots":{"description":"Screenshot URLs","items":{"format":"uri","type":"string"},"type":"array","key$":"screenshots"},"coverImage":{"description":"Cover image URL","format":"uri","type":"string","key$":"coverImage"},"videos":{"description":"Video media","items":{"properties":{"type":{"type":"string"},"url":{"format":"uri","type":"string"}},"type":"object"},"type":"array","key$":"videos"},"franchiseId":{"description":"Associated franchise ID","type":"string","key$":"franchiseId"}},"x-ref":"#/components/schemas/Game","index$":0}}}}}},"404":{"description":"Resource not found","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFoundError"},"429":{"description":"Rate limit exceeded - too many requests","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimitError"},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/ServerError"}},"parameters":[{"name":"gameId","in":"path","required":true,"description":"Unique identifier for the game","schema":{"type":"string"},"index$":0}],"securitySource":"unspecified","securitySchemes":{"apiKey":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let game_ref01_data = Object.values(setup.data.existing.game)[0] as any

    // LIST
    const game_ref01_ent = client.Game()
    const game_ref01_match: any = {}

    const game_ref01_list = (await game_ref01_ent.list(game_ref01_match)).map((e: any) => e.data())


    // LOAD
    const game_ref01_match_dt0: any = {}
    game_ref01_match_dt0.id = game_ref01_data.id
    const game_ref01_data_dt0 = (await game_ref01_ent.load(game_ref01_match_dt0)).data()
    assert(game_ref01_data_dt0.id === game_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/game/GameTestData.json')

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
    ['game01','game02','game03','platform01','platform02','platform03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NEXARDA_TEST_GAME_ENTID': idmap,
    'NEXARDA_TEST_LIVE': 'FALSE',
    'NEXARDA_TEST_EXPLAIN': 'FALSE',
    'NEXARDA_APIKEY': '',
  })

  idmap = env['NEXARDA_TEST_GAME_ENTID']

  const live = 'TRUE' === env.NEXARDA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NEXARDA_TEST_GAME_ENTID']
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
  
