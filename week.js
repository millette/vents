'use strict'

// self
const utils = require('./lib/utils')

utils.week('2017-01-29', { onlyBody: true })
  .then((x) => {
    console.log(x.rows.map((x) => x.doc.start))
  })
  .catch(console.error)
