import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
/**
 * 文章详情参数校验
 */
export class ArticledetailsDTO {
  // 修改还是新增
  @ApiProperty({ example: '', description: '修改还是新增' })
  @Rule(RuleType.number().required())
  alter: number;
  // id
  @ApiProperty({ example: '', description: 'id' })
  @Rule(RuleType.number().allow(''))
  id: number;

  // 类型
  @ApiProperty({ example: '', description: '类型' })
  @Rule(RuleType.number().required())
  type: number;

  // 发布人
  @ApiProperty({ example: '', description: '发布人' })
  @Rule(RuleType.string().allow(''))
  name: string;

  // 标题
  @ApiProperty({ example: '', description: '标题' })
  @Rule(RuleType.string().required())
  heading: string;

  // 副标题
  @ApiProperty({ example: '', description: '副标题' })
  @Rule(RuleType.string().allow(''))
  subheading: string;

  // 内容
  @ApiProperty({ example: '', description: '内容' })
  @Rule(RuleType.string().allow(''))
  content: string;

  // 付费内容
  @ApiProperty({ example: '', description: '付费内容' })
  @Rule(RuleType.string().allow(''))
  paidcontent: string;

  // 查看付费等级
  @ApiProperty({ example: '', description: '查看付费等级' })
  @Rule(RuleType.string().required())
  paymentLevel: string;

  // 头像
  @ApiProperty({ example: '', description: '头像' })
  @Rule(RuleType.string().allow(''))
  headImg: string;

  // 状态 0:禁用 1：启用
  @ApiProperty({ example: '', description: '查看付费等级' })
  @Rule(RuleType.string().required())
  status: string;
}
