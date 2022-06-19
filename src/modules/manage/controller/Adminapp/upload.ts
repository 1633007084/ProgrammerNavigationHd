import { Provide, Inject, Post, Files } from '@midwayjs/decorator';
import { CoolController, BaseController, CoolEps } from '@cool-midway/core';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import {
  ApiBearerAuth,
  ApiBody,
  ApiProperty,
  ApiTags,
} from '@midwayjs/swagger';
// import { ManageUserArticleEntity } from '../../entity/user/article';
import { UploadService } from '../../service/Admin/upload';
// import { format } from '@midwayjs/logger';

/**
 * 不需要登录的后台接口
 */
@Provide()
@ApiTags(['pc上传模块'])
@CoolController()
export class ManageUploadController extends BaseController {
  @Inject()
  UploadService: UploadService;

  @Inject()
  ctx: Context;

  @Inject()
  eps: CoolEps;

  /**
   * 上传图片
   * @param upload
   */
  @Post('/upload', { summary: '上传图片' })
  @ApiBearerAuth()
  @ApiProperty({
    type: 'string',
    format: 'file',
    description: '图片',
  })
  @ApiBody({ description: '请求参数例子' })
  @Validate()
  async upload(@Files() files) {
    console.log('/upload', '上传图片');
    return this.ok(await this.UploadService.upload(files));
  }
  /**
   * 上传多图片
   * @param uploads
   */
  @Post('/uploads', { summary: '上传多图片' })
  @ApiBearerAuth()
  @ApiProperty({
    type: 'string',
    format: 'file',
    description: '图片',
  })
  @ApiBody({ description: '请求参数例子' })
  @Validate()
  async uploads(@Files() files) {
    console.log('/uploads', '上传图片');
    return this.ok(await this.UploadService.uploads(files));
  }
}
