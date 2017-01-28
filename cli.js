'use strict'

// self
const bla = require('.')
const utils = require('./lib/utils')

const bulk = (data) => data && data.length ? utils.bulk(data, { auth: true }) : false
const display = (values) => console.log(JSON.stringify(values, null, ' '))

bla()
  .then(utils.diff)
  .then(bulk)
  .then(display)
  .catch(console.error)
