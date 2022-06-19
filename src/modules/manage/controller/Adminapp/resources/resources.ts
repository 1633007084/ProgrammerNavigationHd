import { Provide, Body, Inject, Post } from '@midwayjs/decorator';
import { CoolController, BaseController, CoolEps } from '@cool-midway/core';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { ApiBearerAuth, ApiBody, ApiTags } from "@midwayjs/swagger";
import { resourcesService } from '../../../service/Admin/resources/resources';
import {
  articleaddDTO,
  articlecheckDTO,
  articledeleteDTO,
  articlemodifyDTO,
  classificationaddDTO,
  classificationdeleteDTO,
  classificationmodifyDTO,
  loginuserdataDTO,
  poweraddDTO,
  powerdeleteDTO,
  powermodifyDTO,
  resourceusermodifyDTO,
} from '../../../dto/Adminapp/resources';

@Provide()
@ApiTags(['pc资源系列接口'])
@CoolController()
export class ManageRticleController extends BaseController {
  @Inject()
  resourcesService: resourcesService;
  @Inject()
  ctx: Context;

  @Inject()
  eps: CoolEps;

  /**
   * 分类列表
   * @param classificationlist
   */
  @Post('/classificationlist', { summary: '资源分类列表' })
  @ApiBearerAuth()
  @ApiBody({ description: '资源分类列表请求参数例子' })
  @Validate()
  async classificationlist(@Body() classificationlist) {
    console.log('/classificationlist', '资源分类列表');
    return this.ok(
      await this.resourcesService.classificationlist(classificationlist)
    );
  }
  /**
   * 分类新增
   * @param classificationadd
   */
  @Post('/classificationadd', { summary: '分类新增' })
  @ApiBearerAuth()
  @ApiBody({ description: '分类新增请求参数例子' })
  @Validate()
  async classificationadd(@Body() classificationadd: classificationaddDTO) {
    console.log('/classificationadd', '分类新增');
    return this.ok(
      await this.resourcesService.classificationadd(classificationadd)
    );
  }
  /**
   * 分类删除
   * @param classificationdelete
   */
  @Post('/classificationdelete', { summary: '分类删除' })
  @ApiBearerAuth()
  @ApiBody({ description: '分类删除请求参数例子' })
  @Validate()
  async classificationdelete(
    @Body() classificationdelete: classificationdeleteDTO
  ) {
    console.log('/classificationdelete', '分类删除');
    return this.ok(
      await this.resourcesService.classificationdelete(classificationdelete)
    );
  }
  /**
   * 分类修改
   * @param classificationmodify
   */
  @Post('/classificationmodify', { summary: '分类修改' })
  @ApiBearerAuth()
  @ApiBody({ description: '分类修改请求参数例子' })
  @Validate()
  async classificationmodify(
    @Body() classificationmodify: classificationmodifyDTO
  ) {
    console.log('/classificationmodify', '分类修改');
    return this.ok(
      await this.resourcesService.classificationmodify(classificationmodify)
    );
  }
  /**
   * 文章列表
   * @param articlelist
   */
  @Post('/articlelist', { summary: '文章列表' })
  @ApiBearerAuth()
  @ApiBody({ description: '文章列表请求参数例子' })
  @Validate()
  async articlelist(@Body() articlelist) {
    console.log('/articlelist', '分类修改');
    return this.ok(await this.resourcesService.articlelist(articlelist));
  }
  /**
   * 文章新增
   * @param articleadd
   */
  @Post('/articleadd', { summary: '文章新增' })
  @ApiBearerAuth()
  @ApiBody({ description: '文章新增请求参数例子' })
  @Validate()
  async articleadd(@Body() articleadd: articleaddDTO) {
    console.log('/articleadd', '文章新增');
    return this.ok(await this.resourcesService.articleadd(articleadd));
  }
  /**
   * 根据文章id查询文章详情
   * @param articlecheck
   */
  @Post('/articlecheck', { summary: '根据文章id查询文章详情' })
  @ApiBearerAuth()
  @ApiBody({ description: '根据文章id查询文章详情请求参数例子' })
  @Validate()
  async articlecheck(@Body() articlecheck: articlecheckDTO) {
    console.log('/articleadd', '根据文章id查询文章详情');
    return this.ok(await this.resourcesService.articlecheck(articlecheck));
  }
  /**
   * 文章修改
   * @param articlemodify
   */
  @Post('/articlemodify', { summary: '文章修改' })
  @ApiBearerAuth()
  @ApiBody({ description: '文章修改请求参数例子' })
  @Validate()
  async articlemodify(@Body() articlemodify: articlemodifyDTO) {
    console.log('/articlemodify', '文章修改');
    return this.ok(await this.resourcesService.articlemodify(articlemodify));
  }
  /**
   * 文章删除
   * @param articledelete
   */
  @Post('/articledelete', { summary: '文章删除' })
  @ApiBearerAuth()
  @ApiBody({ description: '文章删除请求参数例子' })
  @Validate()
  async articledelete(@Body() articledelete: articledeleteDTO) {
    console.log('/articledelete', '文章删除');
    return this.ok(await this.resourcesService.articledelete(articledelete));
  }
  /**
   * 权限列表
   * @param powerlist
   */
  @Post('/powerlist', { summary: '权限列表' })
  @ApiBearerAuth()
  @ApiBody({ description: '权限列表请求参数例子' })
  @Validate()
  async powerlist(@Body() powerlist) {
    console.log('/powerlist', '权限列表');
    return this.ok(await this.resourcesService.powerlist(powerlist));
  }
  /**
   * 新增权限
   * @param poweradd
   */
  @Post('/poweradd', { summary: '权限列表' })
  @ApiBearerAuth()
  @ApiBody({ description: '权限列表请求参数例子' })
  @Validate()
  async poweradd(@Body() poweradd: poweraddDTO) {
    console.log('/poweradd', '权限列表');
    return this.ok(await this.resourcesService.poweradd(poweradd));
  }
  /**
   * 修改权限
   * @param powermodify
   */
  @Post('/powermodify', { summary: '修改权限' })
  @ApiBearerAuth()
  @ApiBody({ description: '修改权限请求参数例子' })
  @Validate()
  async powermodify(@Body() powermodify: powermodifyDTO) {
    console.log('/powermodify', '权限列表');
    return this.ok(await this.resourcesService.powermodify(powermodify));
  }
  /**
   * 删除权限
   * @param powerdelete
   */
  @Post('/powerdelete', { summary: '删除权限' })
  @ApiBearerAuth()
  @ApiBody({ description: '删除权限请求参数例子' })
  @Validate()
  async powerdelete(@Body() powerdelete: powerdeleteDTO) {
    console.log('/powermodify', '删除权限');
    return this.ok(await this.resourcesService.powerdelete(powerdelete));
  }
  /**
   * 用户列表
   * @param resourceuserlist
   */
  @Post('/resourceuserlist', { summary: ' 用户列表' })
  @ApiBearerAuth()
  @ApiBody({ description: ' 用户列表请求参数例子' })
  @Validate()
  async resourceuserlist(@Body() resourceuserlist) {
    console.log('/resourceuser', '权限列表');
    return this.ok(
      await this.resourcesService.resourceuserlist(resourceuserlist)
    );
  }
  /**
   * 用户修改分类权限组
   * @param resourceusermodify
   */
  @Post('/resourceusermodify', { summary: ' 用户修改分类权限组' })
  @ApiBearerAuth()
  @ApiBody({ description: ' 用户修改分类权限组请求参数例子' })
  @Validate()
  async resourceusermodify(@Body() resourceusermodify: resourceusermodifyDTO) {
    console.log('/resourceusermodify', '用户修改分类权限组');
    return this.ok(
      await this.resourcesService.resourceusermodify(resourceusermodify)
    );
  }
  /**
   * 获取当前登录用户分类文章数据
   * @param loginuserdata
   */
  @Post('/loginuserdata', { summary: ' 获取当前登录用户分类文章数据' })
  @ApiBearerAuth()
  @ApiBody({ description: ' 获取当前登录用户分类文章数据请求参数例子' })
  @Validate()
  async loginuserdata(@Body() loginuserdata: loginuserdataDTO) {
    console.log('/loginuserdata', '获取当前登录用户分类数据');
    return this.ok(await this.resourcesService.loginuserdata(loginuserdata));
  }
  /**
   * 获取当前登录用户分类信息
   * @param loginuserfl
   */
  @Post('/loginuserfl', { summary: ' 获取当前登录用户分类信息' })
  @ApiBearerAuth()
  @ApiBody({ description: ' 获取当前登录用户分类信息请求参数例子' })
  @Validate()
  async loginuserfl(@Body() loginuserfl) {
    console.log('/loginuserfl', '获取当前登录用户分类信息');
    return this.ok(await this.resourcesService.loginuserfl(loginuserfl));
  }
  /**
   * 底部
   */
}
