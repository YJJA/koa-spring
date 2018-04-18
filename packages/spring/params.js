import 'reflect-metadata'
import {validate} from '@koaspring/validator'
import {setRoutingRequestBefore} from './controller'

// getParamsDataByType
function getParamsDataByType (type, ctx) {
  switch (type) {
    case 'body':
      return ctx.request.body
    case 'params':
      return ctx.params
    case 'query':
      return ctx.request.query
    case 'headers':
      return ctx.request.headers
    default:
      return {}
  }
}

// createParamsDecoratorsHandler
function createParamsDecoratorsHandler (type, Dto, group) {
  return async (ctx, next) => {
    const data = getParamsDataByType(type, ctx)
    ctx.state[type] = await validate(Dto, data, group)
    await next()
  }
}

// createParamsDecoratorsWithType
function createParamsDecoratorsWithType (type) {
  return function (Dto, group) {
    return function (target, property) {
      setRoutingRequestBefore(target, property, createParamsDecoratorsHandler(type, Dto, group))
    }
  }
}

// body
export const Body = createParamsDecoratorsWithType('body')
// Params
export const Params = createParamsDecoratorsWithType('params')
// Query
export const Query = createParamsDecoratorsWithType('query')
// Headers
export const Headers = createParamsDecoratorsWithType('headers')
