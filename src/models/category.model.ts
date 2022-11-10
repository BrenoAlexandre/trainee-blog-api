import Post from '../database/entities/Post.Entity';
import User from '../database/entities/User.Entity';

export interface ICategory {
  id: string;
  title: string;
  owner: User;
  posts?: Post[];
}

export interface ICreateCategory {
  title: string;
  owner: string;
}
