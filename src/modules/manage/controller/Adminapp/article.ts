import { Provide, Body, Inject, Post } from '@midwayjs/decorator';
import { CoolController, BaseController, CoolEps } from '@cool-midway/core';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { ApiBearerAuth, ApiBody, ApiTags } from '@midwayjs/swagger';
import { ArticledetailsDTO } from '../../dto/Adminapp/article';
import { ArticleService } from '../../service/Admin/article';
import { ManageUserArticleEntity } from '../../entity/user/article';

/**
 * 不需要登录的后台接口
 */
@Provide()
@ApiTags(['pc文章模块'])
@CoolController()
export class ManageRticleController extends BaseController {
  @Inject()
  ArticleService: ArticleService;

  @Inject()
  ManageUserArticleEntity: ManageUserArticleEntity;

  @Inject()
  ctx: Context;

  @Inject()
  eps: CoolEps;

  /**
   * 文章详情
   * @param articledetails
   */
  @Post('/articledetails', { summary: '文章详情' })
  @ApiBearerAuth()
  @ApiBody({ description: '请求参数例子' })
  @Validate()
  async articledetails(@Body() articledetails: ArticledetailsDTO) {
    console.log('/articledetails', '文章详情');
    return this.ok(await this.ArticleService.articledetails(articledetails));
  }
}
