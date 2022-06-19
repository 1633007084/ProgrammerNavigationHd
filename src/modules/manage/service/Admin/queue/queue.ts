import { Provide, Inject, Task, FORMAT } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';
import { CheckclassificationService } from '../home/checkclassification';
// import { makeHttpRequest } from '@midwayjs/core';
@Provide()
export class UserService {
  @Inject()
  CheckclassificationService: CheckclassificationService;
  @Inject()
  redisService: RedisService;
  // 首页定时任务每小时执行分布式任务
  @Task({
    repeat: { cron: FORMAT.CRONTAB.EVERY_HOUR },
  })
  async checkclassificationlisss() {
    const data = {};
    const data1 =
      await this.CheckclassificationService.checkclassificationlisss(data);
    await this.redisService.set(
      'home:checkclassificationlis',
      JSON.stringify(data1),
      'EX',
      3600
    );
    console.log('首页导航列表定时任务');
  }
  // csdn热榜定时任务每小时执行分布式任务
  @Task({
    repeat: { cron: FORMAT.CRONTAB.EVERY_HOUR },
  })
  async csdnlisthc() {
    const data = {};
    const data1 = await this.CheckclassificationService.csdnlisthc(data);
    await this.redisService.set(
      'home:csdnlist',
      JSON.stringify(data1),
      'EX',
      3600
    );
    console.log('csdn列表定时任务');
  }
  // 音乐热榜定时任务每小时执行分布式任务
  @Task({
    repeat: { cron: FORMAT.CRONTAB.EVERY_HOUR },
  })
  async musilisthc() {
    const data = {};
    const data1 = await this.CheckclassificationService.musilisthc(data);
    await this.redisService.set(
      'home:musilist',
      JSON.stringify(data1),
      'EX',
      3600
    );
    console.log('音乐列表定时任务');
  }
  // 微博热榜定时任务每小时执行分布式任务
  @Task({
    repeat: { cron: FORMAT.CRONTAB.EVERY_HOUR },
  })
  async wblisthc() {
    const data = {};
    const data1 = await this.CheckclassificationService.wblisthc(data);
    await this.redisService.set(
      'home:wblist',
      JSON.stringify(data1),
      'EX',
      3600
    );
    console.log('微博列表定时任务');
  }
  // 百度热榜定时任务每小时执行分布式任务
  @Task({
    repeat: { cron: FORMAT.CRONTAB.EVERY_HOUR },
  })
  async bdlisthc() {
    const data = {};
    const data1 = await this.CheckclassificationService.bdlisthc(data);
    await this.redisService.set(
      'home:bdlist',
      JSON.stringify(data1),
      'EX',
      3600
    );
    console.log('百度列表定时任务');
  }
  百度爬虫测试分布式任务;
  // @Task({
  //   repeat: { cron: FORMAT.CRONTAB.EVERY_PER_5_SECOND },
  // })
  // async wbpccs() {
  //   const result = await makeHttpRequest(
  //     'https://top.baidu.com/board?tab=realtime',
  //     {
  //       method: 'GET',
  //       headers: {
  //         cookie:
  //           'PSTM=1654729522; BAIDUID=C5B998952A22431AD52742B60A21F725:FG=1; BIDUPSID=C772654BFE990549E6649CDBB1053A71; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BDSFRCVID_BFESS=hyuOJeC62l6ypaTDG_JJ29PJlfS_AG3TH6ao3gCMj5LiITAxsXJ7EG0P8U8g0KubzcDrogKK0mOTHUFF_2uxOjjg8UtVJeC6EG0Ptf8g0f5; H_BDCLCKID_SF_BFESS=tJIe_C-atC-3fP36q4rVhP4Sqxby26n3M6T9aJ5nJDoSM4Tx-qOUQp4pyGK8QUTQ5H7d5l0bQpP-HJARbUbYM6LTMtrn3RveygLfKl0MLInlbb0xynoD24tvKxnMBMPjamOnaU5I3fAKftnOM46JehL3346-35543bRTLnLy5KJtMDcnK4-Xj5o0jGoP; H_PS_PSSID=36551_36463_36597_36455_36537_34812_36424_36165_36570_36654_36520_36344_26350_36469; BA_HECTOR=2ha184848g858k2la51haspv215; ZFY=n:A:B3EcV7ctVE8aZOxLv5j7:B1dV57sbgiYkBwYxTYc00:C; BAIDUID_BFESS=C5B998952A22431AD52742B60A21F725:FG=1; delPer=0; PSINO=1',
  //       },
  //       dataType: 'text',
  //     }
  //   );
  //   let data1 = await this.bdfilterNew(result.data);
  //   let data2 = [];
  //   for (let index = 0; index < data1.length; index++) {
  //     console.log(data1[index], '000');
  //     let fordata = {
  //       rank: index++,
  //       keyword: data1[index],
  //       url:
  //         'https://www.baidu.com/s?wd=' +
  //         encodeURI(data1[index]) +
  //         '&sa=fyb_news&rsv_dl=fyb_news',
  //     };
  //     data2.push(fordata);
  //   }
  //   console.log(data2);
  //   // await this.redisService.set('home:bdpccs', data1, 'EX', 3600);
  //   console.log('爬虫测试');
  // }
  /**
   * 过滤新闻
   * @param {*} str
   * @returns
   */
  // async bdfilterNew(str) {
  //   const reg = /word":"([\s\S]*?)?"/g;
  //   let arr = str.match(reg);
  //   return arr.map(i => {
  //     return i.replace(/(word":)|(")/g, '');
  //   });
  // }
}
