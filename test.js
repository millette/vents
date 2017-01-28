'use strict'
import test from 'ava'
import fn from './'
import utils from './lib/utils'

test('makeId', t => {
  const result = utils.makeId(12345)
  t.is(result, 'alq:0012345')
})

test('all', async t => {
  const result = await fn()
  t.is(typeof result, 'object')
  t.truthy(result.length)
  const keys = Object.keys(result[0]).sort()
  t.deepEqual(keys, ['_id', 'description', 'end', 'html', 'location', 'start', 'summary', 'url'])
})
