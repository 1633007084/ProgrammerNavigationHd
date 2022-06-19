import { Config, Inject, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException, RESCODE } from '@cool-midway/core';

import { UserUserUserEntity } from '../../entity/user/user';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';
import axios from 'axios';
// import * as md5 from 'md5';
import * as jwt from 'jsonwebtoken';
import { CacheManager } from '@midwayjs/cache';
import { Context } from 'koa';
import { DyLogintDTO } from '../../dto/App/login';
import { UpdateuserDTO } from '../../dto/App/updateuser';
/**
 * 登录
 */
@Provide()
export class UserService extends BaseService {
  @Inject()
  cacheManager: CacheManager;
  @Inject()
  ctx: Context;
  // 引入用户表实体类
  @InjectEntityModel(UserUserUserEntity)
  UserUserUserEntity: Repository<UserUserUserEntity>;
  // 引入模块配置
  @Config('module.user')
  coolConfig;

  async login(Dylogin: DyLogintDTO) {
    const { code, anonymousCode } = Dylogin;
    // 定义接受参数字段
    console.log('/dyloin进入方法');
    const ticket = await axios.post(
      'https://developer.toutiao.com/api/apps/v2/jscode2session',
      {
        appid: 'tt79440ff9e67e142e',
        secret: '02a10c03d802edfa1f81ecb1ff07f03d280aaeb9',
        code: code,
        anonymous_code: anonymousCode,
      }
    );
    let result = {};
    //判断抖音获取id是否成功
    if (ticket.data.err_no == 0 && ticket.data.data.openid != '') {
      // 判断是否又该用户有生成token没有注册并生成token
      const openid = ticket.data.data.openid;
      const user = await this.UserUserUserEntity.findOne({ openid });
      if (user) {
        console.log('有该用户');
        // 生成token
        const { expire, refreshExpire } = this.coolConfig.jwt.token;

        result = {
          token: await this.generateToken(user, expire),
          status: user.status,
          membershiplevel: user.membershiplevel,
          failure_time: refreshExpire,
        };
      } else {
        console.log('没有该用户');
        await this.UserUserUserEntity.insert({
          status: 1,
          membershiplevel: 1,
          openid: ticket.data.data.openid,
          unionid: ticket.data.data.unionid,
        });
        const { expire, refreshExpire } = this.coolConfig.jwt.token;
        const user = await this.UserUserUserEntity.findOne({ openid });


        result = {
          token: await this.generateToken(user, expire),
          status: user.status,
          membershiplevel: user.membershiplevel,
          failure_time: refreshExpire,
        };
      }
    } else {
      throw new CoolCommException('注册失败');
    }
    return result;
  }
  /**
   * 生成token
   * @param user 用户对象
   * @param roleIds 角色集合
   * @param expire 过期
   * @param isRefresh 是否是刷新
   */
  async generateToken(user, expire, isRefresh?) {
    // await this.cacheManager.set(`APP:openid:${user.openid}`, user.passwordV);
    const tokenInfo = {
      isRefresh: false,
      userId: user.id,
      membershiplevel: user.membershiplevel,
      openid: user.openid,
      status: user.status,
    };
    // if (isRefresh) {
    //   tokenInfo.isRefresh = true;
    // }
    return (
      'Bearer ' +
      jwt.sign(tokenInfo, this.coolConfig.jwt.secret, {
        expiresIn: expire,
      })
    );
  }

  /**
   * 更新用户信息
   * @param updateuser
   */
  async updateuser(updateuser: UpdateuserDTO) {
    const { region, nickName, headImg } = updateuser;
    console.log(this.ctx.App);
    await this.UserUserUserEntity.update(
      { openid: this.ctx.App.openid },
      {
        region: region,
        nickName: nickName,
        headImg: headImg,
      }
    );
    return {
      mas: '会员信息更新成功',
    };
  }
  /**
   * 刷新token
   * @param token
   */
  async refreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.coolConfig.jwt.secret);
      if (decoded && decoded['isRefresh']) {
        delete decoded['exp'];
        delete decoded['iat'];

        const { expire, refreshExpire } = this.coolConfig.jwt.token;
        decoded['isRefresh'] = false;
        const result = {
          expire,
          token: jwt.sign(decoded, this.coolConfig.jwt.secret, {
            expiresIn: expire,
          }),
          refreshExpire,
          refreshToken: '',
        };
        decoded['isRefresh'] = true;
        result.refreshToken = jwt.sign(decoded, this.coolConfig.jwt.secret, {
          expiresIn: refreshExpire,
        });
        await this.cacheManager.set(
          `admin:passwordVersion:${decoded['userId']}`,
          decoded['passwordVersion']
        );
        return result;
      }
    } catch (err) {
      this.ctx.status = 401;
      this.ctx.body = {
        code: RESCODE.COMMFAIL,
        message: '登录失效~',
      };
      return;
    }
  }
}
