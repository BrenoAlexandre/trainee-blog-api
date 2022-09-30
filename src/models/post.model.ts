import Category from '../database/entities/Category.Entity';
import User from '../database/entities/User.Entity';

export interface IPost {
  id: string;
  title: string;
  description: string;
  likes: number;
  owner: Omit<User, 'password'>;
  category: Category;
}

export interface ICreatePost {
  title: string;
  description: string;
  likes: number;
  owner: string;
  category: string;
}

export interface IUpdatePost {
  title: string;
  description: string;
  category: Category;
}
