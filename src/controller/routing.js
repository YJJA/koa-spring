import {Methods} from './Methods'

// routingClass
function routingClass (target, rootPath) {
  const _routes = target.prototype._routes
  if (typeof _routes === 'object') {
    target.prototype._routes = Object.keys(_routes).reduce((result, key) => {
      const [method, path] = key.split(' ')
      result[`${method} ${rootPath}${path}`] = _routes[key]
      return result
    }, {})
  }

  return target
}

// routingMethod
function routingMethod (target, property, descriptor, path, method) {
  if (descriptor && typeof descriptor.value !== 'function') {
    throw new SyntaxError(`@routing can only be used on functions, not: ${descriptor.value}`)
  }

  const _routes = target._routes || {}
  _routes[`${method} ${path}`] = property
  target._routes = _routes

  return descriptor
}

// routing
export function routing (path, method = Methods.GET) {
  return function (target, property, descriptor) {
    if (typeof property === 'string') {
      return routingMethod(target, property, descriptor, path, method)
    } else {
      return routingClass(target, path)
    }
  }
}
