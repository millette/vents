'use strict'

// core
const got = require('got')
const parseUrl = require('url').parse
const formatUrl = require('url').format

// self
const Config = require('./../config')

exports.makeId = (uid) => 'alq:' + (1e7 + parseInt(uid, 10)).toString().slice(1)

exports.getView = (ddoc, view, options) => {
  const gotOptions = { json: true }
  const dbUrl = parseUrl(Config.get('/db/url'))
  if (options && typeof options === 'object') {
    if (options.auth) {
      if (options.auth === true) { gotOptions.auth = [Config.get('/db/admin'), Config.get('/db/password')].join(':') }
      if (typeof options.auth === 'string') { gotOptions.auth = options.auth }
      delete options.auth
    }
    Object.assign(dbUrl, options)
  }
  dbUrl.pathname = [Config.get('/db/name'), '_design', ddoc, '_view', view].join('/')
  return got(formatUrl(dbUrl), gotOptions)
}

exports.getIds = () => exports.getView('vents', 'ids', { query: { reduce: false } })
