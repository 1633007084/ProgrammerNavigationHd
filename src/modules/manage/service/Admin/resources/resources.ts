import { Config, Inject, Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { CacheManager } from '@midwayjs/cache';
import { Context } from 'koa';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';
import { ManageResourcesResourcearticleEntity } from '../../../entity/resources/resourcearticle';
import { ManageResourcesResourceclassificationEntity } from '../../../entity/resources/resourceclassification';
import { ManageResourcesResourcepermissionsEntity } from '../../../entity/resources/resourcepermissions';
import {
  articleaddDTO,
  articlecheckDTO,
  articledeleteDTO,
  articlemodifyDTO,
  classificationaddDTO,
  classificationdeleteDTO,
  classificationmodifyDTO,
  loginuserdataDTO,
  poweraddDTO,
  powerdeleteDTO,
  powermodifyDTO,
  resourceusermodifyDTO,
} from '../../../dto/Adminapp/resources';
import { ManageUserUserEntity } from '../../../entity/user/user';

/**
 * 资源页
 */
@Provide()
export class resourcesService extends BaseService {
  @Inject()
  cacheManager: CacheManager;
  @Inject()
  ctx: Context;
  // 引入文章实体类
  @InjectEntityModel(ManageResourcesResourcearticleEntity)
  ManageResourcesResourcearticleEntity: Repository<ManageResourcesResourcearticleEntity>;
  //引入分类实体类
  @InjectEntityModel(ManageResourcesResourceclassificationEntity)
  ManageResourcesResourceclassificationEntity: Repository<ManageResourcesResourceclassificationEntity>;
  //引入资源权限类
  @InjectEntityModel(ManageResourcesResourcepermissionsEntity)
  ManageResourcesResourcepermissionsEntity: Repository<ManageResourcesResourcepermissionsEntity>;
  //用户实体类
  @InjectEntityModel(ManageUserUserEntity)
  ManageUserUserEntity: Repository<ManageUserUserEntity>;
  // 引入模块配置
  @Config('module.manage')
  coolConfig;

  /**
   * 分类列表
   *
   */
  async classificationlist(classificationlist) {
    const data = await this.ManageResourcesResourceclassificationEntity.find();
    return data;
    // throw new CoolCommException(data);
  }
  /**
   * 分类新增
   *
   */
  async classificationadd(classificationadd: classificationaddDTO) {
    const { name, imgurl, enablestatus, priority } = classificationadd;
    await this.ManageResourcesResourceclassificationEntity.insert({
      name: name,
      imgurl: imgurl,
      enablestatus: enablestatus,
      priority: priority,
    });
    const result = {
      msg: '新增成功',
    };
    return result;
    // throw new CoolCommException(data);
  }
  /**
   * 分类删除
   *
   */
  async classificationdelete(classificationdelete: classificationdeleteDTO) {
    const { id } = classificationdelete;
    // 定义接受参数字段

    let photoToRemove =
      await this.ManageResourcesResourceclassificationEntity.findOne(id);
    await this.ManageResourcesResourceclassificationEntity.remove(
      photoToRemove
    );
    const result = {
      msg: '删除成功',
    };
    return result;
  }
  /**
   * 分类修改
   *
   */
  async classificationmodify(classificationmodify: classificationmodifyDTO) {
    // 定义接受参数字段
    const { id, name, imgurl, enablestatus, priority } = classificationmodify;
    // 定义接受参数字段
    await this.ManageResourcesResourceclassificationEntity.update(
      { id: id },
      {
        name: name,
        imgurl: imgurl,
        enablestatus: enablestatus,
        priority: priority,
      }
    );

    const result = {
      msg: '修改成功',
    };
    return result;
  }
  /**
   * 文章新增
   *
   */
  async articleadd(articleadd: articleaddDTO) {
    const {
      name,
      label,
      imgurl,
      briefintroduction,
      content,
      bindingId,
      paidcontent,
      enablestatus,
      priority,
    } = articleadd;
    await this.ManageResourcesResourcearticleEntity.insert({
      name: name,
      label: label,
      imgurl: imgurl,
      briefintroduction: briefintroduction,
      content: content,
      paidcontent: paidcontent,
      bindingId: bindingId,
      enablestatus: enablestatus,
      priority: priority,
    });
    const result = {
      msg: '新增成功',
    };
    return result;
    // throw new CoolCommException(data);
  }
  /**
   * 文章列表
   *
   */
  async articlelist(articlelist) {
    const data = await this.ManageResourcesResourcearticleEntity.find();
    const data1 = [];
    for (let index = 0; index < data.length; index++) {
      let data2 = await this.ManageResourcesResourceclassificationEntity.find({
        id: data[index].bindingId,
      });
      data1.push({
        name: data[index].name,
        id: data[index].id,
        label: data[index].label,
        imgurl: data[index].imgurl,
        briefintroduction: data[index].briefintroduction,
        bindingId: data[index].bindingId,
        content: data[index].content,
        enablestatus: data[index].enablestatus,
        priority: data[index].priority,
        paidcontent: data[index].paidcontent,
        createTime: data[index].createTime,
        updateTime: data[index].updateTime,
        flname: data2[0],
      });
    }
    return data1;
    // throw new CoolCommException(data);
  }
  /**
   * 文章修改
   *
   */
  async articlemodify(articlemodify: articlemodifyDTO) {
    // 定义接受参数字段
    const {
      id,
      name,
      label,
      imgurl,
      briefintroduction,
      content,
      bindingId,
      paidcontent,
      enablestatus,
      priority,
    } = articlemodify;
    // 定义接受参数字段
    await this.ManageResourcesResourcearticleEntity.update(
      { id: id },
      {
        name: name,
        label: label,
        imgurl: imgurl,
        briefintroduction: briefintroduction,
        content: content,
        paidcontent: paidcontent,
        bindingId: bindingId,
        enablestatus: enablestatus,
        priority: priority,
      }
    );

    const result = {
      msg: '修改成功',
    };
    return result;
  }
  /**
   * 文章删除
   *
   */
  async articledelete(articledelete: articledeleteDTO) {
    const { id } = articledelete;
    // 定义接受参数字段

    let photoToRemove = await this.ManageResourcesResourcearticleEntity.findOne(
      id
    );
    await this.ManageResourcesResourcearticleEntity.remove(photoToRemove);
    const result = {
      msg: '删除成功',
    };
    return result;
  }
  /**
   * 根据文章id查询文章详情
   *
   */
  async articlecheck(articlecheck: articlecheckDTO) {
    const { id } = articlecheck;
    // 定义接受参数字段

    let wzls1 = await this.ManageResourcesResourcearticleEntity.findOne({
      where: {
        id: id,
      },
    });

    return wzls1;
  }
  /**
   * 权限列表
   *
   */
  async powerlist(powerlist) {
    const data = await this.ManageResourcesResourcepermissionsEntity.find();
    return data;
    // throw new CoolCommException(data);
  }
  /**
   * 新增权限
   *
   */
  async poweradd(poweradd: poweraddDTO) {
    const { name, bindingId, enablestatus, priority } = poweradd;
    const bindingIdtow = JSON.stringify(bindingId);
    await this.ManageResourcesResourcepermissionsEntity.insert({
      name: name,
      bindingId: bindingIdtow,
      enablestatus: enablestatus,
      priority: priority,
    });
    const result = {
      msg: '新增成功',
    };
    return result;
    // throw new CoolCommException(data);
  }
  /**
   * 权限修改
   *
   */
  async powermodify(powermodify: powermodifyDTO) {
    // 定义接受参数字段
    const { id, name, bindingId, priority } = powermodify;
    // 定义接受参数字段
    await this.ManageResourcesResourcepermissionsEntity.update(
      { id: id },
      {
        name: name,
        bindingId: JSON.stringify(bindingId),
        priority: priority,
      }
    );

    const result = {
      msg: '修改成功',
    };
    return result;
  }
  /**
   * 权限删除
   *
   */
  async powerdelete(powerdelete: powerdeleteDTO) {
    const { id } = powerdelete;
    // 定义接受参数字段

    let photoToRemove =
      await this.ManageResourcesResourcepermissionsEntity.findOne(id);
    await this.ManageResourcesResourcepermissionsEntity.remove(photoToRemove);
    const result = {
      msg: '删除成功',
    };
    return result;
  }
  /**
   * 用户表
   *
   */
  async resourceuserlist(resourceuserlist) {
    const data = await this.ManageUserUserEntity.find();
    const data1 = [];
    for (let index = 0; index < data.length; index++) {
      let data2 = {
        createTime: data[index].createTime,
        updateTime: data[index].updateTime,
        departmentId: data[index].departmentId,
        id: data[index].id,
        jurisdictionid: data[index].jurisdictionid,
        name: data[index].name,
        username: data[index].username,
        userrights: data[index].userrights,
      };
      data1.push(data2);
    }
    return data1;
  }
  /**
   * 修改用户权限组
   *
   */
  async resourceusermodify(resourceusermodify: resourceusermodifyDTO) {
    const { userid, jurisdictionid } = resourceusermodify;
    // 定义接受参数字段
    await this.ManageUserUserEntity.update(
      { id: userid },
      {
        jurisdictionid: jurisdictionid,
      }
    );

    const result = {
      msg: '修改成功',
    };
    return result;
  }
  /**
   * 获取当前登录用户分类数据
   *
   */
  async loginuserdata(loginuserdata: loginuserdataDTO) {
    const { flid } = loginuserdata;
    //获取当前用户资源权限组id
    const jurisdictionid = this.ctx.Adminapp.jurisdictionid;
    //根据权限组id获取它下所有分类id
    let fenzu = await this.ManageResourcesResourcepermissionsEntity.findOne({
      where: {
        id: jurisdictionid,
      },
    });
    let fenlei3 = JSON.parse(fenzu.bindingId);
    // let fenlei2 = Object.values(fenlei);
    // let fenlei3 = [];
    // for (let index = 0; index < fenlei2.length; index++) {
    //   if (
    //     fenlei2[index] != '[' &&
    //     fenlei2[index] != ',' &&
    //     fenlei2[index] != ']'
    //   ) {
    //     fenlei3.push(fenlei2[index]);
    //   }
    // }
    //如果传0获取当下用户所有分类所有文章
    if (flid == 0) {
      let wzdata = [];
      for (let index = 0; index < fenlei3.length; index++) {
        let wzls1 = await this.ManageResourcesResourcearticleEntity.find({
          where: {
            bindingId: fenlei3[index],
          },
        });
        for (let index = 0; index < wzls1.length; index++) {
          wzdata.push(wzls1[index]);
        }
      }
      return wzdata;
    } else {
      //如果非零根据文章id获取该分类所有文章
      let wzls11 = await this.ManageResourcesResourcearticleEntity.find({
        where: {
          bindingId: flid,
        },
      });
      return wzls11;
    }
  }
  /**
   * 登录用户分类信息
   *
   */
  async loginuserfl(loginuserfl) {
    //获取当前用户资源权限组id
    const jurisdictionid = this.ctx.Adminapp.jurisdictionid;
    //根据权限组id获取它下所有分类id
    let fenzu = await this.ManageResourcesResourcepermissionsEntity.findOne({
      where: {
        id: jurisdictionid,
      },
    });
    let fenlei3 = JSON.parse(fenzu.bindingId);
    // let fenlei2 = Object.values(fenlei);
    // let fenlei3 = [];
    // for (let index = 0; index < fenlei2.length; index++) {
    //   if (
    //     fenlei2[index] != '[' &&
    //     fenlei2[index] != ',' &&
    //     fenlei2[index] != ']'
    //   ) {
    //     fenlei3.push(fenlei2[index]);
    //   }
    // }
    let wzdata = [];
    for (let index = 0; index < fenlei3.length; index++) {
      let wzls1 = await this.ManageResourcesResourceclassificationEntity.find({
        where: {
          id: fenlei3[index],
        },
      });
      for (let index = 0; index < wzls1.length; index++) {
        wzdata.push(wzls1[index]);
      }
    }
    return wzdata;
  }
  /**
   * 底部
   */
}
