import {DataType, IsNotEmpty} from '@koaspring/validator'

// user params
export class UserParamsDto {
  @DataType(Number)
  id
}

// user body
export class UserBodyDto {
  @IsNotEmpty()
  @DataType(String)
  username

  @IsNotEmpty()
  @DataType(String)
  password
}
