import {setDecoratorContainer} from './container'
import {defaultSetter, defaultGetter} from './utils'

function createDefaultDescriptor (key) {
  return {
    enumerable: true,
    configurable: true,
    get: defaultGetter(key),
    set: defaultSetter(key)
  }
}

// Type
export function DataType (dataType, params, options) {
  if (arguments.length === 2) {
    options = params
    params = undefined
  }
  return function (object, propertyName) {
    setDecoratorContainer({
      target: object.constructor,
      propertyName,
      type: 'DataType',
      constraints: [dataType, params],
      options
    })
    return createDefaultDescriptor(propertyName)
  }
}

// NotEmpty
export function NotEmpty (options) {
  return function (object, propertyName) {
    setDecoratorContainer({
      target: object.constructor,
      propertyName,
      type: 'NotEmpty',
      options
    })
    return createDefaultDescriptor(propertyName)
  }
}
