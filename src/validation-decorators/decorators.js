import {setDecoratorContainer} from './container'
import {defaultSetter, defaultGetter} from '../utils'

function createDefaultDescriptor (key) {
  return {
    enumerable: true,
    configurable: true,
    get: defaultGetter(key),
    set: defaultSetter(key)
  }
}

// string 默认转换成字符串类型
export function string (message) {
  return function (object, propertyName) {
    setDecoratorContainer({
      type: 'string',
      target: object.constructor,
      propertyName,
      message: message || `${propertyName} attribute type is string`
    })
    return createDefaultDescriptor(propertyName)
  }
}

// number
export function number (message) {
  return function (object, propertyName) {
    setDecoratorContainer({
      type: 'number',
      target: object.constructor,
      propertyName,
      message: message || `${propertyName} attribute type is number`
    })
    return createDefaultDescriptor(propertyName)
  }
}

// number
export function boolean (message) {
  return function (object, propertyName) {
    setDecoratorContainer({
      type: 'boolean',
      target: object.constructor,
      propertyName,
      message: message || `${propertyName} attribute type is boolean`
    })
    return createDefaultDescriptor(propertyName)
  }
}

// required
export function required (message) {
  return function (object, propertyName) {
    setDecoratorContainer({
      target: object.constructor,
      propertyName,
      rule: {
        type: 'required',
        message
      }
    })
    return createDefaultDescriptor(propertyName)
  }
}
