import 'reflect-metadata'

const paramsKey = Symbol('paramsKey')

function createParamsDecoratorsWithType (type) {
  return function (Dto, group) {
    return function (target, property) {
      let options = []
      if (Reflect.hasMetadata(paramsKey, target, property)) {
        options = Reflect.getMetadata(paramsKey, target, property)
      }
      options.push({Dto, group, type})

      Reflect.defineMetadata(paramsKey, options, target, property)
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
  return Reflect.getMetadata(paramsKey, target, property) || []
}
