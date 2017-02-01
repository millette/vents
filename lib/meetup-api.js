'use strict'

// core
const parseUrl = require('url').parse
const formatUrl = require('url').format

// npm
const got = require('got')
const _ = require('lodash')

// self
const Config = require('../config')

const PER_PAGE = 200

const get = (group, method) => {
  const baseUrl = parseUrl('https://api.meetup.com')
  const paths = [group]
  if (method && typeof method === 'string') { paths.push(method) }

  baseUrl.pathname = paths.join('/')
  baseUrl.query = {
    page: PER_PAGE,
    key: Config.get('/meetup/key')
  }
  return got(formatUrl(baseUrl), { json: true })
}

const find = (what, options) => {
  const baseUrl = parseUrl('https://api.meetup.com')
  const paths = ['find']
  if (!options) { options = {} }
  if (!what || typeof what !== 'string') { Promise.reject(new Error('Bad what.')) }
  paths.push(what)
  baseUrl.pathname = paths.join('/')
  baseUrl.query = Object.assign(options, {
    page: PER_PAGE,
    key: Config.get('/meetup/key')
  })
  return got(formatUrl(baseUrl), { json: true })
}

const methods = [
  'similar_groups'
]

const finds = [
  'groups'
]

methods.forEach((method) => { exports[_.camelCase(method)] = (group) => get(group, method) })
finds.forEach((what) => { exports[_.camelCase('find-' + what)] = (options) => find(what, options) })

const za = (x) => { return {
  headers: x.headers,
  body: x.body.filter((event) => event.country === 'CA' && event.state === 'QC')
} }

exports.getGroups = get

exports.findQcGroups = (options) => {
  if (typeof options === 'number') { options = { offset: options } }
  if (!options) { options = {} }
  const defaults = {
    // offset: 0,
    // upcoming_events: true,
    order: 'distance',
    radius: 'global',
    lat: 48.378383, // saguenay
    lon: -71.2736192, // saguenay
    category: 34
  }

  return exports.findGroups(Object.assign(defaults, options)).then(za)
}
