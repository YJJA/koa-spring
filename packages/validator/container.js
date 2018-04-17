import 'reflect-metadata'
import Metadata from './metadata'
import {validator} from './validator'

const metadataKey = Symbol('metadataKey')

// setDecoratorContainer
export function setDecoratorContainer (argv) {
  let Metadatas = null
  if (Reflect.hasMetadata(metadataKey, argv.target)) {
    Metadatas = Reflect.getMetadata(metadataKey, argv.target)
  } else {
    Metadatas = []
  }

  Metadatas.push(new Metadata(argv))
  Reflect.defineMetadata(metadataKey, Metadatas, argv.target)
}

// getDecoratorContainer
export function getDecoratorContainer (target) {
  if (Reflect.hasMetadata(metadataKey, target)) {
    return Reflect.getMetadata(metadataKey, target)
  } else {
    return []
  }
}

// isOptions
function isOptions (obj) {
  return validator.isObject(obj) && (
    validator.isDefined(obj.groups) ||
    validator.isDefined(obj.message) ||
    validator.isDefined(obj.always)
  )
}

// getConstraintsAndOptions
function getConstraintsAndOptions (args) {
  if (!args.length) {
    return {}
  }
  const last = args[args.length - 1]
  let options = null
  let constraints = args
  if (isOptions(last)) {
    options = last
    constraints = args.splice(0, args.length - 1)
  }

  return {options, constraints}
}

// createDecorator
export function createDecorator (type) {
  return function (...args) {
    const constraintsAndOptions = getConstraintsAndOptions(args)

    return function (object, propertyName) {
      setDecoratorContainer({
        target: object.constructor,
        propertyName,
        type,
        ...constraintsAndOptions
      })
    }
  }
}
