import { Provide, Body, Inject, Post } from '@midwayjs/decorator';
import { CoolController, BaseController, CoolEps } from '@cool-midway/core';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { ApiBearerAuth, ApiBody, ApiTags } from '@midwayjs/swagger';
import { CheckclassificationService } from '../../../service/Admin/home/checkclassification';
import {
  ClassificationlistlisaddDTO,
  ClassificationlistlisdeleteDTO,
  ClassificationlistlismodifyDTO,
  ModifynavigationDTO,
  MynavigationaddDTO,
  MynavigationdeleteDTO,
  MynavigationmodifyDTO,
  NavigationlistdeleteDTO,
  NewnavigationDTO,
} from '../../../dto/Adminapp/classificationlistlis';

/**
 * 不需要登录的后台接口
 */
@Provide()
@ApiTags(['pc分类列表'])
@CoolController()
export class ManageRticleController extends BaseController {
  @Inject()
  CheckclassificationService: CheckclassificationService;
  @Inject()
  ctx: Context;

  @Inject()
  eps: CoolEps;

  /**
   * 导航分类列表
   * @param checkclassificationlis
   */
  @Post('/checkclassificationlis', { summary: '导航分类列表免鉴权' })
  @ApiBearerAuth()
  @ApiBody({ description: '导航分类列表免鉴权请求参数例子' })
  @Validate()
  async checkclassificationlis(@Body() checkclassificationlis) {
    console.log('/checkclassificationlis', '导航分类列表');
    return this.ok(
      await this.CheckclassificationService.checkclassificationlis(
        checkclassificationlis
      )
    );
  }
  /**
   * 分类列表
   * @param classificationlistlis
   */
  @Post('/classificationlistlis', { summary: '分类列表' })
  @ApiBearerAuth()
  @ApiBody({ description: '分类列表请求参数例子' })
  @Validate()
  async classificationlistlis(@Body() checkclassificationlis) {
    console.log('/classificationlistlis', '分类列表');
    return this.ok(
      await this.CheckclassificationService.classificationlistlis(
        checkclassificationlis
      )
    );
  }
  /**
   * 分类列表新增
   * @param classificationlistlisadd
   */
  @Post('/classificationlistlisadd', { summary: '分类列表新增' })
  @ApiBearerAuth()
  @ApiBody({ description: '分类列表新增请求参数例子' })
  @Validate()
  async classificationlistlisadd(
    @Body() classificationlistlisadd: ClassificationlistlisaddDTO
  ) {
    console.log('/classificationlistlisadd', '分类列表');
    return this.ok(
      await this.CheckclassificationService.classificationlistlisadd(
        classificationlistlisadd
      )
    );
  }
  /**
   * 分类列表修改
   * @param classificationlistlismodify
   */
  @Post('/classificationlistlismodify', { summary: '分类列表修改' })
  @ApiBearerAuth()
  @ApiBody({ description: '分类列表修改请求参数例子' })
  @Validate()
  async classificationlistlismodify(
    @Body() classificationlistlismodify: ClassificationlistlismodifyDTO
  ) {
    console.log('/classificationlistlismodify', '分类列表');
    return this.ok(
      await this.CheckclassificationService.classificationlistlismodify(
        classificationlistlismodify
      )
    );
  }
  /**
   * 分类列表删除
   * @param classificationlistlisdelete
   */
  @Post('/classificationlistlisdelete', { summary: '分类列表删除' })
  @ApiBearerAuth()
  @ApiBody({ description: '分类列表删除请求参数例子' })
  @Validate()
  async classificationlistlisdelete(
    @Body() classificationlistlisdelete: ClassificationlistlisdeleteDTO
  ) {
    console.log('/classificationlistlisdelete', '分类列表');
    return this.ok(
      await this.CheckclassificationService.classificationlistlisdelete(
        classificationlistlisdelete
      )
    );
  }
  /**
   * 导航列表
   *
   * @param navigationlist
   */
  @Post('/navigationlist', { summary: '导航列表' })
  @ApiBearerAuth()
  @ApiBody({ description: '导航列表请求参数例子' })
  @Validate()
  async navigationlist(@Body() checkclassificationlis) {
    console.log('/navigationlist', '导航列表');
    return this.ok(
      await this.CheckclassificationService.navigationlist(
        checkclassificationlis
      )
    );
  }
  /**
   * 导航列表删除
   * @param navigationlistdelete
   */
  @Post('/navigationlistdelete', { summary: '导航列表删除' })
  @ApiBearerAuth()
  @ApiBody({ description: '导航列表删除请求参数例子' })
  @Validate()
  async navigationlistdelete(
    @Body() navigationlistdelete: NavigationlistdeleteDTO
  ) {
    console.log('/navigationlistdelete', '导航列表删除');
    return this.ok(
      await this.CheckclassificationService.navigationlistdelete(
        navigationlistdelete
      )
    );
  }
  /**
   * 导航列表新增
   * @param newnavigation
   */
  @Post('/newnavigation', { summary: '导航列表新增' })
  @ApiBearerAuth()
  @ApiBody({ description: '导航列表新增请求参数例子' })
  @Validate()
  async newnavigation(@Body() newnavigation: NewnavigationDTO) {
    console.log('/newnavigation', '导航列表新增');
    return this.ok(
      await this.CheckclassificationService.newnavigation(newnavigation)
    );
  }
  /**
   * 导航列表修改
   * @param  modifynavigation
   */
  @Post('/modifynavigation', { summary: '导航列表修改' })
  @ApiBearerAuth()
  @ApiBody({ description: '导航列表修改请求参数例子' })
  @Validate()
  async modifynavigation(@Body() modifynavigation: ModifynavigationDTO) {
    console.log('/modifynavigation', '导航列表修改');
    return this.ok(
      await this.CheckclassificationService.modifynavigation(modifynavigation)
    );
  }
  /**
   * 获取音乐列表
   * @param  musilist
   */
  @Post('/musilist', { summary: '获取音乐列表' })
  @ApiBearerAuth()
  @ApiBody({ description: '获取音乐列表请求参数例子' })
  @Validate()
  async musilist(@Body() musilist) {
    console.log('/musilist', '获取音乐列表');
    return this.ok(await this.CheckclassificationService.musilist(musilist));
  }
  /**
   * 获取csdn列表
   * @param  csdnlist
   */
  @Post('/csdnlist', { summary: '获取csdn列表' })
  @ApiBearerAuth()
  @ApiBody({ description: '获取csdn列表请求参数例子' })
  @Validate()
  async csdnlist(@Body() csdnlist) {
    console.log('/csdnlist', '获取csdn列表');
    return this.ok(await this.CheckclassificationService.csdnlist(csdnlist));
  }
  /**
   * 获取微博列表
   * @param  wblist
   */
  @Post('/wblist', { summary: '获取微博列表' })
  @ApiBearerAuth()
  @ApiBody({ description: '获取微博列表请求参数例子' })
  @Validate()
  async wblist(@Body() wblist) {
    console.log('/wblist', '获取微博列表');
    return this.ok(await this.CheckclassificationService.wblist(wblist));
  }
  /**
   * 获取百度列表
   * @param  bdlist
   */
  @Post('/bdlist', { summary: '获取百度列表' })
  @ApiBearerAuth()
  @ApiBody({ description: '获取百度请求参数例子' })
  @Validate()
  async bdlist(@Body() bdlist) {
    console.log('/bdlist', '获取百度列表');
    return this.ok(await this.CheckclassificationService.bdlist(bdlist));
  }
  /**
   * 获取自定义导航列表
   * @param  mynavigationlist
   */
  @Post('/mynavigationlist', { summary: '获取自定义导航列表' })
  @ApiBearerAuth()
  @ApiBody({ description: '获取自定义导航列表' })
  @Validate()
  async mynavigationlist(@Body() mynavigationlist) {
    console.log('/mynavigationlist', '获取自定义导航列表');
    return this.ok(
      await this.CheckclassificationService.mynavigationlist(mynavigationlist)
    );
  }
  /**
   *新增自定义导航列表
   * @param  mynavigationadd
   */
  @Post('/mynavigationadd', { summary: '新增自定义导航列表' })
  @ApiBearerAuth()
  @ApiBody({ description: '新增自定义导航列表' })
  @Validate()
  async mynavigationadd(@Body() mynavigationadd: MynavigationaddDTO) {
    console.log('/mynavigationadd', '新增自定义导航列表');
    return this.ok(
      await this.CheckclassificationService.mynavigationadd(mynavigationadd)
    );
  }
  /**
   *修改自定义导航列表
   * @param  mynavigationmodify
   */
  @Post('/mynavigationmodify', { summary: '修改自定义导航列表' })
  @ApiBearerAuth()
  @ApiBody({ description: '修改自定义导航列表' })
  @Validate()
  async mynavigationmodify(@Body() mynavigationmodify: MynavigationmodifyDTO) {
    console.log('/mynavigationmodify', '修改自定义导航列表');
    return this.ok(
      await this.CheckclassificationService.mynavigationmodify(
        mynavigationmodify
      )
    );
  }
  /**
   *删除自定义导航列表
   * @param  mynavigationdelete
   */
  @Post('/mynavigationdelete', { summary: '修改自定义导航列表' })
  @ApiBearerAuth()
  @ApiBody({ description: '修改自定义导航列表' })
  @Validate()
  async mynavigationdelete(@Body() mynavigationdelete: MynavigationdeleteDTO) {
    console.log('/mynavigationdelete', '修改自定义导航列表');
    return this.ok(
      await this.CheckclassificationService.mynavigationdelete(
        mynavigationdelete
      )
    );
  }
}
