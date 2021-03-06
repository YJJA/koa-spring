import validator from '../validator'

// ValidateIf
export default class ValidateIf {
  validate (value, data, constraint) {
    if (validator.isFunction(constraint)) {
      return constraint(data)
    } else if (validator.isBoolean(constraint)) {
      return constraint
    } else {
      return false
    }
  }

  message () {
    return 'ValidateIf arg must be a function or boolean'
  }
}
