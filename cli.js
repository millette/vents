'use strict'

// self
const bla = require('.')

bla()
  .then((values) => {
    console.log(JSON.stringify(values, null, ' '))
  })
  .catch(console.error)
