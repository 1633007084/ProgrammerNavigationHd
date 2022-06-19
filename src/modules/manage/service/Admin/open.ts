import { Config, Inject, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException, RESCODE } from '@cool-midway/core';
import { LogintDTO, registerDTO } from '../../dto/Adminapp/login';
import { ManageUserUserEntity } from '../../entity/user/user';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';
import * as md5 from 'md5';
import * as jwt from 'jsonwebtoken';
import { CacheManager } from '@midwayjs/cache';
import { Context } from 'koa';
/**
 * 登录
 */
@Provide()
export class ManageService extends BaseService {
  @Inject()
  cacheManager: CacheManager;
  @Inject()
  ctx: Context;
  // 引入用户表实体类
  @InjectEntityModel(ManageUserUserEntity)
  ManageUserUserEntity: Repository<ManageUserUserEntity>;
  // 引入模块配置
  @Config('module.manage')
  coolConfig;

  async login(login: LogintDTO) {
    // 定义接受参数字段
    const { account, password } = login;
    const username = account;
    const user = await this.ManageUserUserEntity.findOne({ username });
    // 校验用户
    if (user) {
      // 校验用户状态及密码
      if (user.password !== md5(password)) {
        throw new CoolCommException('账户或密码不正确~');
      }
    } else {
      throw new CoolCommException('账户或密码不正确~');
    }
    // 生成token
    const { expire, refreshExpire } = this.coolConfig.jwt.token;
    const result = {
      account,
      expire,
      token: await this.generateToken(user, expire),
      failure_time: refreshExpire,
    };
    console.log('/loin进入方法');
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
    await this.cacheManager.set(
      `admin:passwordVersion:${user.id}`,
      user.passwordV
    );
    const tokenInfo = {
      isRefresh: false,
      username: user.username,
      userId: user.id,
      jurisdictionid: user.jurisdictionid,
      name: user.name,
      passwordVersion: user.passwordV,
    };
    if (isRefresh) {
      tokenInfo.isRefresh = true;
    }
    return (
      'Bearer ' +
      jwt.sign(tokenInfo, this.coolConfig.jwt.secret, {
        expiresIn: expire,
      })
    );
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
  /**
   * 注册
   *
   */
  async register(register: registerDTO) {
    // 定义接受参数字段
    const { account, password, passwordtwo, name } = register;
    const username = account;
    const user = await this.ManageUserUserEntity.findOne({ username });
    // 校验用户
    if (user) {
      // 校验用户状态及密码
      throw new CoolCommException('该用户名已注册，请更换');
    } else {
      if (password == passwordtwo) {
        const passwordmd = md5(password);
        await this.ManageUserUserEntity.insert({
          name: name,
          username: account,
          password: passwordmd,
        });
        const result = {
          msg: '注册成功',
        };
        console.log('/register进入方法');
        return result;
      } else {
        throw new CoolCommException('两次密码不一致');
      }
    }
  }
  /**
   * 权限
   *
   */
  async jurisdiction(account) {
    let fenzu = await this.ManageUserUserEntity.findOne({
      where: {
        username: account,
      },
    });
    if (fenzu == undefined) {
      let data = {
        permissions: [],
      };
      return data;
    } else {
      let data = {
        permissions: JSON.parse(fenzu.userrights),
      };
      return data;
    }
  }
  /**
   * 权限
   *
   */
  async jurisdictionmodify(jurisdictionmodify) {
    const { id, userId } = jurisdictionmodify;
    // 定义接受参数字段
    await this.ManageUserUserEntity.update(
      { id: userId },
      {
        userrights: JSON.stringify(id),
      }
    );

    const result = {
      msg: '修改成功',
    };
    return result;
  }
  /**
   * 删除用户
   *
   */
  async deletemember(deletemember) {
    const { id } = deletemember;
    // 定义接受参数字段
    let photoToRemove = await this.ManageUserUserEntity.findOne(id);
    await this.ManageUserUserEntity.remove(photoToRemove);
    const result = {
      msg: '删除成功',
    };
    return result;
  }
  /**
   * 修改用户
   *
   */
  async usermodification(usermodification) {
    // 定义接受参数字段
    const { account, password, passwordtwo, name, id } = usermodification;
    // const username = account;
    // const user = await this.ManageUserUserEntity.findOne({ username });
    // 定义接受参数字段

    // 校验用户
    if (password == passwordtwo) {
      const passwordmd = md5(password);
      await this.ManageUserUserEntity.update(
        { id: id },
        {
          name: name,
          username: account,
          password: passwordmd,
        }
      );
      const result = {
        msg: '修改成功',
      };
      return result;
    } else {
      throw new CoolCommException('两次密码不一致');
    }
  }
}
