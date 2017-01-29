'use strict'

// core
const parseUrl = require('url').parse
const formatUrl = require('url').format

// npm
const marked = require('marked')
const he = require('he')
const ical = require('ical')
const _ = require('lodash')
const got = require('got')

// self
const Config = require('./../config')

he.decode.options.isAttributeValue = true
he.decode.options.strict = true

const weekms = 7 * 86400 * 1000

const idField = (z) => z.id || z._id

const decode = (str) => he.decode(str).trim()

const sorter = (a, b) => {
  if (a.start > b.start) { return 1 }
  if (a.start < b.start) { return -1 }
  return 0
}

exports.makeLocation = (source) => {
  if (!source) { return }
  source = source.trim()
  const parts = source.split(', ')
  if (!parts.length) { return }
  if (parts.length === 1) {
    return {
      city: source,
      source: source
    }
  }
  return {
    source: source,
    given: parts.slice(0, -1).join(', ').trim() || undefined,
    city: parts[parts.length - 1]
  }
}

exports.makeId = (uid) => 'alq:' + (1e7 + parseInt(uid, 10)).toString().slice(1)

exports.getView = (ddoc, view, options) => {
  const dbUrl = parseUrl(Config.get('/db/url'))
  const onlyBody = options.onlyBody
  const onlyRows = options.onlyRows
  const gotOptions = { json: true }
  delete options.onlyBody
  delete options.onlyRows
  if (options && typeof options === 'object') {
    if (options.auth) {
      if (options.auth === true) { gotOptions.auth = [Config.get('/db/admin'), Config.get('/db/password')].join(':') }
      if (typeof options.auth === 'string') { gotOptions.auth = options.auth }
      delete options.auth
    }
    Object.assign(dbUrl, options)
  }
  dbUrl.pathname = [Config.get('/db/name'), '_design', ddoc, '_view', view].join('/')
  const p = got(formatUrl(dbUrl), gotOptions)

  if (onlyRows) { return p.then((x) => x.body.rows) }
  if (onlyBody) { return p.then((x) => x.body) }
  return p
}

exports.fetch = () => got('http://agendadulibre.qc.ca/events.ics')
  .then((x) => {
    const values = []
    const z = ical.parseICS(x.body.replace(/\r/g, '\\n').replace(/&amp;/g, '&').replace(/&gt;/g, '>'))
    let description
    for (let r in z) {
      if (z[r].type !== 'VEVENT') { continue }
      description = decode(z[r].description)
      values.push({
        start: new Date(z[r].start).toISOString(),
        end: new Date(z[r].end).toISOString(),
        _id: exports.makeId(z[r].uid),
        summary: decode(z[r].summary),
        url: z[r].url.trim(),
        description: description,
        html: marked(he.escape(description)),
        location: exports.makeLocation(z[r].location)
      })
    }
    return values.sort(sorter)
  })

exports.bulk = (data, options) => {
  const dbUrl = parseUrl(Config.get('/db/url'))
  const gotOptions = {
    json: true,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ docs: data })
  }

  if (options && typeof options === 'object') {
    if (options.auth) {
      if (options.auth === true) { gotOptions.auth = [Config.get('/db/admin'), Config.get('/db/password')].join(':') }
      if (typeof options.auth === 'string') { gotOptions.auth = options.auth }
    }
  } else {
    options = {}
  }

  dbUrl.pathname = [Config.get('/db/name'), '_bulk_docs'].join('/')
  const p = got.post(formatUrl(dbUrl), gotOptions)
  if (options.onlyBody) { return p.then((x) => x.body) }
  return p
}

exports.week = (date, options) => {
  const ts = Date.parse(date)
  if (!ts) { return Promise.reject(new Error('Malformed date.')) }
  return exports.getView(
    'vents',
    'bystart',
    Object.assign(
      {
        query: {
          reduce: false,
          startkey: JSON.stringify([date]),
          endkey: JSON.stringify([new Date(ts + weekms).toISOString().split('T')[0]]),
          include_docs: true
        }
      },
      options || {}
    )
  )
}

exports.getIds = (options) => exports.getView(
  'vents',
  'ids',
  Object.assign(
    { query: { reduce: false } },
    options || {}
  )
)

exports.diff = (d) => exports.getIds({ onlyBody: true }).then((x) => _.differenceBy(d, x.rows, idField))
