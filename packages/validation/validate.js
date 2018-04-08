// import validatorJs from 'validator'
import {getDecoratorContainer} from './container'

const validator = {
  DateType: function (value, meta) {
  }
}

function dataTypeTransform (value, meta) {
  const constraint = meta.constraints[0]
  if (Array.isArray(constraint) && Array.isArray(value)) {
    const straint = constraint[0]
    return value.map(val => straint(val))
  } else if (!Array.isArray(constraint)) {
    return constraint(value)
  } else {
    throw new Error(`${meta.propertyName} must be a ${constraint}`)
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
