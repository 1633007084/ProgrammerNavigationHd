import { Provide, Body, Inject, Post } from '@midwayjs/decorator';
import { CoolController, BaseController, CoolEps } from '@cool-midway/core';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { ApiBearerAuth, ApiBody, ApiTags } from '@midwayjs/swagger';
import { UserService } from '../../service/App/open';
import { DyLogintDTO } from '../../dto/App/login';
import { UpdateuserDTO } from '../../dto/App/updateuser';

/**
 * 不需要登录的后台接口
 */
@Provide()
@ApiTags(['小程序用户模块'])
@CoolController()
export class UserOpenController extends BaseController {
  @Inject()
  UserService: UserService;

  @Inject()
  ctx: Context;

  @Inject()
  eps: CoolEps;

  /**
   * 登录
   * @param login
   */
  @Post('/dylogin', { summary: '抖音登录' })
  @ApiBody({ description: '请求参数例子' })
  @Validate()
  async login(@Body() dylogin: DyLogintDTO) {
    console.log('/dylogin', '抖音登录');
    return this.ok(await this.UserService.login(dylogin));
  }
  /**
   * 更新用户信息
   * @param updateuser
   */
  @Post('/updateuser', { summary: '抖音更新用户信息' })
  @ApiBearerAuth()
  @ApiBody({
    description: '请求参数例子',
  })
  @Validate()
  async updateuser(@Body() updateuser: UpdateuserDTO) {
    console.log('/updateuser', '抖音登录');
    return this.ok(await this.UserService.updateuser(updateuser));
  }
}
