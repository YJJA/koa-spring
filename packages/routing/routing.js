import 'reflect-metadata'

const routingKey = Symbol('routingKey')
const prefixKey = Symbol('prefixKey')

// Methods
export const Methods = ['HEAD', 'OPTIONS', 'GET', 'PUT', 'PATCH', 'POST', 'DELETE']
  .reduce((result, method) => {
    result[method] = method.toLowerCase()
    return result
  }, {})

// routingPrefix
function routingPrefix (target, prefix) {
  Reflect.defineMetadata(prefixKey, prefix, target)
}

// routingMethod
function routingMethod (target, options) {
  let routes = []
  if (Reflect.hasMetadata(routingKey, target)) {
    routes = Reflect.getMetadata(routingKey, target)
  }
  routes.push(options)
  Reflect.defineMetadata(routingKey, routes, target)
}

// routing
export function Routing (path, method = Methods.GET) {
  return function (target, property, descriptor) {
    if (typeof property === 'string') {
      if (descriptor && typeof descriptor.value !== 'function') {
        throw new SyntaxError(`@routing can only be used on functions, not: ${descriptor.value}`)
      }
      return routingMethod(target.constructor, {property, path, method})
    } else {
      return routingPrefix(target, path)
    }
  }
}

// getRoutingOptions
export function getRoutingOptions (target) {
  return Reflect.getMetadata(routingKey, target)
}

// getRoutingMethods
export function getRoutingPrefix (target) {
  return Reflect.getMetadata(prefixKey, target)
}
