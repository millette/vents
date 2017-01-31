'use strict'

// core
const parseUrl = require('url').parse
const formatUrl = require('url').format

// npm
const got = require('got')

// self
const Config = require('../config')

const get = (group, method) => {
  const baseUrl = parseUrl('https://api.meetup.com')
  const paths = [group]
  if (method && typeof method === 'string') { paths.push(method) }

  baseUrl.pathname = paths.join('/')
  baseUrl.query = {
    page: 100,
    key: Config.get('/meetup/key')
  }
  return got(formatUrl(baseUrl), { json: true })
}

/*
const get = (group, method, options) => {
  if (options === undefined && typeof method === 'object') {
    options = method
    method = false
  }
  if (!options) { options = {} }
  const baseUrl = parseUrl('https://api.meetup.com')
  const paths = [group]
  if (method && typeof method === 'string') { paths.push(method) }

  if (options.https) {
    options['photo-host'] = 'secure'
    delete options.https
  }

  baseUrl.pathname = paths.join('/')
  baseUrl.query = Object.assign(options, {
    page: 200,
    sign: true,
    key: Config.get('/meetup/key')
  })
  console.log()
  console.log('o:', options)
  console.log('u:', formatUrl(baseUrl))
  return Promise.resolve({})

  // return got(formatUrl(baseUrl), { json: true })
}
*/

/*
get('Linux-Montreal', 'similar_groups')

exports.similarGroups = (group) => got(`https://api.meetup.com/${group}/similar_groups`, { json: true })

exports.getGroups = (group) => got(`https://api.meetup.com/${group}?sign=true&key=${Config.get('/meetup/key')}`, { json: true })
*/

exports.similarGroups = (group) => {
  // return got(`https://api.meetup.com/${group}/similar_groups`, { json: true })
  return get(group, 'similar_groups')
}

exports.getGroups = (group) => {
  // return got(`https://api.meetup.com/${group}?sign=true&key=${Config.get('/meetup/key')}`, { json: true })
  return get(group)

}
