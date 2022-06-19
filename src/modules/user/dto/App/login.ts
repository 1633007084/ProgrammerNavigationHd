import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
/**
 * 登录参数校验
 */
export class DyLogintDTO {
  // code
  @ApiProperty({ example: '', description: '临时登录凭证' })
  @Rule(RuleType.string().required())
  code: string;
  // 用于标识当前设备
  @ApiProperty({ example: '', description: '用于标识当前设备' })
  @Rule(RuleType.string().required())
  anonymousCode: string;
}
