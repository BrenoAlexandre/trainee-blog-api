import Category from '../database/entities/Category.Entity';
import { IUser } from './user.model';

export interface IPost {
  id: string;
  title: string;
  description: string;
  likes: number;
  owner: IUser;
  category: Category;
}

export interface ICreatePost {
  title: string;
  description: string;
  ownerId: string;
  categoryId: string;
}

export interface IUpdatePost {
  title: string;
  description: string;
  postId: string;
  ownerId: string;
  categoryId: string;
}
