import { Provide, Get, Body, Query, Inject, Post } from '@midwayjs/decorator';
import { CoolController, BaseController, CoolEps } from '@cool-midway/core';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { ManageService } from '../../service/Admin/open';
import {
  deletememberDTO,
  jurisdictionmodifyDTO,
  LogintDTO,
  registerDTO,
  usermodificationDTO,
} from '../../dto/Adminapp/login';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@midwayjs/swagger';

/**
 * 不需要登录的后台接口
 */
@Provide()
@ApiTags(['用户模块'])
@CoolController()
export class BaseOpenController extends BaseController {
  @Inject()
  ManageService: ManageService;

  @Inject()
  ctx: Context;

  @Inject()
  eps: CoolEps;

  /**
   * 登录
   * @param login
   */
  @Post('/login', { summary: '登录' })
  @ApiBody({ description: '请求参数例子' })
  @Validate()
  async login(@Body() login: LogintDTO) {
    console.log('/login', '登录');
    return this.ok(await this.ManageService.login(login));
  }
  /**
   * 注册
   * @param register
   */
  @Post('/register', { summary: '注册' })
  @ApiBody({ description: '请求参数例子' })
  @ApiBearerAuth()
  @Validate()
  async register(@Body() register: registerDTO) {
    console.log('/register', '注册');
    return this.ok(await this.ManageService.register(register));
  }
  /**
   * 权限
   * @param jurisdiction
   */
  @Get('/jurisdiction', { summary: '获取权限' })
  @ApiQuery({ description: '获取权限请求参数例子' })
  @ApiBearerAuth()
  @Validate()
  async jurisdiction(@Query('account') account: string) {
    console.log('/jurisdiction', '权限');
    return this.ok(await this.ManageService.jurisdiction(account));
  }
  /**
   * 修改权限
   * @param jurisdictionmodify
   */
  @Post('/jurisdictionmodify', { summary: '修改权限' })
  @ApiBody({
    description: ' id(权限数组), userId（用户id）修改权限请求参数例子',
  })
  @ApiBearerAuth()
  @Validate()
  async jurisdictionmodify(@Body() jurisdictionmodify: jurisdictionmodifyDTO) {
    console.log('/jurisdictionmodify', '修改权限');
    return this.ok(
      await this.ManageService.jurisdictionmodify(jurisdictionmodify)
    );
  }
  /**
   * 删除该会员
   * @param deletemember
   */
  @Post('/deletemember', { summary: '删除该会员' })
  @ApiBody({ description: '删除该会员请求参数例子' })
  @ApiBearerAuth()
  @Validate()
  async deletemember(@Body() deletemember: deletememberDTO) {
    console.log('/deletemember', '删除该会员');
    return this.ok(await this.ManageService.deletemember(deletemember));
  }
  /**
   * 修改该会员
   * @param usermodification
   */
  @Post('/usermodification', { summary: '修改该会员' })
  @ApiBody({ description: '修改该会员请求参数例子' })
  @ApiBearerAuth()
  @Validate()
  async usermodification(@Body() usermodification: usermodificationDTO) {
    console.log('/usermodification', '修改该会员');
    return this.ok(await this.ManageService.usermodification(usermodification));
  }
}
