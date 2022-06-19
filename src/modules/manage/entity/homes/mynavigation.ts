import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, Index } from 'typeorm';

/**
 * 系统用户
 */
@EntityModel('manage_home_mynavigation')
export class ManageHomeMynavigationUrlEntity extends BaseEntity {
  @Index()
  @Column({ comment: '标题', nullable: true })
  name: string;
  @Column({ comment: '链接' })
  url: string;
  @Column({ comment: '绑定用户id', nullable: true })
  userId: number;
  // 是否客服
  @Column({ comment: '启用状态 0:否 1：是', default: 0 })
  isCs: number;

  @Column({ comment: '优先级', default: 100 })
  isPush: number;
}
