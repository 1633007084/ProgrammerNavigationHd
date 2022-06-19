import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
/**
 * 新增分类参数校验
 */
export class ClassificationlistlisaddDTO {
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
  isCs: number;
  // 优先级
  @ApiProperty({ example: '', description: '优先级' })
  @Rule(RuleType.number().required())
  isPush: number;
}
/**
 * 修改分类参数校验
 */
export class ClassificationlistlismodifyDTO {
  // id
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
  isCs: number;
  // 优先级
  @ApiProperty({ example: '', description: '优先级' })
  @Rule(RuleType.number().required())
  isPush: number;
}

/**
 * 删除分类参数校验
 */
export class ClassificationlistlisdeleteDTO {
  // 分类名
  @ApiProperty({ example: '', description: '分类id' })
  @Rule(RuleType.number().required())
  id: number;
}

/**
 * 新增导航列表参数校验
 */
export class NewnavigationDTO {
  // 标题
  @ApiProperty({ example: '', description: '标题' })
  @Rule(RuleType.string().required())
  name: string;
  // 副标题
  @ApiProperty({ example: '', description: '副标题' })
  @Rule(RuleType.string().required())
  subtitle: string;
  // 图片
  @ApiProperty({ example: '', description: '图片' })
  @Rule(RuleType.string().required())
  imgurl: string;
  // 链接
  @ApiProperty({ example: '', description: '链接' })
  @Rule(RuleType.string().required())
  url: string;
  // bindingId
  @ApiProperty({ example: '', description: '要绑定分类的id' })
  @Rule(RuleType.number().required())
  bindingId: number;
  // 是否启用
  @ApiProperty({ example: '', description: '是否启用' })
  @Rule(RuleType.number().required())
  isCs: number;
  // 优先级
  @ApiProperty({ example: '', description: '优先级' })
  @Rule(RuleType.number().required())
  isPush: number;
}
/**
 * 修改导航列表参数校验
 */
export class ModifynavigationDTO {
  // id
  @ApiProperty({ example: '', description: '标题id' })
  @Rule(RuleType.number().required())
  id: number;
  // 标题
  @ApiProperty({ example: '', description: '标题' })
  @Rule(RuleType.string().required())
  name: string;
  // 副标题
  @ApiProperty({ example: '', description: '副标题' })
  @Rule(RuleType.string().required())
  subtitle: string;
  // 图片
  @ApiProperty({ example: '', description: '图片' })
  @Rule(RuleType.string().required())
  imgurl: string;
  // 链接
  @ApiProperty({ example: '', description: '链接' })
  @Rule(RuleType.string().required())
  url: string;
  // bindingId
  @ApiProperty({ example: '', description: '要绑定分类的id' })
  @Rule(RuleType.number().required())
  bindingId: number;
  // 是否启用
  @ApiProperty({ example: '', description: '是否启用' })
  @Rule(RuleType.number().required())
  isCs: number;
  // 优先级
  @ApiProperty({ example: '', description: '优先级' })
  @Rule(RuleType.number().required())
  isPush: number;
}
/**
 * 删除导航参数校验
 */
export class NavigationlistdeleteDTO {
  // 分类名
  @ApiProperty({ example: '', description: '导航id' })
  @Rule(RuleType.number().required())
  id: number;
}

/**
 * 新增自定义导航参数校验
 */
export class MynavigationaddDTO {
  @ApiProperty({ example: '', description: '用户名' })
  @Rule(RuleType.string().required())
  name: string;

  @ApiProperty({ example: '', description: '链接' })
  @Rule(RuleType.string().required())
  url: string;
  // 是否启用
  @ApiProperty({ example: '', description: '是否启用' })
  @Rule(RuleType.number().required())
  isCs: number;
  // 优先级
  @ApiProperty({ example: '', description: '优先级' })
  @Rule(RuleType.number().required())
  isPush: number;
}
/**
 * 修改自定义导航参数校验
 */
export class MynavigationmodifyDTO {
  @ApiProperty({ example: '', description: '导航id' })
  @Rule(RuleType.number().required())
  id: number;
  @ApiProperty({ example: '', description: '用户名' })
  @Rule(RuleType.string().required())
  name: string;

  @ApiProperty({ example: '', description: '链接' })
  @Rule(RuleType.string().required())
  url: string;
  // 是否启用
  @ApiProperty({ example: '', description: '是否启用' })
  @Rule(RuleType.number().required())
  isCs: number;
  // 优先级
  @ApiProperty({ example: '', description: '优先级' })
  @Rule(RuleType.number().required())
  isPush: number;
}
/**
 * 修改自定义导航参数校验
 */
export class MynavigationdeleteDTO {
  @ApiProperty({ example: '', description: '导航id' })
  @Rule(RuleType.number().required())
  id: number;
}
