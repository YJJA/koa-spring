import {setDecoratorContainer} from './container'
import validator from './validator'

function isOptions (obj) {
  return validator.isObject(obj) && (
    validator.isDefined(obj.groups) ||
    validator.isDefined(obj.message) ||
    validator.isDefined(obj.always)
  )
}

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

function createDecorator (type) {
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

// DataType
export const DataType = createDecorator('DataType')
// Validate
export const ValidateIf = createDecorator('ValidateIf')
// Validate
export const Validate = createDecorator('validate')

// IsEmpty
export const IsEmpty = createDecorator('isEmpty')
// IsNotEmpty
export const IsNotEmpty = createDecorator('isNotEmpty')
// IsEquals
export const IsEquals = createDecorator('isEquals')
// IsNotEquals
export const IsNotEquals = createDecorator('isNotEquals')

// IsIn
export const IsIn = createDecorator('isIn')
// IsNotIn
export const IsNotIn = createDecorator('isNotIn')

// IsLength
export const IsLength = createDecorator('isLength')
// IsMinLength
export const IsMinLength = createDecorator('isMinLength')
// IsMaxLength
export const IsMaxLength = createDecorator('isMaxLength')

// IsBefore
export const IsBefore = createDecorator('isBefore')
// IsAfter
export const IsAfter = createDecorator('isAfter')

// IsInt
export const IsInt = createDecorator('isInt')
// IsMin
export const IsMin = createDecorator('isMin')
// IsMax
export const IsMax = createDecorator('isMax')

// Contains
export const Contains = createDecorator('contains')
// IsAlpha
export const IsAlpha = createDecorator('isAlpha')
// IsAlphanumeric
export const IsAlphanumeric = createDecorator('isAlphanumeric')
// IsAscii
export const IsAscii = createDecorator('isAscii')
// IsBase64
export const IsBase64 = createDecorator('isBase64')
// IsCreditCard
export const IsCreditCard = createDecorator('isCreditCard')
// IsCurrency
export const IsCurrency = createDecorator('isCurrency')
// IsDataURI
export const IsDataURI = createDecorator('isDataURI')
// IsEmail
export const IsEmail = createDecorator('isEmail')
// IsHash
export const IsHash = createDecorator('isHash')
// IsHexColor
export const IsHexColor = createDecorator('isHexColor')
// IsHexadecimal
export const IsHexadecimal = createDecorator('isHexadecimal')
// IsIP
export const IsIP = createDecorator('isIP')
// IsJSON
export const IsJSON = createDecorator('isJSON')
// IsLowercase
export const IsLowercase = createDecorator('isLowercase')
// IsUppercase
export const IsUppercase = createDecorator('isUppercase')
// IsMACAddress
export const IsMACAddress = createDecorator('isMACAddress')
// IsMD5
export const IsMD5 = createDecorator('isMD5')
// IsMimeType
export const IsMimeType = createDecorator('isMimeType')
// IsMobilePhone
export const IsMobilePhone = createDecorator('isMobilePhone')
// IsMongoId
export const IsMongoId = createDecorator('isMongoId')
// IsPort
export const IsPort = createDecorator('isPort')
// IsPostalCode
export const IsPostalCode = createDecorator('isPostalCode')
// IsURL
export const IsURL = createDecorator('isURL')
// IsUUID
export const IsUUID = createDecorator('isUUID')
// IsWhitelisted
export const IsWhitelisted = createDecorator('isWhitelisted')
// Matches
export const Matches = createDecorator('matches')
