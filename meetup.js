'use strict'

// self
const meetupApi = require('./lib/meetup-api')
const utils = require('./lib/utils')

/*
meetupApi.getGroups('Linux-Montreal')
  .then((x) => {
    console.log('h:', x.headers)
    console.log('b:', JSON.stringify(x.body, null, '  '))
  })
  .catch(console.error)
*/

/*
meetupApi.similarGroups('Linux-Montreal')
  .then((x) => {
    console.log('sim h:', x.headers)
    console.log('sim l:', x.body.length)
    // console.log('sim b:', JSON.stringify(x.body, null, '  '))
  })
  .catch(console.error)
*/

meetupApi.findQcGroups()
  .then((x) => x.body.map((row) => {
    delete row.score
    row._id = ['mc', row.id].join(':')
    return row
  }))
  .then(utils.bulk)
  .then((x) => console.log(JSON.stringify(x.body, null, '  ')))
  .catch(console.error)
