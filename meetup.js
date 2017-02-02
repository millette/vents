'use strict'

// self
const meetupApi = require('./lib/meetup-api')

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
  .then((x) => {
    console.log('fg l:', x.headers)
    console.log('fg l:', x.body.length)
    console.log('sim b:', JSON.stringify(x.body[0], null, '  '))
    console.log('sim z:', JSON.stringify(x.body[x.body.length - 1], null, '  '))
  })
  .catch(console.error)