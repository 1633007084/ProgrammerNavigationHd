// import { Controller } from '@midwayjs/decorator';
import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
/**
 * 登录参数校验
 */

export class UpdateuserDTO {
  // 地区
  @ApiProperty({ example: '', description: '地区' })
  @Rule(RuleType.string().required())
  region: string;
  // 名字
  @ApiProperty({ example: '', description: '名字' })
  @Rule(RuleType.string().required())
  nickName: string;
  // 头像
  @ApiProperty({ example: '', description: '头像' })
  @Rule(RuleType.string().required())
  headImg: string;
}
