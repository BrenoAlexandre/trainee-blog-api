/* eslint-disable import/no-cycle */
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Base from './Base.Entity';
import User from './User.Entity';
import Category from './Category.Entity';

@Entity('posts')
export default class Post extends Base {
  @Column({ length: 100 })
  public title: string;

  @Column()
  public description: string;

  @Column({ default: 0 })
  public likes: number;

  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn({ name: 'id' })
  public category: Category;

  @ManyToOne(() => User, (owner) => owner.posts)
  @JoinColumn({ name: 'id' })
  public owner: Omit<User, 'password'>;
}
