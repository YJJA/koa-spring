export class Entity {
  set (props) {
    Object.keys(props).forEach(key => {
      if (this._entity[key]) {
        this[key] = props[key]
      }
    })
  }

  get () {
    return Object.keys(this._entity).reduce((result, key) => {
      result[key] = this[key]
      return result
    }, {})
  }

  toJSON () {
    return this.get()
  }
}
