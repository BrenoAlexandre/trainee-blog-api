/* eslint-disable import/no-cycle */
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Base from './Base.Entity';
import User from './User.Entity';
import Post from './Post.Entity';

@Entity('categories')
export default class Category extends Base {
  @Column()
  public title: string;

  @ManyToOne(() => User, (owner) => owner.categories)
  @JoinColumn({ name: 'id' })
  public owner: Omit<User, 'password'>;

  @OneToMany(() => Post, (post) => post.category)
  public posts: Post[];
}
