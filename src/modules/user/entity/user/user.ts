import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, Index } from 'typeorm';

/**
 * 系统用户
 */
@EntityModel('user_user_user')
export class UserUserUserEntity extends BaseEntity {
  @Column({ comment: '姓名', nullable: true })
  name: string;

  @Column({ comment: '昵称', nullable: true })
  nickName: string;

  @Column({ comment: '头像', nullable: true })
  headImg: string;
  @Column({ comment: '地区', nullable: true })
  region: string;

  @Index()
  @Column({ comment: '手机', nullable: true, length: 20 })
  phone: string;

  @Column({ comment: '邮箱', nullable: true })
  email: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;
  @Column({ comment: '会员等级', default: 1, type: 'tinyint' })
  membershiplevel: number;

  @Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' })
  status: number;

  @Column({ comment: 'socketId', nullable: true })
  socketId: string;

  @Column({ comment: '抖音unionid', nullable: true })
  unionid: string;

  @Column({ comment: '用户 ID' })
  openid: string;

}
