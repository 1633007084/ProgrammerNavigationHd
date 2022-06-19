import { Config, Inject, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { UserUserUserEntity } from '../../entity/user/user';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';

import { CacheManager } from '@midwayjs/cache';
import { Context } from 'koa';
import {
  AddarticlepermissionsDTO,
  ViewarticleDTO,
} from '../../dto/App/viewarticle';
import { ManageUserArticleEntity } from '../../../manage/entity/user/article';
/**
 * 登录
 */
@Provide()
export class ViewarticleService extends BaseService {
  @Inject()
  cacheManager: CacheManager;
  @Inject()
  ctx: Context;
  // 引入文章表实体类
  @InjectEntityModel(ManageUserArticleEntity)
  ManageUserArticleEntity: Repository<ManageUserArticleEntity>;

  // 引入微信用户表实体类
  @InjectEntityModel(UserUserUserEntity)
  UserUserUserEntity: Repository<UserUserUserEntity>;
  // 引入模块配置
  @Config('module.user')
  coolConfig;

  /**
   * 文章列表
   *
   */
  async Viewarticlelist(Viewarticlelist) {
    const data = await this.ManageUserArticleEntity.find({ take: 20 });

    console.log('文章列表');
    return data;
  }

  /**
   * 文章详情
   *
   */
  async Viewarticle(Viewarticle: ViewarticleDTO) {
    // 定义接受参数字段
    console.log(this.ctx.App);
    const { id } = Viewarticle;
    if (this.ctx.App) {
      console.log('文章查找成功');
      // 判断新增还是修改1新增0修改
      const data = await this.ManageUserArticleEntity.findOne({ id });
      if (data) {

        if (data.owner != null) {
          const datab = JSON.parse(data.owner);
          if (datab.includes(this.ctx.App.userId)) {
            return {
              data,
              stat: 1,
              msg: '成功并有权限',
            };
          } else {
            return {
              data,
              stat: 0,
              msg: '成功没有权限',
            };
          }
        } else {
          return {
            data,
            stat: 0,
            msg: '成功没有权限',
          };
        }
      } else {
        throw new CoolCommException('文章查找失败');
      }
    } else {
      throw new CoolCommException('用户id接受失败');
    }
  }

  async Addarticlepermissions(Addarticlepermissions: AddarticlepermissionsDTO) {
    console.log('/Addarticlepermissions,为用户添加文章权限');
    console.log(this.ctx.App);
    const { id } = Addarticlepermissions;
    if (this.ctx.App) {
      const data = await this.ManageUserArticleEntity.findOne({ id });
      const userdata = await this.UserUserUserEntity.findOne({
        id: this.ctx.App.userId,
      });
      if (data.owner == null) {
        const userId = JSON.stringify([this.ctx.App.userId]);
        const wzId = JSON.stringify([id]);
        await this.ManageUserArticleEntity.update(
          { id: id },
          {
            owner: userId,
          }
        );
        await this.UserUserUserEntity.update(
          { id: this.ctx.App.userId },
          {
            remark: wzId,
          }
        );
        return {
          ism: '添加成功',
        };
      } else {
        const datab = JSON.parse(data.owner);
        if (datab.includes(this.ctx.App.userId)) {
          return {
            ism: '已经添加过了',
          };
        } else {
          if (userdata.remark == null) {
            const ownera = JSON.parse(data.owner);
            ownera.push(this.ctx.App.userId);
            const ownerb = ownera;
            const ownerc = JSON.stringify(ownerb);

            await this.ManageUserArticleEntity.update(
              { id: id },
              {
                owner: ownerc,
              }
            );
            const wzId = JSON.stringify([id]);
            await this.UserUserUserEntity.update(
              { id: this.ctx.App.userId },
              {
                remark: wzId,
              }
            );
            return {
              ism: '添加成功',
            };
          } else {
            const ownera = JSON.parse(data.owner);
            ownera.push(this.ctx.App.userId);
            const ownerb = ownera;
            const ownerc = JSON.stringify(ownerb);

            await this.ManageUserArticleEntity.update(
              { id: id },
              {
                owner: ownerc,
              }
            );
            const remarka = JSON.parse(userdata.remark);
            remarka.push(id);
            const remarkb = remarka;
            const remarkc = JSON.stringify(remarkb);

            await this.UserUserUserEntity.update(
              { id: this.ctx.App.userId },
              {
                remark: remarkc,
              }
            );
            return {
              ism: '添加成功',
            };
          }
        }
      }
    } else {
      throw new CoolCommException('用户id接受失败');
    }
  }
}
