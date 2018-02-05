// defaultSetter
export function defaultSetter (key) {
  return function (newValue) {
    Object.defineProperty(this, key, {
      configurable: true,
      writable: true,
      // IS enumerable when reassigned by the outside word
      enumerable: true,
      value: newValue
    })

    return newValue
  }
}

// defaultGetter
export function defaultGetter (key) {
  return function () {
    const descriptor = Object.getOwnPropertyDescriptor(this, key)
    return descriptor ? descriptor.value : descriptor
  }
}
