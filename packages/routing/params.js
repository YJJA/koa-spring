
import Reflect from '../shared/reflect'

const paramsKey = Symbol('paramsKey')

function createParamsDecoratorsWithType (type) {
  return function (Dto, group) {
    return function (target, property) {
      const option = {Dto, group, type}
      let options = []
      console.log(paramsKey, target, property)
      if (Reflect.hasMetadata(paramsKey, target, property)) {
        options = Reflect.getMetadata(paramsKey, target, property)
      }
      options.push(option)

      Reflect.setMetadata(paramsKey, options, target.constructor, property)
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

// getParamsOptions
export function getParamsOptions (target) {
  return Reflect.getMetadata(paramsKey, target)
}

// getParamsOptionsByProperty
export function getParamsOptionsByProperty (target, property) {
  return Reflect.getMetadata(paramsKey, target, property)
}