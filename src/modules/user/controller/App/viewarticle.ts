import { Provide, Body, Inject, Post } from '@midwayjs/decorator';
import { CoolController, BaseController, CoolEps } from '@cool-midway/core';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { ApiBearerAuth, ApiBody, ApiTags } from '@midwayjs/swagger';
import {
  AddarticlepermissionsDTO,
  ViewarticleDTO,
  ViewarticlelistDTO,
} from '../../dto/App/viewarticle';
import { ViewarticleService } from '../../service/App/viewarticle';

/**
 * 不需要登录的后台接口
 */
@Provide()
@ApiTags([' 小程序文章模块'])
@CoolController()
export class UserViewarticleController extends BaseController {
  @Inject()
  ViewarticleService: ViewarticleService;
  @Inject()
  ctx: Context;

  @Inject()
  eps: CoolEps;

  /**
   * 小程序文章详情
   * @param Viewarticlelist
   */
  @Post('/Viewarticlelist', { summary: '文章详情' })
  @ApiBearerAuth()
  @ApiBody({ description: '请求参数例子' })
  @Validate()
  async Viewarticlelist(@Body() Viewarticlelist: ViewarticlelistDTO) {
    console.log('/Viewarticlelist', '文章详情');
    return this.ok(
      await this.ViewarticleService.Viewarticlelist(Viewarticlelist)
    );
  }
  /**
   * 小程序文章详情
   * @param Viewarticle
   */
  @Post('/Viewarticle', { summary: '文章详情' })
  @ApiBearerAuth()
  @ApiBody({ description: '请求参数例子' })
  @Validate()
  async Viewarticle(@Body() Viewarticle: ViewarticleDTO) {
    console.log('/Viewarticle', '文章详情');
    return this.ok(await this.ViewarticleService.Viewarticle(Viewarticle));
  }
  /**
   * 为用户添加文章权限
   * @param Addarticlepermissions
   */
  @Post('/Addarticlepermissions', { summary: '为用户添加文章权限' })
  @ApiBearerAuth()
  @ApiBody({ description: '请求参数例子' })
  @Validate()
  async Addarticlepermissions(
    @Body() Addarticlepermissions: AddarticlepermissionsDTO
  ) {
    console.log('/Addarticlepermissions', '为用户添加文章权限');
    return this.ok(
      await this.ViewarticleService.Addarticlepermissions(Addarticlepermissions)
    );
  }
}
