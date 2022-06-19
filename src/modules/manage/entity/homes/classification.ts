import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, Index } from 'typeorm';

/**
 * 系统用户
 */
@EntityModel('manage_home_classification')
export class ManageHomeClassificationEntity extends BaseEntity {
  @Index()
  @Column({ comment: '分类名', nullable: true })
  name: string;

  @Column({ comment: '分类图片' })
  imgurl: string;

  // 是否客服
  @Column({ comment: '启用状态 0:否 1：是', default: 0 })
  isCs: number;

  @Column({ comment: '优先级', default: 1000 })
  isPush: number;
}
