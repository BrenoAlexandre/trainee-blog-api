/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import Base from './Base.Entity';
import User from './User.Entity';
import Post from './Post.Entity';

@Entity('categories')
export default class Category extends Base {
  @Column()
  public title: string;

  // @Column({ length: 5, unique: true })
  // public abbreviation: string;

  // @Column({ length: 6 })
  // public color: string;

  @ManyToOne(() => User, (owner) => owner.categories)
  public owner: User[];

  @OneToMany(() => Post, (post) => post.category)
  public posts: Post[];
}
