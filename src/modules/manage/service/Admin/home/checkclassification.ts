import { Config, Inject, Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { CacheManager } from '@midwayjs/cache';
import { Context } from 'koa';
import { ManageHomeClassificationEntity } from '../../../entity/homes/classification';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';
import { ManageHomeQuickUrlEntity } from '../../../entity/homes/quickurl';
import { makeHttpRequest } from '@midwayjs/core';
import {
  ClassificationlistlisaddDTO,
  ClassificationlistlisdeleteDTO,
  ClassificationlistlismodifyDTO,
  ModifynavigationDTO,
  MynavigationaddDTO,
  MynavigationdeleteDTO,
  MynavigationmodifyDTO,
  NavigationlistdeleteDTO,
  NewnavigationDTO,
} from '../../../dto/Adminapp/classificationlistlis';
import { ManageHomeMynavigationUrlEntity } from '../../../entity/homes/mynavigation';
import { RedisService } from '@midwayjs/redis';
/**
 * 登录
 */
@Provide()
export class CheckclassificationService extends BaseService {
  @Inject()
  cacheManager: CacheManager;
  @Inject()
  ctx: Context;
  @Inject()
  redisService: RedisService;
  // 引入文章表实体类
  @InjectEntityModel(ManageHomeClassificationEntity)
  ManageHomeClassificationEntity: Repository<ManageHomeClassificationEntity>;
  @InjectEntityModel(ManageHomeQuickUrlEntity)
  ManageHomeQuickUrlEntity: Repository<ManageHomeQuickUrlEntity>;
  @InjectEntityModel(ManageHomeMynavigationUrlEntity)
  ManageHomeMynavigationUrlEntity: Repository<ManageHomeMynavigationUrlEntity>;
  // 引入模块配置
  @Config('module.manage')
  coolConfig;

  /**
   * 列表接口
   *
   */
  async checkclassificationlis(checkclassificationlis) {
    const rdssj = await this.redisService.get('home:checkclassificationlis');
    let data1 = [];
    if (rdssj != null) {
      data1 = JSON.parse(await rdssj);
    } else {
      // 定义接受参数字段
      const data = await this.ManageHomeClassificationEntity.find();
      for (let index = 0; index < data.length; index++) {
        let data2 = await this.ManageHomeQuickUrlEntity.find({
          where: {
            bindingId: data[index].id,
          },
        });
        data1.push({ name: data[index], data: data2 });
      }
      //存入Redis里
      const rdata1 = {};
      const rdata = await this.checkclassificationlisss(rdata1);
      await this.redisService.set(
        'home:checkclassificationlis',
        JSON.stringify(rdata),
        'EX',
        3600
      );
    }
    return data1;
    // throw new CoolCommException(data);
  }
  /**
   * 实时获取列表接口
   *
   */
  async checkclassificationlisss(checkclassificationlis) {
    // 定义接受参数字段
    const data = await this.ManageHomeClassificationEntity.find();
    const data1 = [];
    for (let index = 0; index < data.length; index++) {
      let data2 = await this.ManageHomeQuickUrlEntity.find({
        where: {
          bindingId: data[index].id,
        },
      });
      data1.push({ name: data[index], data: data2 });
    }
    return data1;
    // throw new CoolCommException(data);
  }
  /**
   * 分类列表
   *
   */
  async classificationlistlis(classificationlistlis) {
    // 定义接受参数字段
    const data = await this.ManageHomeClassificationEntity.find();
    return data;
    // throw new CoolCommException(data);
  }

  /**
   * 分类新增
   *
   */
  async classificationlistlisadd(
    classificationlistlisadd: ClassificationlistlisaddDTO
  ) {
    const { name, imgurl, isCs, isPush } = classificationlistlisadd;
    // 定义接受参数字段
    await this.ManageHomeClassificationEntity.insert({
      name: name,
      imgurl: imgurl,
      isCs: isCs,
      isPush: isPush,
    });
    //存入Redis里
    const rdata1 = {};
    const rdata = await this.checkclassificationlisss(rdata1);
    await this.redisService.set(
      'home:checkclassificationlis',
      JSON.stringify(rdata),
      'EX',
      3600
    );
    const result = {
      msg: '新增成功',
    };

    return result;
    // throw new CoolCommException(data);
  }
  /**
   * 分类修改
   *
   */
  async classificationlistlismodify(
    classificationlistlismodify: ClassificationlistlismodifyDTO
  ) {
    const { id, name, imgurl, isCs, isPush } = classificationlistlismodify;
    // 定义接受参数字段
    await this.ManageHomeClassificationEntity.update(
      { id: id },
      {
        name: name,
        imgurl: imgurl,
        isCs: isCs,
        isPush: isPush,
      }
    );
    //存入Redis里
    const rdata1 = {};
    const rdata = await this.checkclassificationlisss(rdata1);
    await this.redisService.set(
      'home:checkclassificationlis',
      JSON.stringify(rdata),
      'EX',
      3600
    );
    const result = {
      msg: '修改成功',
    };
    return result;
    // throw new CoolCommException(data);
  }
  /**
   * 分类删除
   *
   */
  async classificationlistlisdelete(
    classificationlistlisdelete: ClassificationlistlisdeleteDTO
  ) {
    const { id } = classificationlistlisdelete;
    // 定义接受参数字段
    // await this.ManageHomeClassificationEntity.remove({
    //   id: id,
    // });

    let photoToRemove = await this.ManageHomeClassificationEntity.findOne(id);
    await this.ManageHomeClassificationEntity.remove(photoToRemove);
    const result = {
      msg: '删除成功',
    };
    //存入Redis里
    const rdata1 = {};
    const rdata = await this.checkclassificationlisss(rdata1);
    await this.redisService.set(
      'home:checkclassificationlis',
      JSON.stringify(rdata),
      'EX',
      3600
    );
    return result;
    // throw new CoolCommException(data);
  }
  /**
   * 导航列表
   *
   */
  async navigationlist(navigationlist) {
    // 定义接受参数字段
    const data = await this.ManageHomeQuickUrlEntity.find();
    const data1 = [];
    for (let index = 0; index < data.length; index++) {
      let data2 = await this.ManageHomeClassificationEntity.find({
        id: data[index].bindingId,
      });
      data1.push({
        name: data[index].name,
        id: data[index].id,
        subtitle: data[index].subtitle,
        imgurl: data[index].imgurl,
        url: data[index].url,
        bindingId: data[index].bindingId,
        isCs: data[index].isCs,
        isPush: data[index].isPush,
        createTime: data[index].createTime,
        updateTime: data[index].updateTime,
        flname: data2[0],
      });
    }
    return data1;
    // throw new CoolCommException(data);
  }
  /**
   * 导航新增
   *
   */
  async newnavigation(newnavigation: NewnavigationDTO) {
    const { name, subtitle, imgurl, url, isCs, bindingId, isPush } =
      newnavigation;
    // 定义接受参数字段
    await this.ManageHomeQuickUrlEntity.insert({
      name: name,
      subtitle: subtitle,
      imgurl: imgurl,
      url: url,
      bindingId: bindingId,
      isCs: isCs,
      isPush: isPush,
    });
    //存入Redis里
    const rdata1 = {};
    const rdata = await this.checkclassificationlisss(rdata1);
    await this.redisService.set(
      'home:checkclassificationlis',
      JSON.stringify(rdata),
      'EX',
      3600
    );
    const result = {
      msg: '新增成功',
    };
    return result;
    // throw new CoolCommException(data);
  }
  /**
   * 导航删除
   *
   */
  async navigationlistdelete(navigationlistdelete: NavigationlistdeleteDTO) {
    const { id } = navigationlistdelete;
    // 定义接受参数字段
    // await this.ManageHomeClassificationEntity.remove({
    //   id: id,
    // });

    let photoToRemove = await this.ManageHomeQuickUrlEntity.findOne(id);
    await this.ManageHomeQuickUrlEntity.remove(photoToRemove);
    const result = {
      msg: '删除成功',
    };
    //存入Redis里
    const rdata1 = {};
    const rdata = await this.checkclassificationlisss(rdata1);
    await this.redisService.set(
      'home:checkclassificationlis',
      JSON.stringify(rdata),
      'EX',
      3600
    );
    return result;
    // throw new CoolCommException(data);
  }
  /**
   * 导航修改
   *
   */
  async modifynavigation(modifynavigation: ModifynavigationDTO) {
    const { id, name, subtitle, imgurl, url, isCs, bindingId, isPush } =
      modifynavigation;
    // 定义接受参数字段
    await this.ManageHomeQuickUrlEntity.update(
      { id: id },
      {
        name: name,
        subtitle: subtitle,
        imgurl: imgurl,
        url: url,
        bindingId: bindingId,
        isCs: isCs,
        isPush: isPush,
      }
    );
    //存入Redis里
    const rdata1 = {};
    const rdata = await this.checkclassificationlisss(rdata1);
    await this.redisService.set(
      'home:checkclassificationlis',
      JSON.stringify(rdata),
      'EX',
      3600
    );
    const result = {
      msg: '修改成功',
    };
    return result;
    // throw new CoolCommException(data);
  }
  /**
   * 音乐链接
   *
   */
  async musilist(musilist) {
    // 定义接受参数字段
    const rdssj = await this.redisService.get('home:musilist');
    let data1 = null;
    if (rdssj != null) {
      data1 = JSON.parse(await rdssj);
    } else {
      let e = {};
      data1 = await this.musilisthc(e);
      await this.redisService.set(
        'home:musilist',
        JSON.stringify(data1),
        'EX',
        3600
      );
    }
    return data1;
  }

  async musilisthc(musilist) {
    // 定义接受参数字段
    const result = await makeHttpRequest(
      '',
      {
        method: 'GET',
        dataType: 'json',
      }
    );
    return result.data;
    // throw new CoolCommException(data);
  }
  /**
   * csdn列表
   *
   */
  async csdnlist(csdnlist) {
    // 定义接受参数字段
    const rdssj = await this.redisService.get('home:csdnlist');
    let data1 = null;
    if (rdssj != null) {
      data1 = JSON.parse(await rdssj);
    } else {
      let e = {};
      data1 = await this.csdnlisthc(e);
      await this.redisService.set(
        'home:csdnlist',
        JSON.stringify(data1),
        'EX',
        3600
      );
    }
    return data1;
    // throw new CoolCommException(data);
  }
  async csdnlisthc(csdnlist) {
    // 定义接受参数字段


    const result = await makeHttpRequest(
      'https://blog.csdn.net/phoenix/web/blog/hot-rank?page=0&pageSize=20&type=',
      {
        method: 'GET',
        headers: {},
        dataType: 'json',
      }
    );
    let data1 = result.data.data;
    let data2 = [];
    for (let index = 0; index < 10; index++) {
      let fordata = {
        rank: index+1,
        keyword: data1[index].articleTitle,
        url: data1[index].articleDetailUrl,
        summary: data1[index].picList,
        hotRankScore: data1[index].hotRankScore,
        pcHotRankScore: data1[index].pcHotRankScore,
      };
      data2.push(fordata);
    }
    return data2;
    // throw new CoolCommException(data);
  }
  /**
   * 微博列表
   *
   */
  async wblist(wblist) {
    // 定义接受参数字段
    const rdssj = await this.redisService.get('home:wblist');
    let data1 = null;
    if (rdssj != null) {
      data1 = JSON.parse(await rdssj);
    } else {
      let e = {};
      data1 = await this.wblisthc(e);
      await this.redisService.set(
        'home:wblist',
        JSON.stringify(data1),
        'EX',
        3600
      );
    }
    return data1;
    // throw new CoolCommException(data);
  }
  /**
   * 过滤新闻
   * @param {*} str
   * @returns
   */
  async wbfilterNew(str) {
    const reg = /">([\u4E00-\u9FA5]([0-9])?)+<\/a>+/g;
    let arr = str.match(reg);
    return arr.map(i => {
      return i.replace(/(<\/a>)|(">)/g, '');
    });
  }
  async wblisthc(wblist) {
    // 定义接受参数字段



    const result = await makeHttpRequest(
      'https://s.weibo.com/top/summary?cate=realtimehot',
      {
        method: 'GET',
        headers: {
          cookie:
            'SUB=_2AkMV-IYcf8NxqwFRmPwTzmzgbIt_zgzEieKjpHfHJRMxHRl-yT8XqmgdtRB6Pnio8wn8xADQqELfOMOVo42fEuQcnuKt; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9W5G2kLfemv2VgdoFJr1QAHW; SINAGLOBAL=9758039919259.438.1655130528669; _s_tentry=www.wpjawz.cn; Apache=3287920810336.216.1655547900092; ULV=1655547900152:2:2:2:3287920810336.216.1655547900092:1655130528751; UOR=www.wpjawz.cn,s.weibo.com,www.baidu.com',
        },
        dataType: 'text',
      }
    );
    let data1 = await this.wbfilterNew(result.data);
    let data2 = [];
    for (let index = 0; index < 10; index++) {
      let fordata = {
        rank: index+1,
        keyword: data1[index],
        url:
          'https://s.weibo.com/weibo?q=%23' +
          encodeURI(data1[index]) +
          '%23&Refer=new_time',
      };
      data2.push(fordata);
    }
    return data2;
    // throw new CoolCommException(data);
  }
  /**
   * 百度列表
   *
   */
  async bdlist(bdlist) {
    // 定义接受参数字段
    const rdssj = await this.redisService.get('home:bdlist');
    let data1 = null;
    if (rdssj != null) {
      data1 = JSON.parse(await rdssj);
    } else {
      let e = {};
      data1 = await this.bdlisthc(e);
      await this.redisService.set(
        'home:bdlist',
        JSON.stringify(data1),
        'EX',
        3600
      );
    }
    return data1;
    // throw new CoolCommException(data);
  }
  /**
   * 过滤新闻
   * @param {*} str
   * @returns
   */
  async bdfilterNew(str) {
    const reg = /word":"([\s\S]*?)?"/g;
    let arr = str.match(reg);
    return arr.map(i => {
      return i.replace(/(word":)|(")/g, '');
    });
  }
  async bdlisthc(bdlist) {
    // 定义接受参数字段
    //

    const result = await makeHttpRequest(
      'https://top.baidu.com/board?tab=realtime',
      {
        method: 'GET',
        headers: {
          cookie:
            'PSTM=1654729522; BAIDUID=C5B998952A22431AD52742B60A21F725:FG=1; BIDUPSID=C772654BFE990549E6649CDBB1053A71; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BDSFRCVID_BFESS=hyuOJeC62l6ypaTDG_JJ29PJlfS_AG3TH6ao3gCMj5LiITAxsXJ7EG0P8U8g0KubzcDrogKK0mOTHUFF_2uxOjjg8UtVJeC6EG0Ptf8g0f5; H_BDCLCKID_SF_BFESS=tJIe_C-atC-3fP36q4rVhP4Sqxby26n3M6T9aJ5nJDoSM4Tx-qOUQp4pyGK8QUTQ5H7d5l0bQpP-HJARbUbYM6LTMtrn3RveygLfKl0MLInlbb0xynoD24tvKxnMBMPjamOnaU5I3fAKftnOM46JehL3346-35543bRTLnLy5KJtMDcnK4-Xj5o0jGoP; H_PS_PSSID=36551_36463_36597_36455_36537_34812_36424_36165_36570_36654_36520_36344_26350_36469; BA_HECTOR=2ha184848g858k2la51haspv215; ZFY=n:A:B3EcV7ctVE8aZOxLv5j7:B1dV57sbgiYkBwYxTYc00:C; BAIDUID_BFESS=C5B998952A22431AD52742B60A21F725:FG=1; delPer=0; PSINO=1',
        },
        dataType: 'text',
      }
    );
    let data1 = await this.bdfilterNew(result.data);
    let data2 = [];
    for (let index = 0; index < 10; index++) {
      let fordata = {
        rank: index + 1,
        keyword: data1[index],
        url:
          'https://www.baidu.com/s?wd=' +
          encodeURI(data1[index]) +
          '&sa=fyb_news&rsv_dl=fyb_news',
      };
      data2.push(fordata);
    }
    return data2;
    // throw new CoolCommException(data);
  }
  /**
   * 获取自定义导航列表
   *
   */
  async mynavigationlist(mynavigationlist) {
    // 定义接受参数字段
    const userId2 = this.ctx.Adminapp.userId;
    const data = await this.ManageHomeMynavigationUrlEntity.find({
      where: {
        userId: userId2,
      },
    });
    return data;
    // throw new CoolCommException(data);
  }
  /**
   * 新增自定义导航列表
   *
   */
  async mynavigationadd(mynavigationadd: MynavigationaddDTO) {
    // 定义接受参数字段
    const userId2 = this.ctx.Adminapp.userId;
    const { name, isCs, isPush, url } = mynavigationadd;

    await this.ManageHomeMynavigationUrlEntity.insert({
      name: name,
      userId: userId2,
      isCs: isCs,
      url: url,
      isPush: isPush,
    });
    const result = {
      msg: '新增成功',
    };
    return result;
    // throw new CoolCommException(data);
  }
  /**
   * 修改自定义导航列表
   *
   */
  async mynavigationmodify(mynavigationmodify: MynavigationmodifyDTO) {
    // 定义接受参数字段
    const userId2 = this.ctx.Adminapp.userId;
    const { id, name, isCs, isPush, url } = mynavigationmodify;

    await this.ManageHomeMynavigationUrlEntity.update(
      { id: id },
      {
        name: name,
        userId: userId2,
        isCs: isCs,
        url: url,
        isPush: isPush,
      }
    );

    const result = {
      msg: '修改成功',
    };
    return result;
    // throw new CoolCommException(data);
  }
  /**
   * 自定义导航列表删除
   *
   */
  async mynavigationdelete(mynavigationdelete: MynavigationdeleteDTO) {
    const { id } = mynavigationdelete;
    // 定义接受参数字段

    let photoToRemove = await this.ManageHomeMynavigationUrlEntity.findOne(id);
    await this.ManageHomeMynavigationUrlEntity.remove(photoToRemove);
    const result = {
      msg: '删除成功',
    };
    return result;
  }
}
