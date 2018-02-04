export function string(target, key, descriptor) {
  if (!target._entity) {
    Object.defineProperty(target, '_entity', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: {}
    })
  }

  target._entity[key] = {
    type: 'string',
    value: descriptor.value
  }

  return {
    enumerable: true,
    configurable: true,
    get() {
      return this._entity[key].value
    },
    set(value) {
      if (typeof value === 'string') {
        this._entity[key] = {
          ...this._entity[key],
          value
        }
      } else {
        throw new Error('请输入字符串类型的值')
      }
    }
  }
}
