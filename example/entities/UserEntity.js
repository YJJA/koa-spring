import {Entity, string} from '../../src'

export class UserEntity extends Entity {
  @string
  username

  @string
  password
}
