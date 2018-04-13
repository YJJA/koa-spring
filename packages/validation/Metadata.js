/** @module metadata */

/**
 * other options
 * @typedef {Object} Options
 * @property {string[]} groups - attribute group
 * @property {string} message - error message
 */

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
   * @param {Object} argv argv
   * @param {Class} argv.target defined validate class
   * @param {string} argv.propertyName defind validate class propertyName
   * @param {string} argv.type validate method type
   * @param {Array} argv.constraints validate method argvs
   * @param {Options} argv.options other options
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
