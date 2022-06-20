import { MidwayConfig } from '@midwayjs/core';
import * as redisStore from 'cache-manager-ioredis';
import { uploadWhiteList } from '@midwayjs/upload';
import { tmpdir } from 'os';
import { join } from 'path';
// import * as fsStore from 'cache-manager-fs-hash';

export default {
  // 修改成你自己独有的key
  keys: 'wpjawz-admin for node',
  koa: {
    port: 3010,
  },
  // 文件上传
  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: '200mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: uploadWhiteList.filter(ext => ext !== '.pdf'),
    // tmpdir: string，上传的文件临时存储路径
    tmpdir: join(tmpdir(), 'midway-upload-files'),
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 5 * 60 * 1000,
  },
  // 跨域
  cors: {
    origin: '*',
    credentials: false,
  },
  swagger: {
    auth: {
      authType: 'bearer',
    },
  },
  // 模板渲染
  view: {
    mapping: {
      '.html': 'ejs',
    },
  },
  // 本地缓存
  // cache: {
  //   store: fsStore,
  //   options: {
  //     path: 'cache',
  //     ttl: -1,
  //   },
  // },
  // redis缓存
  cache: {
    store: redisStore,
    options: {
      host: '1.1.1.1',
      port: 6379,
      password: '',
      db: 3,
      keyPrefix: 'cache:',
      ttl: 100,
    },
  },
  redis: {
    // Multi Redis
    client: {
      host: '1.1.1.1',
      port: 6379,
      password: '1',
      db: 4,
    },
  },
  task: {
    // ioredis的配置 https://www.npmjs.com/package/ioredis
    redis: {
      port: 6379,
      host: '1.1.1.1',
      password: '',
    },
    prefix: 'midway-task', // 这些任务存储的 key，都是 midway-task 开头，以便区分用户原有redis 里面的配置。
    defaultJobOptions: {
      repeat: {
        tz: 'Asia/Shanghai', // Task 等参数里面设置的比如（0 0 0 * * *）本来是为了0点执行，但是由于时区不对，所以国内用户时区设置一下。
      },
    },
  },
  cos: {
    client: {
      SecretId: '',
      SecretKey: '',
    },
  },
} as
  | MidwayConfig
  | {
    cache: any;
  };
