import { ModuleConfig } from '@cool-midway/core';
import { ManageMiddleware } from './middleware/ManageMiddleware';
/**
 * 后台管理模块配置
 */
export default () => {
  return {
    // 后台管理
    name: 'manage',
    // 模块描述
    description: '后台管理接口模块',
    // 中间件，只对本模块有效
    middlewares: [],
    // 中间件，全局有效
    globalMiddlewares: [ManageMiddleware],
    // 模块加载顺序，默认为0，值越大越优先加载
    order: 1,
    // 其他配置
    // jwt 生成解密token的
    jwt: {
      // 注意： 最好重新修改，防止破解
      secret: 'IHDOSSDDSSDECPQWKDPJ',
      // 免token验证路径
      ignoreUrls: [
        '/Adminapp/manage/open/login',
        '/Adminapp/manage/open/register',
        '/Adminapp/manage/upload/upload',
        '/Adminapp/manage/upload/uploads',
        '/Adminapp/manage/home/checkclassification/checkclassificationlis',
        '/Adminapp/manage/home/checkclassification/musilist',
        '/Adminapp/manage/home/checkclassification/csdnlist',
        '/Adminapp/manage/home/checkclassification/wblist',
        '/Adminapp/manage/home/checkclassification/bdlist',
      ],
      // token
      token: {
        // 2小时过期，需要用刷新token
        expire: 2 * 3600,
        // 15天内，如果没操作过就需要重新登录
        refreshExpire: 24 * 3600 * 15,
      },
    },
  } as ModuleConfig;
};
