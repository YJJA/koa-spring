// message

function getPropertyName (meta, parent) {
  if (parent) {
    return `${parent}.${meta.propertyName}`
  }
  return meta.propertyName
}

class validatorTypes {

  static getMessage (meta, parent) {
    const propertyName = getPropertyName(meta, parent)

    switch (meta.type) {
      case this.EMPTY:
        return `${propertyName} must be empty`

      case this.NOT_EMPTY:
        return `${propertyName} should not be empty`

      case this.EQUALS:
        return `${propertyName} must be equal to ${String(meta.constraints[0])}`

      case this.NOT_EQUALS:
        return `${propertyName} should not equal to ${String(meta.constraints[0])}`

      case this.IN:
        return `${propertyName} must be one of the following values: ${String(meta.constraints[0])}`

      case this.NOT_IN:
        return `${propertyName} must be one of the following values: ${String(meta.constraints[0])}`

      case this.LENGTH:
        return (meta) => {
          const [min, max] = meta.constraints
          const isMinLength = min !== null && min !== undefined
          const isMaxLength = max !== null && max !== undefined
          if (isMinLength && (!meta.value || meta.value.length < min)) {
            return `${propertyName} must be longer than or equal to ${String(min)} characters`
          } else if (isMaxLength && (meta.value.length > max)) {
            return `${propertyName} must be shorter than or equal to ${String(max)} characters`
          }
          return `${propertyName} must be longer than or equal to ${String(min)} and shorter than or equal to ${String(max)} characters`
        }

      case this.MIN_LENGTH:
        return `${propertyName} must be longer than or equal to ${String(meta.constraints[0])} characters`

      case this.MAX_LENGTH:
        return `${propertyName} must be shorter than or equal to ${String(meta.constraints[0])} characters`

      case this.BEFORE:
        return `minimal allowed date for ${propertyName} is ${String(meta.constraints[0])}`

      case this.AFTER:
        return `maximal allowed date for ${propertyName} is ${String(meta.constraints[0])}`

      case this.INT:
        return `${propertyName} must be an integer number`

      case this.MIN:
        return `${propertyName} must be greater than ${String(meta.constraints[0])}`

      case this.MAX:
        return `${propertyName} must be less than ${String(meta.constraints[0])}`

      case this.JSONS:
        return `${propertyName} must be a json string`

      case this.BASE64:
        return `${propertyName} must be a base64 string`

      default:
        return ''
    }
  }
}

export default validatorTypes
