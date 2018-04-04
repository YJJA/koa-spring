// Metadata
export default class Metadata {
  // target
  target

  // property
  propertyName

  // 较验方法
  type

  constraints

  // message
  message

  // groups
  groups = []

  constructor (argv) {
    this.target = argv.target
    this.propertyName = argv.propertyName
    this.type = argv.type
    this.constraints = argv.constraints
    if (argv.options) {
      this.message = argv.options.message
      this.groups = argv.options.groups
    }
  }
}
