
/**
 * data validation metadata class
 * @class
 */
class Metadata {
  /**
   * target
   */
  target

  /**
   * propertyName
   */
  propertyName

  /**
   * validate method type
   */
  type

  /**
   * validate method params
   */
  constraints

  /**
   * validate error message
   */
  message

  /**
   * property group
   */
  groups = []

  /**
   * always
   */
  always = false

  /**
   * create a metadata
   */
  constructor (argv) {
    this.target = argv.target
    this.propertyName = argv.propertyName
    this.type = argv.type
    this.constraints = argv.constraints || []
    if (argv.options) {
      this.groups = argv.options.groups || []
      this.message = argv.options.message
      this.always = argv.options.always
    }
  }
}

export default Metadata
