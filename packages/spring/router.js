import 'reflect-metadata'
import {getRoutingOptions, getRoutingPrefix} from './controller'
import {getRoutingMiddlewares} from './middleware'

// pathJoin
function pathJoin (...paths) {
  return paths.reduce((result, path) => {
    if (typeof path === 'string' && path.length) {
      if (path[0] !== '/') {
        path = '/' + path
      }

      result = result + path
    }
    return result
  }, '')
}

// getRoutesWithController
export function getRoutesWithController (control) {
  const prefix = getRoutingPrefix(control)
  const routingOptions = getRoutingOptions(control)

  return routingOptions.map(({path, method, property}) => {
    return {
      method,
      path: pathJoin(prefix, path),
      handlers: [
        ...getRoutingMiddlewares(control, property),
        control[property].bind(control)
      ]
    }
  })
}
