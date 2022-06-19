import { Config, Inject, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';
import { CacheManager } from '@midwayjs/cache';
import { Context } from 'koa';
import { ArticledetailsDTO } from '../../dto/Adminapp/article';
import { ManageUserArticleEntity } from '../../entity/user/article';
/**
 * 登录
 */
@Provide()
export class ArticleService extends BaseService {
  @Inject()
  cacheManager: CacheManager;
  @Inject()
  ctx: Context;
  // 引入文章表实体类
  @InjectEntityModel(ManageUserArticleEntity)
  ManageUserArticleEntity: Repository<ManageUserArticleEntity>;
  // 引入模块配置
  @Config('module.manage')
  coolConfig;

  /**
   * 文章详情
   *
   */
  async articledetails(articledetails: ArticledetailsDTO) {
    // 定义接受参数字段
    const {
      alter,
      id,
      type,
      heading,
      subheading,
      content,
      paidcontent,
      paymentLevel,
      headImg,
      status,
    } = articledetails;
    if (this.ctx.Adminapp) {
      console.log('用户查找成功');
      // 判断新增还是修改1新增0修改
      if (alter == 1) {
        await this.ManageUserArticleEntity.insert({
          type: type,
          name: this.ctx.Adminapp.name,
          heading: heading,
          subheading: subheading,
          content: content,
          paidcontent: paidcontent,
          paymentLevel: Number(paymentLevel),
          headImg: headImg,
          status: Number(status),
        });
        return {
          msg: '新增成功',
        };
      } else {
        await this.ManageUserArticleEntity.update(
          { id: Number(id) },
          {
            type: type,
            name: this.ctx.Adminapp.name,
            heading: heading,
            subheading: subheading,
            content: content,
            paidcontent: paidcontent,
            paymentLevel: Number(paymentLevel),
            headImg: headImg,
            status: Number(status),
          }
        );
        return {
          mas: '文章更新成功',
        };
      }
    } else {
      throw new CoolCommException('用户查找失败');
    }
  }
}
