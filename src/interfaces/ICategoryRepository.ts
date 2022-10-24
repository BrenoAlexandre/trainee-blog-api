import Category from '../database/entities/Category.Entity';
import { ICreateCategory } from '../models/category.model';

export interface ICategoryRepository {
  createCategory(data: ICreateCategory): Promise<Category>;
  findCategoryById(id: string): Promise<Category | null>;
  findCategoryPosts(
    id: string,
    order?: 'ASC' | 'DESC'
  ): Promise<Category | null>;
  findCategories(order?: 'ASC' | 'DESC'): Promise<Category[]>;
  updateCategory(categoryId: string, title: string): Promise<boolean>;
  deleteCategory(id: string): Promise<boolean>;
}
