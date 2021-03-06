'use strict'
import test from 'ava'
import utils from './lib/utils'

test('makeId', t => {
  const result = utils.makeId(12345)
  t.is(result, 'alq:0012345')
})

test('all', async t => {
  const result = await utils.fetch()
  t.is(typeof result, 'object')
  t.truthy(result.length)
  const keys = Object.keys(result[0]).sort()
  t.deepEqual(keys, ['_id', 'description', 'end', 'html', 'location', 'start', 'summary', 'url'])
})

test('getIds', async t => {
  const result = await utils.getIds()
  t.truthy(result.headers)
  t.truthy(result.body)
  t.truthy(result.body.rows)
  t.truthy(result.body.rows.length)
})

test('getIds, only body', async t => {
  const result = await utils.getIds({ onlyBody: true })
  t.truthy(result.rows.length)
})

test('getIds, only rows', async t => {
  const result = await utils.getIds({ onlyRows: true })
  t.truthy(result.length)
})

test('week, only rows', async t => {
  const result = await utils.week('2017-01-01', { onlyRows: true })
  t.truthy(result.length)
})

test(
  'week, only rows fail',
  // async t => await t.throws(
  t => t.throws(
    utils.week('2017s-01-01', { onlyRows: true }),
    'Malformed date.'
  )
)

test('makeLocation, no comma', t => {
  const result = utils.makeLocation('X')
  t.is(result.source, 'X')
  t.is(result.given, undefined)
  t.is(result.city, 'X')
})

test('makeLocation', t => {
  const result = utils.makeLocation('X, Y')
  t.is(result.source, 'X, Y')
  t.is(result.given, 'X')
  t.is(result.city, 'Y')
})

test('makeLocation, just comma y', t => {
  const result = utils.makeLocation(', Y')
  t.is(result.source, ', Y')
  t.is(result.given, undefined)
  t.is(result.city, 'Y')
})

test('makeLocation, just comma', t => {
  const result = utils.makeLocation(', ')
  t.is(result.source, ',')
  t.is(result.given, undefined)
  t.is(result.city, undefined)
})

test('makeLocation empty', t => {
  const result = utils.makeLocation('')
  t.is(result, undefined)
})

test('makeLocation undefined', t => {
  const result = utils.makeLocation()
  t.is(result, undefined)
})
