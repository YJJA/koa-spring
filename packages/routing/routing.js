
import Reflect from '../shared/reflect'
import {Methods} from './Methods'

const routingKey = Symbol('routingKey')
const prefixKey = Symbol('prefixKey')

// routingPrefix
function routingPrefix (target, prefix) {
  Reflect.setMetadata(prefixKey, prefix, target)
}

// routingMethod
function routingMethod (target, options) {
  let routes = []
  if (Reflect.hasMetadata(routingKey, target)) {
    routes = Reflect.getMetadata(routingKey, target)
  }
  routes.push(options)
  Reflect.setMetadata(routingKey, routes, target)
}

// routing
export function routing (path, method = Methods.GET) {
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
