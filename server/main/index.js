'use strict'

const utils = require('../../lib/utils')

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply('hi')
    }
  })

  const fetchWeek = function (request, reply) {
    reply(utils.week(request.params.week, { onlyBody: true }))
  }

  server.route({
    method: 'GET',
    path: '/week/{week}',
    config: {
      pre: [{ method: fetchWeek, assign: 'week' }]
    },
    handler: function (request, reply) {
      reply.view('ack', request.pre.week)
    }
  })

  next()
}

exports.register.attributes = {
  name: 'main'
}
