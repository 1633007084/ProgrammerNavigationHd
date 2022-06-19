import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, Index } from 'typeorm';

/**
 * 资源分类
 */
@EntityModel('manage_resources_resourceclassification')
export class ManageResourcesResourceclassificationEntity extends BaseEntity {
  @Index()
  @Column({ comment: '分类名', nullable: true })
  name: string;

  @Column({ comment: '图片' })
  imgurl: string;
  // 是否启用
  @Column({ comment: '启用状态 0:否 1：是', default: 0 })
  enablestatus: number;

  @Column({ comment: '优先级', default: 100 })
  priority: number;
}
