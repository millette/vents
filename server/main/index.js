'use strict'

const utils = require('../../lib/utils')
const Boom = require('boom')

exports.register = (server, options, next) => {
  const fetchWeek = function (request, reply) {
    reply(utils.week(request.params.week, { onlyBody: true })
      .catch((e) => Boom.wrap(e, 400, e.message)))
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) { reply('hi') }
  })

  server.route({
    method: 'GET',
    path: '/week/{week}',
    config: { pre: [{ method: fetchWeek, assign: 'week' }] },
    handler: function (request, reply) { reply.view('ack', request.pre.week) }
  })

  next()
}

exports.register.attributes = { name: 'main' }
