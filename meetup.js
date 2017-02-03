'use strict'

// self
const meetupApi = require('./lib/meetup-api')
// const utils = require('./lib/utils')

/*
meetupApi.getGroup('Linux-Montreal')
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
    console.log('sim b:', JSON.stringify(x.body, null, '  '))
  })
  .catch(console.error)
*/

/*
meetupApi.findQcGroups()
  .then((x) => x.body.map((row) => {
    delete row.score
    row._id = ['mc', row.id].join(':')
    return row
  }))
  .then(utils.bulk)
  .then((x) => console.log(JSON.stringify(x.body, null, '  ')))
  .catch(console.error)
*/

meetupApi.findQcGroups()
  .then((x) => console.log(JSON.stringify(x.headers, null, '  ')))
  .catch(console.error)

/*
meetupApi.allEvents('Linux-Montreal')
  .then((x) => {
    console.log('sim h:', x.headers)
    console.log('sim l:', x.body.length)
    console.log('sim b:', JSON.stringify(x.body[0], null, '  '))
  })
  .catch(console.error)
*/
