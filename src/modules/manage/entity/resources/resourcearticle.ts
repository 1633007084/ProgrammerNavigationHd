import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, Index } from 'typeorm';

/**
 * 资源文章
 */
@EntityModel('manage_resources_resourcearticle')
export class ManageResourcesResourcearticleEntity extends BaseEntity {
  @Index()
  @Column({ comment: '标题' })
  name: string;
  @Column({ comment: '标签' })
  label: string;
  @Column({ comment: '图片' })
  imgurl: string;
  @Column({ comment: '简介' })
  briefintroduction: string;
  @Column({ comment: '绑定分类id' })
  bindingId: number;
  @Column({ comment: '内容', type: 'text' })
  content: string;
  @Column({ comment: '付费内容' })
  paidcontent: string;
  // 是否启用
  @Column({ comment: '启用状态 0:否 1：是', default: 0 })
  enablestatus: number;

  @Column({ comment: '优先级', default: 100 })
  priority: number;
}
