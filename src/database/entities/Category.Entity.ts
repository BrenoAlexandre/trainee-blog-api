/* eslint-disable import/no-cycle */
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Base from './Base.Entity';
import User from './User.Entity';
import Post from './Post.Entity';

@Entity('categories')
export default class Category extends Base {
  @Column({ unique: true })
  public title: string;

  @ManyToOne(() => User, (owner) => owner.categories, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'owner_id' })
  public owner: string;

  @OneToMany(() => Post, (post) => post.category)
  public posts: Post[];
}
