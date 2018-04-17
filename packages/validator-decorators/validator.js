import validatorJs from 'validator'
const hasOwnProperty = Object.prototype.hasOwnProperty

// validator
export const validator = {
  validate (value, fun, ...argvs) {
    return fun(value, ...argvs)
  },
  isEmpty (value) {
    return this.isUndefined(value) ||
      this.isNull(value) ||
      this.isEmptyString(value) ||
      this.isEmptyArray(value) ||
      this.isEmptyObject(value)
  },
  isNotEmpty (value) {
    return !this.isEmpty(value)
  },
  isDefined (value) {
    return value !== undefined
  },
  isUndefined (value) {
    return value === undefined
  },
  isNull (value) {
    return value === null
  },
  isEquals (value, comparison) {
    return value === comparison
  },
  isNotEquals (value, comparison) {
    return value !== comparison
  },

  // array
  isArray (value) {
    return Array.isArray(value)
  },
  isEmptyArray (value) {
    return this.isArray(value) && !value.length
  },
  isIn (value, array) {
    return this.isArray(array) && array.some(v => v === value)
  },
  isNotIn (value, array) {
    return !this.isArray(array) || !array.some(v => v === value)
  },

  // string
  isString (value) {
    return typeof value === 'string'
  },
  isEmptyString (value) {
    return value === ''
  },
  toString (value) {
    return String(value)
  },
  isLength (value, min = 0, max = Number.MAX_SAFE_INTEGER) {
    if (!this.isString(value)) {
      return false
    }
    const surrogatePairs = value.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || []
    const doubleBytes = value.match(/[^\x00-\xff]/gu) || [] /* eslint no-control-regex: "off" */
    const len = value.length - surrogatePairs.length + doubleBytes.length
    return len >= min && len <= max
  },
  isMinLength (value, min) {
    return this.isLength(value, min)
  },
  isMaxLength (value, max) {
    return this.isLength(value, 0, max)
  },

  // boolean
  isBoolean (value) {
    return typeof value === 'boolean'
  },
  isBooleanString (value) {
    return value === 'true' || value === 'false'
  },
  toBoolean (value) {
    if (this.isBooleanString(value)) {
      return value === 'true'
    } else {
      return !!value
    }
  },

  // date
  isDate (value) {
    return value instanceof Date && !isNaN(value.getTime())
  },
  toDate (value) {
    if (this.isDate(value)) {
      return value
    }
    const date = Date.parse(value)
    return !isNaN(date) ? new Date(date) : null
  },
  isDateString (value) {
    return this.isString(value) && validatorJs.isISO8601(value)
  },
  isBefore (value, before = new Date()) {
    const comparison = this.toDate(before)
    const original = this.toDate(value)
    return !!(original && comparison && original < comparison)
  },
  isAfter (value, after = new Date()) {
    const comparison = this.toDate(after)
    const original = this.toDate(value)
    return !!(original && comparison && original > comparison)
  },

  // number
  isNumber (value) {
    if (value === Infinity || value === -Infinity) {
      return true
    }
    if (Number.isNaN(value)) {
      return false
    }
    return Number.isFinite(value)
  },
  toNumber (value) {
    return Number(value)
  },
  isNumberString (value) {
    return this.isString(value) && /^[-+]?[0-9]+(\.[0-9]+)?$/.test(value)
  },
  isInt (value) {
    return Number.isInteger(value)
  },
  isMin (value, min) {
    return this.isNumber(value) && this.isNumber(min) && value >= min
  },
  isMax (value, max) {
    return this.isNumber(value) && this.isNumber(max) && value <= max
  },

  // function
  isFunction (value) {
    return typeof value === 'function'
  },

  // object
  isObject (value) {
    return typeof value === 'object'
  },
  isEmptyObject (value) {
    if (!this.isObject(value)) {
      return false
    }

    for (let key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false
      }
    }
    return true
  },

  // other
  contains (value, seed) {
    return this.isString(value) && validatorJs.contains(value, seed)
  },
  isAlpha (value, locale) {
    return this.isString(value) && validatorJs.isAlpha(value, locale)
  },
  isAlphanumeric (value, locale) {
    return this.isString(value) && validatorJs.isAlphanumeric(value, locale)
  },
  isAscii (value) {
    return this.isString(value) && validatorJs.isAscii(value)
  },
  isBase64 (value) {
    return this.isString(value) && validatorJs.isBase64(value)
  },
  isCreditCard (value) {
    return this.isString(value) && validatorJs.isCreditCard(value)
  },
  isCurrency (value, options) {
    return this.isString(value) && validatorJs.isCurrency(value, options)
  },
  isDataURI (value) {
    return this.isString(value) && validatorJs.isDataURI(value)
  },
  isEmail (value) {
    return this.isString(value) && validatorJs.isEmail(value)
  },
  isHash (value, algorithm) {
    return this.isString(value) && validatorJs.isHash(value, algorithm)
  },
  isHexColor (value) {
    return this.isString(value) && validatorJs.isHexColor(value)
  },
  isHexadecimal (value) {
    return this.isString(value) && validatorJs.isHexadecimal(value)
  },
  isIP (value, version) {
    return this.isString(value) && validatorJs.isIP(value, version)
  },
  isJSON (value) {
    return this.isString(value) && validatorJs.isJSON(value)
  },
  isLowercase (value) {
    return this.isString(value) && validatorJs.isLowercase(value)
  },
  isUppercase (value) {
    return this.isString(value) && validatorJs.isUppercase(value)
  },
  isMACAddress (value) {
    return this.isString(value) && validatorJs.isMACAddress(value)
  },
  isMD5 (value) {
    return this.isString(value) && validatorJs.isMD5(value)
  },
  isMimeType (value) {
    return this.isString(value) && validatorJs.isMimeType(value)
  },
  isMobilePhone (value, locale, options) {
    return this.isString(value) && validatorJs.isMobilePhone(value, locale, options)
  },
  isMongoId (value) {
    return this.isString(value) && validatorJs.isMongoId(value)
  },
  isPort (value) {
    return this.isString(value) && validatorJs.isPort(value)
  },
  isPostalCode (value, locale) {
    return this.isString(value) && validatorJs.isPostalCode(value, locale)
  },
  isURL (value, options) {
    return this.isString(value) && validatorJs.isURL(value, options)
  },
  isUUID (value, version) {
    return this.isString(value) && validatorJs.isUUID(value, version)
  },
  isWhitelisted (value, chars) {
    return this.isString(value) && validatorJs.isWhitelisted(value, chars)
  },
  matches (value, pattern) {
    return this.isString(value) && validatorJs.matches(value, pattern)
  }
}
