import { IMiddleware } from '@midwayjs/core';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import { ALL, Config, Init, Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { RESCODE } from '@cool-midway/core';

@Middleware()
export class ManageMiddleware implements IMiddleware<Context, NextFunction> {
  @Config('koa.globalPrefix')
  prefix;
  @Config('module.manage')
  jwtConfig;
  @Config(ALL)
  coolConfig;

  protected ignoreUrls = [];
  // 初始化忽略token的地址
  @Init()
  async init() {
    const { module } = this.coolConfig;
    for (const key in module) {
      if (key == 'manage') {
        continue;
      }
      this.ignoreUrls = this.ignoreUrls.concat(
        module[key].manage?.jwt?.ignoreUrls || []
      );
    }
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // let statusCode = 200;
      this.ignoreUrls = this.ignoreUrls.concat(this.jwtConfig.jwt.ignoreUrls);
      let { url } = ctx;
      const tokenb = ctx.header.authorization;
      url = url.replace(this.prefix, '');
      console.log(url, 'Adminapp中间件开始');
      if (ctx.method == 'OPTIONS') {
        console.log(ctx.method);
        ctx.status = 200;
        ctx.body = {
          code: 200,
          message: '登录失效或无权限访问~',
        };
        // await next();
        return;
      }
      if (_.startsWith(url, '/Adminapp/')) {
        console.log('Adminapp中间件进入');
        // 检验是否免登陆
        if (this.ignoreUrls.includes(url)) {
          await next();
          return;
        } else {
          const token = tokenb.trim().split(' ')[1];

          // 校验token
          try {
            // 解密token并赋值
            ctx.Adminapp = jwt.verify(token, this.jwtConfig.jwt.secret);
          } catch (err) {
            ctx.status = 401;
            ctx.body = {
              code: RESCODE.COMMFAIL,
              message: '登录失效或无权限访问~',
            };
            return;
          }
          await next();
          return;
        }
      }
      console.log('Adminapp中间件结束');
      await next();
    };
  }
}
