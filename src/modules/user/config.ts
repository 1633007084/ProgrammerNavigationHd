import { ModuleConfig } from '@cool-midway/core';
import { UserMiddleware } from './middleware/UserMiddleware';
/**
 * 后台管理模块配置
 */
export default () => {
  return {
    // 后台管理
    name: 'user',
    // 模块描述
    description: 'app管理接口模块',
    // 中间件，只对本模块有效
    middlewares: [],
    // 中间件，全局有效
    globalMiddlewares: [UserMiddleware],
    // 模块加载顺序，默认为0，值越大越优先加载
    order: 2,
    // 其他配置
    // jwt 生成解密token的
    jwt: {
      // 注意： 最好重新修改，防止破解
      secret: 'IHDOSSHJEUDBECESDQWKDPJ',
      // 免token验证路径
      ignoreUrls: [
        '/App/user/open/dylogin',
        '/App/user/viewarticle/Viewarticlelist',
      ],
      // token
      token: {
        // 3天过期，需要用刷新token
        expire: 3 * 24 * 3600,
        // 15天内，如果没操作过就需要重新登录
        refreshExpire: 24 * 3600 * 15,
      },
    },
  } as ModuleConfig;
};
