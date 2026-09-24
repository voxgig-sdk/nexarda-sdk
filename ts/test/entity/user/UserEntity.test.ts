

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


describe('UserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NEXARDA_TEST_LIVE=TRUE.
  afterEach(liveDelay('NEXARDA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NexardaSDK.test()
    const ent = testsdk.User()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NEXARDA_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'user.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"avatar":{"a":true,"fo":"uri","h":"Avatar","n":"avatar","r":false,"sh":"Avatar image URL","t":"`$STRING`","key$":"avatar","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique user identifier","t":"`$STRING`","key$":"id","index$":1},"joinDate":{"a":true,"fo":"date-time","h":"Join Date","n":"joinDate","r":false,"sh":"Account creation date","t":"`$STRING`","key$":"joinDate","index$":2},"libraryCount":{"a":true,"h":"Library Count","n":"libraryCount","r":false,"sh":"Number of games in library","t":"`$INTEGER`","key$":"libraryCount","index$":3},"username":{"a":true,"h":"Username","n":"username","r":false,"sh":"Username","t":"`$STRING`","key$":"username","index$":4},"wishlistCount":{"a":true,"h":"Wishlist Count","n":"wishlistCount","r":false,"sh":"Number of items in wishlist","t":"`$INTEGER`","key$":"wishlistCount","index$":5}},"id":{"field":"id","name":"id"},"name":"user","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /users/{userId}/library","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"user_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/users/{userId}/library","q":{"$action":"library","exist":["id"]},"r":{"param":{"userId":"id"}},"s":[{"lit":"users"},{"var":"id"},{"lit":"library"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /users/{userId}/wishlist","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"user_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/users/{userId}/wishlist","q":{"$action":"wishlist","exist":["id"]},"r":{"param":{"userId":"id"}},"s":[{"lit":"users"},{"var":"id"},{"lit":"wishlist"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /users/{userId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"user_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/users/{userId}","q":{"exist":["id"]},"r":{"param":{"userId":"id"}},"s":[{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"user","name__orig":"user","Name":"User","name_":"user","name-":"user","NAME":"USER","index$":8}, {"active":true,"entity":"user","key$":"BasicUserFlow","kind":"basic","name":"BasicUserFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"user_id":"user01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"user_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"user_ref01","srcdatavar":"user_ref01_data","suffix":"_dt0"},"m":{"id":"user01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-user_ref01"}}],"index$":1}]}, 'User', {"GET /users/{userId}/library":{"protocol":"http","operationId":"getUserLibrary","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"key$":"success","type":"boolean"},"data":{"items":{"properties":{"ageRating":{"description":"Age rating (e.g., ESRB, PEGI)","type":"string"},"coverImage":{"description":"Cover image URL","format":"uri","type":"string"},"description":{"description":"Game description","type":"string"},"developer":{"description":"Developer name","type":"string"},"franchiseId":{"description":"Associated franchise ID","type":"string"},"genres":{"description":"Game genres","items":{"type":"string"},"type":"array"},"id":{"description":"Unique game identifier","type":"string"},"name":{"description":"Game title","type":"string"},"platforms":{"description":"Supported platforms","items":{"type":"string"},"type":"array"},"publisher":{"description":"Publisher name","type":"string"},"releaseDate":{"description":"Release date","format":"date","type":"string"},"screenshots":{"description":"Screenshot URLs","items":{"format":"uri","type":"string"},"type":"array"},"videos":{"description":"Video media","items":{"properties":{"type":{"type":"string"},"url":{"format":"uri","type":"string"}},"type":"object"},"type":"array"}},"type":"object","x-ref":"#/components/schemas/Game"},"key$":"data","type":"array"}}}}}},"401":{"description":"Unauthorized - invalid or missing API key","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/UnauthorizedError"},"404":{"description":"Resource not found","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFoundError"},"429":{"description":"Rate limit exceeded - too many requests","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimitError"},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/ServerError"}},"parameters":[{"name":"userId","in":"path","required":true,"description":"Unique identifier for the user","schema":{"type":"string"},"index$":0}],"security":[{"apiKey":[]}],"securitySource":"operation","securitySchemes":{"apiKey":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key."}}},"GET /users/{userId}/wishlist":{"protocol":"http","operationId":"getUserWishlist","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"key$":"success","type":"boolean"},"data":{"items":{"properties":{"ageRating":{"description":"Age rating (e.g., ESRB, PEGI)","type":"string"},"coverImage":{"description":"Cover image URL","format":"uri","type":"string"},"description":{"description":"Game description","type":"string"},"developer":{"description":"Developer name","type":"string"},"franchiseId":{"description":"Associated franchise ID","type":"string"},"genres":{"description":"Game genres","items":{"type":"string"},"type":"array"},"id":{"description":"Unique game identifier","type":"string"},"name":{"description":"Game title","type":"string"},"platforms":{"description":"Supported platforms","items":{"type":"string"},"type":"array"},"publisher":{"description":"Publisher name","type":"string"},"releaseDate":{"description":"Release date","format":"date","type":"string"},"screenshots":{"description":"Screenshot URLs","items":{"format":"uri","type":"string"},"type":"array"},"videos":{"description":"Video media","items":{"properties":{"type":{"type":"string"},"url":{"format":"uri","type":"string"}},"type":"object"},"type":"array"}},"type":"object","x-ref":"#/components/schemas/Game"},"key$":"data","type":"array"}}}}}},"401":{"description":"Unauthorized - invalid or missing API key","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/UnauthorizedError"},"404":{"description":"Resource not found","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFoundError"},"429":{"description":"Rate limit exceeded - too many requests","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimitError"},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/ServerError"}},"parameters":[{"name":"userId","in":"path","required":true,"description":"Unique identifier for the user","schema":{"type":"string"},"index$":0}],"security":[{"apiKey":[]}],"securitySource":"operation","securitySchemes":{"apiKey":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key."}}},"GET /users/{userId}":{"protocol":"http","operationId":"getUserProfile","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean"},"data":{"type":"object","properties":{"id":{"type":"string","description":"Unique user identifier","key$":"id"},"username":{"type":"string","description":"Username","key$":"username"},"avatar":{"type":"string","format":"uri","description":"Avatar image URL","key$":"avatar"},"joinDate":{"type":"string","format":"date-time","description":"Account creation date","key$":"joinDate"},"wishlistCount":{"type":"integer","description":"Number of items in wishlist","key$":"wishlistCount"},"libraryCount":{"type":"integer","description":"Number of games in library","key$":"libraryCount"}},"x-ref":"#/components/schemas/User","index$":0}}}}}},"401":{"description":"Unauthorized - invalid or missing API key","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/UnauthorizedError"},"404":{"description":"Resource not found","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFoundError"},"429":{"description":"Rate limit exceeded - too many requests","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimitError"},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/ServerError"}},"parameters":[{"name":"userId","in":"path","required":true,"description":"Unique identifier for the user","schema":{"type":"string"},"index$":0}],"security":[{"apiKey":[]}],"securitySource":"operation","securitySchemes":{"apiKey":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authenticated endpoints. Contact devteam@nexarda.com to request an API key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let user_ref01_data = Object.values(setup.data.existing.user)[0] as any

    // LIST
    const user_ref01_ent = client.User()
    const user_ref01_match: any = {}
    user_ref01_match['user_id'] = setup.idmap['user01']

    const user_ref01_list = (await user_ref01_ent.list(user_ref01_match)).map((e: any) => e.data())


    // LOAD
    const user_ref01_match_dt0: any = {}
    user_ref01_match_dt0.id = user_ref01_data.id
    const user_ref01_data_dt0 = (await user_ref01_ent.load(user_ref01_match_dt0)).data()
    assert(user_ref01_data_dt0.id === user_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/user/UserTestData.json')

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
    ['user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NEXARDA_TEST_USER_ENTID': idmap,
    'NEXARDA_TEST_LIVE': 'FALSE',
    'NEXARDA_TEST_EXPLAIN': 'FALSE',
    'NEXARDA_APIKEY': '',
  })

  idmap = env['NEXARDA_TEST_USER_ENTID']

  const live = 'TRUE' === env.NEXARDA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NEXARDA_TEST_USER_ENTID']
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
  
