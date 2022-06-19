import { Config, Inject, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { CacheManager } from '@midwayjs/cache';
import { Context } from 'koa';
import { COSService } from '@midwayjs/cos';
/**
 * 登录
 */
@Provide()
export class UploadService extends BaseService {
  @Inject()
  cacheManager: CacheManager;
  @Inject()
  ctx: Context;
  // 引入模块配置
  @Config('module.manage')
  coolConfig;
  @Inject()
  cosService: COSService;
  /**
   * 上传多单图片
   *
   */
  async upload(files) {
    // 定义接受参数字段
    console.log('上传图片');
    // console.log(ctx);
    // console.log(upload.file);
    let sata = 0;
    let url = '';
    let arr1 = [];
    if (files.length < 2) {
      await this.cosService
        .sliceUploadFile({
          Bucket: '',
          Region: '',
          Key: new Date().getTime() + files[0].filename,
          FilePath: files[0].data,
        })
        .then(data => {
          console.log('上传成功');
          let data1 = data.Location;
          arr1 = data1.split('myqcloud.com');
          url = arr1[1];
          sata = 1;
        })
        .catch(err => {
          console.log(err + '上传失败');
          sata = 0;
        });
      if (sata == 1) {
        return {
          mis: '上传成功',
          url: url,
        };
      } else {
        return {
          mis: '上传失败',
        };
      }
    } else {
      throw new CoolCommException('仅支持单张上传~');
    }
  }
  /**
   * 上传多条图片
   *
   */
  async uploads(files) {
    // 定义接受参数字段
    console.log('上传图片');
    // console.log(ctx);
    // console.log(upload.file);
    let sata = 0;
    let urls = [];
    let arr1 = [];
    for (let index = 0; index < files.length; index++) {
      await this.cosService
        .sliceUploadFile({
          Bucket: '',
          Region: '',
          Key: new Date().getTime() + index + files[index].filename,
          FilePath: files[index].data,
        })
        .then(data => {
          console.log(data);
          console.log('上传成功');
          let data1 = data.Location;
          arr1 = data1.split('myqcloud.com');
          urls.push(arr1[1]);
          sata = 1;
        })
        .catch(err => {
          console.log(err + '上传失败');
          sata = 0;
        });
      // ···
    }

    if (sata == 1) {
      return {
        mis: '上传成功',
        url: urls,
      };
    } else {
      return {
        mis: '上传失败',
      };
    }
  }
}
