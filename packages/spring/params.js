import 'reflect-metadata'
import {validate} from '@koaspring/validator'
import {createRoutingMiddleware} from './middleware'

// Body
export const Body = createRoutingMiddleware((Dto, group) => {
  return async (ctx, next) => {
    const data = ctx.request.body
    ctx.state.body = await validate(Dto, data, group)
    await next()
  }
})

// Params
export const Params = createRoutingMiddleware((Dto, group) => {
  return async (ctx, next) => {
    const data = ctx.params
    ctx.state.params = await validate(Dto, data, group)
    await next()
  }
})

// Query
export const Query = createRoutingMiddleware((Dto, group) => {
  return async (ctx, next) => {
    const data = ctx.request.query
    ctx.state.query = await validate(Dto, data, group)
    await next()
  }
})

// Headers
export const Headers = createRoutingMiddleware((Dto, group) => {
  return async (ctx, next) => {
    const data = ctx.request.headers
    ctx.state.headers = await validate(Dto, data, group)
    await next()
  }
})
