'use strict'

// npm
const _ = require('lodash')

// self
const utils = require('./lib/utils')

const datas = require('./foo7b-more.json').map((x) => {
  x._id = utils.makeId(x.url.split('/').slice(-1)[0])
  return x
})

utils.getIds()
  .then((x) => {
    const diff = _.differenceBy(datas, x.body.rows, (z) => z.id || z._id)
    console.log(diff)
  })
  .catch(console.error)
