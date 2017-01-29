'use strict'

// self
const utils = require('./lib/utils')

utils.week('2017-01-29', { onlyRows: true })
  .then((x) => {
    console.log(x.map((x) => x.doc.start))
  })
  .catch(console.error)
