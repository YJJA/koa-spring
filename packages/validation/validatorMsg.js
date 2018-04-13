
// validator
export const messages = {
  isEmpty: '$property must be empty',
  isNotEmpty: '$property should not be empty',

  isEquals: '$property must be equal to $constraint1',
  isNotEquals: '$property should not equal to $constraint1',

  isIn: '$property must be one of the following values: $constraint1',
  isNotIn: '$property should not be one of the following values: $constraint1',

  isLength (meta) {
    const [min, max] = meta.constraints
    const isMinLength = min !== null && min !== undefined
    const isMaxLength = max !== null && max !== undefined
    if (isMinLength && (!meta.value || meta.value.length < min)) {
      return `$property must be longer than or equal to $constraint1 characters`
    } else if (isMaxLength && (meta.value.length > max)) {
      return `$property must be shorter than or equal to $constraint2 characters`
    }
    return `$property must be longer than or equal to $constraint1 and shorter than or equal to $constraint2 characters`
  },
  isMinLength: '$property must be longer than or equal to $constraint1 characters',
  isMaxLength: '$property must be shorter than or equal to $constraint1 characters',

  isBefore: 'minimal allowed date for $property is $constraint1',
  isAfter: 'maximal allowed date for $property is $constraint1',

  isInt: '$property must be an integer number',
  isMin: '$property must be greater than $constraint1',
  isMax: '$property must be less than $constraint1',

  // other
  contains: '$property must be contains the $constraint1',
  isAlpha: '$property must be contains only letters (a-zA-Z)',
  isAlphanumeric: '$property must be contains only letters and numbers',
  isAscii: '$property must be contains ASCII chars only',
  isBase64: '$property must be base64 encoded',
  isCreditCard: '$property must be a credit card',
  isCurrency: '$property must be a valid currency amount',
  isDataURI: '$property must be a data uri format',
  isEmail: '$property must be an email',
  isHash: '$property must be a $constraint1 hash',
  isHexColor: '$property must be a hexadecimal color',
  isHexadecimal: '$property must be a hexadecimal number',
  isIP: '$property must be an IP',
  isJSON: '$property must be a json string',
  isLowercase: '$property must be lowercase',
  isUppercase: '$property must be uppercase',
  isMACAddress: '$property must be a MAC address',
  isMD5: '$property must be a MD5 hash',
  isMimeType: '$property must be a valid MIME type format',
  isMobilePhone: '$property must be a mobile phone number',
  isMongoId: '$property must be a MongoDB ObjectId',
  isPort: '$property must be a valid port number',
  isPostalCode: '$property must be a postal code',
  isURL: '$property must be an URL',
  isUUID: '$property must be a UUID',
  isWhitelisted: '$property must be appear in the whitelist',
  matches: '$property must be matches the pattern'
}

function getPropertyName (meta, parent) {
  if (parent) {
    return `${parent}.${meta.propertyName}`
  }
  return meta.propertyName
}

function getMessage (value, meta, parent) {
  let message = meta.message || messages[meta.type] || ''
  if (typeof message === 'function') {
    message = message(meta)
  }
  const property = getPropertyName(meta, parent)
  const result = meta.constraints.reduce((result, item, index) => {
    result[`constraint${index + 1}`] = JSON.stringify(item)
    return result
  }, {})
  result.value = JSON.stringify(value)
  result.property = property

  return message.replace(/\$([a-z0-9]+)/g, (k, key) => {
    return result[key] || key
  })
}

export default {getMessage}
