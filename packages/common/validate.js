
import Reflect from './reflect'
import {paramsKey} from './params'
import validate from '../validation'

function getDateWithType (type, ctx) {
  switch (type) {
    case 'Body':
      return ctx.request.body

    case 'Params':
      return ctx.request.params

    case 'Query':
      return ctx.request.query

    case 'Headers':
      return ctx.request.headers

    default:
      return null
  }
}

export function validateParams (target, ctx) {
  const paramOptions = Reflect.getMetadata(paramsKey, target)

  paramOptions.map(({Dto, group, property, type}) => {
    const data = getDateWithType(type, ctx)
    validate(Dto, data, group)
  })
}
