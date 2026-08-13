
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { NexardaSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


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
      if (maybeSkipControl(t, 'entityOp', 'console.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set NEXARDA_TEST_CONSOLE_ENTID JSON to run live')
      return
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['NEXARDA_TEST_CONSOLE_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'NEXARDA_TEST_CONSOLE_ENTID': idmap,
    'NEXARDA_TEST_LIVE': 'FALSE',
    'NEXARDA_TEST_EXPLAIN': 'FALSE',
    'NEXARDA_APIKEY': 'NONE',
  })

  idmap = env['NEXARDA_TEST_CONSOLE_ENTID']

  const live = 'TRUE' === env.NEXARDA_TEST_LIVE

  if (live) {
    client = new NexardaSDK(merge([
      {
        apikey: env.NEXARDA_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
