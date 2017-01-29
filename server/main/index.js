'use strict'

const utils = require('../../lib/utils')
const Boom = require('boom')

const fetchWeek = function (request, reply) {
  reply(utils.week(request.params.week, { onlyBody: true }).catch((e) => Boom.badRequest(e)))
}

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) { reply('hi') }
  })

  server.route({
    method: 'GET',
    path: '/week/{week}',
    config: { pre: [{ method: fetchWeek, assign: 'week' }] },
    handler: function (request, reply) {
      reply.view('ack', { partial: 'event', pre: request.pre })
    }
  })

  next()
}

exports.register.attributes = { name: 'main' }
