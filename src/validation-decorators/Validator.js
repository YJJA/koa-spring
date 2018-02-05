import validatorJs from 'validator'
import {getDecoratorContainer} from './container'

export class Validator {
  validatorJs = validatorJs

  validate (data) {
    const scheam = getDecoratorContainer(data.constructor)
    for (let [key, metadata] of scheam) {
      data[key] = this.conversion(data[key], metadata)
      data[key] = this.normalize(data[key], metadata)
      this.validateValueByRules(data[key], metadata.rules)
    }
  }

  normalize (value, metadata) {
    return value
  }

  conversion (value, metadata) {
    if (typeof value === 'undefined') {
      return value
    }

    switch (metadata.type) {
      case 'string':
        return String(value)

      case 'number':
        return Number(value)

      case 'boolen':
        return Boolean(value)

      default:
        return value
    }
  }

  validateValueByRules (value, rules) {
    rules.forEach(rule => this.validateRule(value, rule))
  }

  validateRule (value, {type, condition, message}) {
    if (this[type]) {
      const result = this[type](value, condition)
      if (!result) {
        throw new Error(message)
      }
    }
  }

  required (value) {
    return typeof value !== 'undefined'
  }
}
