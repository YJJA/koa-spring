// Metadata
export class Metadata {
  // target
  target

  // property
  propertyName

  // 数据类型默认为 string
  type = 'string'

  // message
  message = ''

  // groups
  groups = []

  // 遍历
  each = false

  // 规则
  rules = []

  constructor (target, propertyName) {
    this.target = target
    this.propertyName = propertyName
  }

  update ({type, message, each, groups, rule}) {
    if (typeof type === 'string') {
      this.type = type
    }

    if (typeof message === 'string') {
      this.message = message
    }

    if (typeof each === 'boolean') {
      this.each = each
    }

    if (Array.isArray(groups)) {
      this.groups = groups
    }

    if (typeof rule === 'object') {
      this.rules.push(rule)
    }
  }
}
