import Koa from 'koa'
import request from 'supertest'
import http from 'http'

import {DataType} from '@koaspring/validator'

import {Controller, Routing, Params, springMiddleware} from '../'

test('http springMiddleware', (done) => {
  const app = new Koa()

  class ParamsDto {
    @DataType(Number)
    id
  }

  @Controller('/users')
  class UserController {
    @Routing('')
    async find (ctx, next) {
      ctx.body = {message: 'success'}
    }

    @Params(ParamsDto)
    @Routing('/:id')
    async findOne (ctx, next) {
      const {params} = ctx.state
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

  app.use(springMiddleware({
    controllers: [UserController]
  }))

  request(http.createServer(app.callback()))
    .get('/users/123')
    .expect(200)
    .end((err, res) => {
      if (err) {
        console.log(err)
        return done(err)
      }
      console.log(res.body)
      done()
    })
})
