import Category from '../database/entities/Category.Entity';
import User from '../database/entities/User.Entity';

export interface PostInput {
  title: string;
  description: string;
  owner: User;
  category: Category;
}
