import {setDecoratorContainer} from './container'
// import {defaultSetter, defaultGetter} from './utils'

// function createDefaultDescriptor (key) {
//   return {
//     enumerable: true,
//     configurable: true,
//     get: defaultGetter(key),
//     set: defaultSetter(key)
//   }
// }

// Type
export function DataType (dataType) {
  return function (object, propertyName) {
    setDecoratorContainer({
      target: object.constructor,
      propertyName,
      type: 'DataType',
      constraints: [dataType]
    })
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
  }
}
