export class Entity {
  set (props) {
    Object.keys(props).forEach(key => {
      this[key] = props[key]
    })
  }
}
