
import Reflect from './reflect'

export const paramsKey = Symbol('paramsKey')

// body
export function Body (Dto, group) {
  return function (target, property) {
    const option = {Dto, group, property, type: 'Body'}
    Reflect.setMetadata(paramsKey, option, target.constructor)
  }
}

// body
export function Params (Dto, group) {
  return function (target, property) {
    const option = {Dto, group, property, type: 'Params'}
    Reflect.setMetadata(paramsKey, option, target.constructor)
  }
}

// body
export function Query (Dto, group) {
  return function (target, property) {
    const option = {Dto, group, property, type: 'Query'}
    Reflect.setMetadata(paramsKey, option, target.constructor)
  }
}

// Headers
export function Headers (Dto, group) {
  return function (target, property) {
    const option = {Dto, group, property, type: 'Headers'}
    Reflect.setMetadata(paramsKey, option, target.constructor)
  }
}
