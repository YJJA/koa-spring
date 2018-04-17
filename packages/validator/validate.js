import {getDecoratorContainer} from './container'
import {validator} from './validator'
import validatorMsg from './validatorMsg'

function getPropertyName (meta, parent) {
  if (parent) {
    return `${parent}.${meta.propertyName}`
  }
  return meta.propertyName
}

function validatefly (validateMetas, group) {
  return validateMetas.reduce((result, meta) => {
    if (!group || meta.always || (group && meta.groups && meta.groups.includes(group))) {
      if (!result[meta.propertyName]) {
        result[meta.propertyName] = {}
      }
      result[meta.propertyName][meta.type] = meta
    }

    return result
  }, {})
}

async function dataTypeTransformWithType (value, Type, meta, group, parent) {
  const propertyName = getPropertyName(meta, parent)

  // 数组类型
  if (validator.isArray(Type)) {
    if (Type.length) {
      if (validator.isArray(value)) {
        return value.map(val => dataTypeTransformWithType(val, Type[0], meta))
      } else {
        throw new Error(`${propertyName} must be an ${Type[0].name} Array`)
      }
    } else {
      throw new Error(`Unknown ${propertyName}'s DataType`)
    }
  }

  // 数据类型一定是一个构造函数
  if (!validator.isFunction(Type)) {
    throw new Error(`${meta.propertyName}'s DataType parameter must be a constructor function`)
  }

  switch (Type.name) {
    case 'String':
      // 1) 字符串类型
      if (validator.isString(value) || validator.isNumber(value) || validator.isBoolean(value)) {
        return validator.toString(value)
      } else {
        throw new Error(`${propertyName} must be a string`)
      }

    case 'Number':
      // 2) 数值类型
      if (validator.isNumber(value) || validator.isNumberString(value)) {
        return validator.toNumber(value)
      } else {
        throw new Error(`${propertyName} must be a number`)
      }

    case 'Boolean':
      // 3) 布尔类型
      if (validator.isBoolean(value) || validator.isBooleanString(value)) {
        return validator.toBoolean(value)
      } else {
        throw new Error(`${propertyName} must be a boolean value`)
      }

    case 'Date':
      // 4) 日期类型
      if (validator.isDate(value) || validator.isDateString(value)) {
        return validator.toDate(value)
      } else {
        throw new Error(`${propertyName} must be a Date instance`)
      }

    default:
      if (validator.isObject(value)) {
        const result = await validate(Type, value, group, propertyName)
        return result
      } else {
        throw new Error(`${propertyName} must be a ${Type.name} instance`)
      }
  }
}

async function dataTypeTransform (value, meta, group, parent) {
  const [Type, params] = meta.constraints

  if (validator.isUndefined(value)) {
    if (validator.isObject(params) && !validator.isUndefined(params.default)) {
      value = params.default
    } else {
      return value
    }
  }
  const nextValue = await dataTypeTransformWithType(value, Type, meta, group, parent)
  return nextValue
}

function validateValueByMetadata (value, meta, parent) {
  const valid = validator[meta.type](value, ...meta.constraints)
  if (!valid) {
    const message = validatorMsg.getMessage(value, meta, parent)
    throw new Error(message)
  }
}

function checkValidateIf (value, meta, data) {
  const [constraint] = meta.constraints
  if (validator.isFunction(constraint)) {
    return constraint(data)
  } else if (validator.isBoolean(constraint)) {
    return constraint
  } else {
    throw new Error('ValidateIf arg must be a function or boolean')
  }
}

export async function validate (validateClass, data, group, parent) {
  const validateMetas = getDecoratorContainer(validateClass)
  const validateMetaMap = validatefly(validateMetas, group)

  const result = {}
  for (let key in validateMetaMap) {
    const {DataType, ValidateIf, ...metas} = validateMetaMap[key]
    const value = await dataTypeTransform(data[key], DataType, group, parent)

    if (ValidateIf && checkValidateIf(value, ValidateIf, parent)) {
      for (let metaType in metas) {
        validateValueByMetadata(value, metas[metaType], parent)
      }
    }

    result[key] = value
  }

  return result
}
