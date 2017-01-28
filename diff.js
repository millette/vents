'use strict'

// self
const utils = require('./lib/utils')

const datas = require('./foo8.json').map((x) => {
  x._id = utils.makeId(x.url.split('/').slice(-1)[0])
  return x
})

utils.diff(datas)
  .then(console.log)
  .catch(console.error)
