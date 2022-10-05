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

  @ManyToOne(() => Category, (category) => category.posts, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  public category: string;

  @ManyToOne(() => User, (owner) => owner.posts, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'owner_id' })
  public owner: string;
}
