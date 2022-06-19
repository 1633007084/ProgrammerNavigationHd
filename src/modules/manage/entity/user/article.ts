import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, Index } from 'typeorm';

/**
 * 系统用户
 */
@EntityModel('manage_user_article')
export class ManageUserArticleEntity extends BaseEntity {
  // insert(arg0: { type: number; name: string; heading: string; subheading: string; content: string; paidcontent: string; paymentLevel: string; headImg: string; status: string; }) {
  //   throw new Error('Method not implemented.');
  // }
  @Index()
  @Column({ comment: '类型', default: 1, type: 'tinyint', nullable: true })
  type: number;

  @Column({ comment: '发布人', nullable: true })
  name: string;

  @Column({ comment: '拥有人', nullable: true })
  owner: string;

  @Column({ comment: '标题' })
  heading: string;

  @Column({ comment: '副标题', nullable: true })
  subheading: string;

  @Column({ comment: '内容', type: 'text', nullable: true })
  content: string;

  @Column({ comment: '付费内容', nullable: true })
  paidcontent: string;

  @Column({
    comment: '查看付费等级',
    default: 1,
    type: 'tinyint',
  })
  paymentLevel: number;

  @Column({ comment: '头像', nullable: true })
  headImg: string;

  @Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' })
  status: number;
}
