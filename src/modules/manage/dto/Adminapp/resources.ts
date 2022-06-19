import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
/**
 * 新增分类参数校验
 */
export class classificationaddDTO {
  // 分类名
  @ApiProperty({ example: '', description: '分类名' })
  @Rule(RuleType.string().required())
  name: string;
  // 分类图片
  @ApiProperty({ example: '', description: '分类图片' })
  @Rule(RuleType.string().required())
  imgurl: string;
  // 是否启用
  @ApiProperty({ example: '', description: '是否启用' })
  @Rule(RuleType.number().required())
  enablestatus: number;
  // 优先级
  @ApiProperty({ example: '', description: '优先级' })
  @Rule(RuleType.number().required())
  priority: number;
}
/**
 * 分类删除参数校验
 */
export class classificationdeleteDTO {
  @ApiProperty({ example: '', description: '分类id' })
  @Rule(RuleType.number().required())
  id: number;
}
/**
 * 分类修改参数校验
 */
export class classificationmodifyDTO {
  @ApiProperty({ example: '', description: '分类id' })
  @Rule(RuleType.number().required())
  id: number;
  // 分类名
  @ApiProperty({ example: '', description: '分类名' })
  @Rule(RuleType.string().required())
  name: string;
  // 分类图片
  @ApiProperty({ example: '', description: '分类图片' })
  @Rule(RuleType.string().required())
  imgurl: string;
  // 是否启用
  @ApiProperty({ example: '', description: '是否启用' })
  @Rule(RuleType.number().required())
  enablestatus: number;
  // 优先级
  @ApiProperty({ example: '', description: '优先级' })
  @Rule(RuleType.number().required())
  priority: number;
}
/**
 * 新增文章参数校验
 */
export class articleaddDTO {
  // 分类名
  @ApiProperty({ example: '', description: '标题' })
  @Rule(RuleType.string().required())
  name: string;
  @ApiProperty({ example: '', description: '标签' })
  @Rule(RuleType.string().required())
  label: string;
  @ApiProperty({ example: '', description: '缩图图片' })
  @Rule(RuleType.string().required())
  imgurl: string;
  @ApiProperty({ example: '', description: '简介' })
  @Rule(RuleType.string().required())
  briefintroduction: string;
  @ApiProperty({ example: '', description: '内容' })
  @Rule(RuleType.string().required())
  content: string;
  @ApiProperty({ example: '', description: '付费内容' })
  @Rule(RuleType.string().required())
  paidcontent: string;
  @ApiProperty({ example: '', description: '分类id' })
  @Rule(RuleType.number().required())
  bindingId: number;
  // 是否启用
  @ApiProperty({ example: '', description: '是否启用 0:否 1：是' })
  @Rule(RuleType.number().required())
  enablestatus: number;
  // 优先级
  @ApiProperty({ example: '', description: '优先级' })
  @Rule(RuleType.number().required())
  priority: number;
}
/**
 * 文章修改参数校验
 */
export class articlemodifyDTO {
  @ApiProperty({ example: '', description: '文章id' })
  @Rule(RuleType.number().required())
  id: number;
  // 分类名
  @ApiProperty({ example: '', description: '标题' })
  @Rule(RuleType.string().required())
  name: string;
  @ApiProperty({ example: '', description: '标签' })
  @Rule(RuleType.string().required())
  label: string;
  @ApiProperty({ example: '', description: '缩图图片' })
  @Rule(RuleType.string().required())
  imgurl: string;
  @ApiProperty({ example: '', description: '简介' })
  @Rule(RuleType.string().required())
  briefintroduction: string;
  @ApiProperty({ example: '', description: '内容' })
  @Rule(RuleType.string().required())
  content: string;
  @ApiProperty({ example: '', description: '付费内容' })
  @Rule(RuleType.string().required())
  paidcontent: string;
  @ApiProperty({ example: '', description: '分类id' })
  @Rule(RuleType.number().required())
  bindingId: number;
  // 是否启用
  @ApiProperty({ example: '', description: '是否启用 0:否 1：是' })
  @Rule(RuleType.number().required())
  enablestatus: number;
  // 优先级
  @ApiProperty({ example: '', description: '优先级' })
  @Rule(RuleType.number().required())
  priority: number;
}
/**
 * 文章删除参数校验
 */
export class articledeleteDTO {
  @ApiProperty({ example: '', description: '文章id' })
  @Rule(RuleType.number().required())
  id: number;
}

/**
 * 文章删除参数校验
 */
export class articlecheckDTO {
  @ApiProperty({ example: '', description: '文章id' })
  @Rule(RuleType.number().required())
  id: number;
}
/**
 * 新增权限参数校验
 */
export class poweraddDTO {
  // 分类名
  @ApiProperty({ example: '', description: '分类名' })
  @Rule(RuleType.string().required())
  name: string;
  @ApiProperty({ example: '', description: '分类集合数组' })
  @Rule(RuleType.array().required())
  bindingId: string;
  // 是否启用
  @ApiProperty({ example: '', description: '是否启用' })
  @Rule(RuleType.number().required())
  enablestatus: number;
  // 优先级
  @ApiProperty({ example: '', description: '优先级' })
  @Rule(RuleType.number().required())
  priority: number;
}

/**
 * 新修改权限参数校验
 */
export class powermodifyDTO {
  @ApiProperty({ example: '', description: '文章id' })
  @Rule(RuleType.number().required())
  id: number;
  // 分类名
  @ApiProperty({ example: '', description: '分类名' })
  @Rule(RuleType.string().required())
  name: string;
  @ApiProperty({ example: '', description: '分类集合数组' })
  @Rule(RuleType.array().required())
  bindingId: string;
  // 是否启用
  @ApiProperty({ example: '', description: '是否启用' })
  @Rule(RuleType.number().required())
  enablestatus: number;
  // 优先级
  @ApiProperty({ example: '', description: '优先级' })
  @Rule(RuleType.number().required())
  priority: number;
}
/**
 * 权限删除参数校验
 */
export class powerdeleteDTO {
  @ApiProperty({ example: '', description: '权限id' })
  @Rule(RuleType.number().required())
  id: number;
}
/**
 * 修改用户权限组参数校验
 */
export class resourceusermodifyDTO {
  @ApiProperty({ example: '', description: '用户id' })
  @Rule(RuleType.number().required())
  userid: number;
  @ApiProperty({ example: '', description: '权限id' })
  @Rule(RuleType.number().required())
  jurisdictionid: number;
}
/**
 * 修改用户权限组参数校验
 */
export class loginuserdataDTO {
  @ApiProperty({
    example: '',
    description: '分组id;传0是查全部，传具体分组id查这分组下文章',
  })
  @Rule(RuleType.number().required())
  flid: number;
}
