import {DataType, IsNotEmpty, ValidateIf, Validate, IsLength} from '../decorators'
import {validate} from '../validate'

test('decorators test', () => {
  class User {
    @IsNotEmpty({
      message: '用户名不能为空'
    })
    @IsLength(0, 14, {
      message: '用户不名的长度必须大于$constraint1个字节，且小于$constraint2个字节'
    })
    @ValidateIf(true)
    @Validate((v, f) => f, true, {
      message: '用户名不能为空'
    })
    @DataType(String)
    name
  }

  class Post {
    @DataType(User)
    user
  }

  validate(Post, {
    user: {
      name: 'username'
    }
  }).then(data => {
    console.log(data)
  }).catch(err => {
    console.log(err)
  })
})
