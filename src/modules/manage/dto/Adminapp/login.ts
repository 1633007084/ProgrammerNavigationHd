import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
/**
 * 登录参数校验
 */
export class LogintDTO {
  // 用户名
  @ApiProperty({ example: 'admin', description: '用户名' })
  @Rule(RuleType.string().required())
  account: string;
  // 密码
  @ApiProperty({ example: '123456', description: '密码' })
  @Rule(RuleType.string().required())
  password: string;
}
/**
 * 注册参数校验
 */
export class registerDTO {
  // 昵称
  @ApiProperty({ example: '', description: '昵称' })
  @Rule(RuleType.string().required())
  name: string;
  // 用户名
  @ApiProperty({ example: '', description: '用户名' })
  @Rule(RuleType.string().required())
  account: string;
  // 密码
  @ApiProperty({ example: '', description: '密码' })
  @Rule(RuleType.string().required())
  password: string;

  // 重复密码
  @ApiProperty({ example: '', description: '重复密码' })
  @Rule(RuleType.string().required())
  passwordtwo: string;
}

/**
 * 登录参数校验
 */
export class jurisdictionmodifyDTO {
  // 用户名
  @ApiProperty({ example: '', description: '权限名数组' })
  @Rule(RuleType.number().required())
  userId: number;
  @ApiProperty({ example: '', description: '权限名数组' })
  @Rule(RuleType.array().required())
  id: string;
}

/**
 * 用户删除参数校验
 */
export class deletememberDTO {
  // 用户名

  @ApiProperty({ example: '', description: '用户id' })
  @Rule(RuleType.number().required())
  id: number;
}
/**
 * 用户修改参数校验
 */
export class usermodificationDTO {
  // 用户名

  @ApiProperty({ example: '', description: '用户id' })
  @Rule(RuleType.number().required())
  id: number;
  // 昵称
  @ApiProperty({ example: '', description: '昵称' })
  @Rule(RuleType.string().required())
  name: string;
  // 用户名
  @ApiProperty({ example: '', description: '用户名' })
  @Rule(RuleType.string().required())
  account: string;
  // 密码
  @ApiProperty({ example: '', description: '密码' })
  @Rule(RuleType.string().required())
  password: string;

  // 重复密码
  @ApiProperty({ example: '', description: '重复密码' })
  @Rule(RuleType.string().required())
  passwordtwo: string;
}
