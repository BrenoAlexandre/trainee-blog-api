/* eslint-disable import/no-cycle */
import { Column, Entity, OneToMany } from 'typeorm';
import Base from './Base.Entity';
import Post from './Post.Entity';
import Category from './Category.Entity';

@Entity('users')
export default class User extends Base {
  @Column({ length: 120 })
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  public role: string;

  @OneToMany(() => Post, (post) => post.owner)
  public posts: Post[];

  @OneToMany(() => Category, (category) => category.owner)
  public categories: Category[];
}
