'use strict'

// self
const bla = require('.')
const utils = require('./lib/utils')

bla()
  .then(utils.diff)
  .then((values) => {
    console.log(JSON.stringify(values, null, ' '))
  })
  .catch(console.error)
