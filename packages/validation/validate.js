import validatorJs from 'validator'
import {getDecoratorContainer} from './container'

const validator = {
  DateType: function (value, meta) {
  }
}

function dataTypeTransformWithType (value, Type, meta) {
  // 数据类型一定是一个构造函数
  if (typeof Type !== 'function') {
    throw new Error(`${meta.propertyName}'s DataType parameter must be a constructor function`)
  }

  if (Type.name === 'String') {
    // 字符串类型
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value)
    } else {
      throw new Error(`${meta.propertyName} must be a string`)
    }
  } else if (Type.name === 'Number') {
    // 数值类型
    const isNumberString = typeof value === 'string' && value.match(/^[0-9]+(\.[0-9]+)?$/)
    if (typeof value === 'number' || isNumberString) {
      return Number(value)
    } else {
      throw new Error(`${meta.propertyName} must be a number`)
    }
  } else if (Type.name === 'Boolean') {
    // 布尔类型
    if (typeof value === 'boolean') {
      return value
    } else if (value === 'true' || value === 'false') {
      return value === 'true'
    } else {
      throw new Error(`${meta.propertyName} must be a boolean value`)
    }
  } else if (Type.name === 'Date') {
    // 日期类型
    console.log(typeof value)
    const val = validatorJs.toDate(value)
    if (val === null) {
      throw new Error(`${meta.propertyName} must be a Date instance`)
    } else {
      return new Date(val)
    }
  } else {
    // 未知的数据类型
    throw new Error(`Unknown ${meta.propertyName}'s DataType`)
  }
}

function dataTypeTransform (value, meta) {
  const [constraint, params] = meta.constraints
  if (!constraint) {
    throw new Error(`${meta.propertyName} must be has dataType`)
  }

  if (typeof value === 'undefined') {
    if (typeof params === 'object' && typeof params.default !== 'undefined') {
      value = params.default
    } else {
      return value
    }
  }

  if (Array.isArray(constraint)) {
    const Type = constraint[0]
    if (Array.isArray(value)) {
      return value.map(val => dataTypeTransformWithType(val, Type, meta))
    } else {
      throw new Error(`${meta.propertyName} must be an ${Type.name} Array`)
    }
  } else if (typeof constraint === 'object') {
    if (typeof value === 'object') {
      return Object.keys(constraint).map(key => {
        const val = value[key]
        const Type = constraint[key]
        return dataTypeTransformWithType(val, Type, meta)
      })
    } else {
      throw new Error(`${meta.propertyName} must be a Object`)
    }
  } else {
    return dataTypeTransformWithType(value, constraint, meta)
  }
}

function validatefly (validateMetas) {
  return validateMetas.reduce((result, item) => {
    if (!result[item.propertyName]) {
      result[item.propertyName] = {}
    }
    result[item.propertyName][item.type] = item
    return result
  }, {})
}

export default async function validate (validateClass, data) {
  const validateMetas = getDecoratorContainer(validateClass)
  const validateMetaMap = validatefly(validateMetas)

  const result = {}
  for (let key in validateMetaMap) {
    const {DataType, ...metas} = validateMetaMap[key]
    const value = dataTypeTransform(data[key], DataType)

    for (let metaType in metas) {
      const meta = metas[metaType]
      if (validator[metaType]) {
        validator[metaType](value, meta)
      }
    }
    result[key] = value
  }

  return result
}
