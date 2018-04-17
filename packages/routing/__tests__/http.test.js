import Koa from 'koa'
import request from 'supertest'
import http from 'http'

import {DataType} from 'validator-decorators'

import {routingMiddleware} from '../routingMiddleware'
import {routing} from '../routing'
import {Params} from '../params'

test('http routingMiddleware', (done) => {
  const app = new Koa()

  class ParamsDto {
    @DataType(Number)
    id
  }

  @routing('/users')
  class UserController {
    @routing('')
    async find (ctx, next) {
      ctx.body = {message: 'success1'}
    }

    @Params(ParamsDto)
    @routing('/:id')
    async findOne (ctx, next) {
      const {params} = ctx.dto
      ctx.body = params
    }
  }

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = 400
      ctx.body = {message: err.message}
      // ctx.app.emit('error', err, ctx)
    }
  })

  app.use(routingMiddleware({
    controllers: [UserController]
  }))

  request(http.createServer(app.callback()))
    .get('/users/123a')
    .expect(400)
    .end((err, res) => {
      if (err) {
        console.log(err)
        return done(err)
      }
      console.log(res.body)
      done()
    })
})
