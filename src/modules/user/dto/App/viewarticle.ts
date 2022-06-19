import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
/**
 * 文章详情参数校验
 */
export class ViewarticleDTO {
  // 文章id
  @ApiProperty({ example: '', description: '文章id' })
  @Rule(RuleType.number().required())
  id: number;
}

/**
 * 文章详情参数校验
 */
export class AddarticlepermissionsDTO {
  // 文章id
  @ApiProperty({ example: '', description: '文章id' })
  @Rule(RuleType.number().required())
  id: number;
}

/**
 * 文章列表参数校验
 */
export class ViewarticlelistDTO {
  // 文章id
}
