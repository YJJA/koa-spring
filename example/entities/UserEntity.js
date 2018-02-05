import {Entity, string, number, required} from '../../src'

export class UserEntity extends Entity {
  @string()
  username

  @required('types 为必填项')
  @string()
  password

  @number()
  type

  @number()
  types
}
