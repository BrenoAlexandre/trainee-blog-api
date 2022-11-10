import CategoryEntity from '../database/entities/Category.Entity';
import { ICreateCategory } from '../models/category.model';

export interface ICategoryRepository {
  createCategory(data: ICreateCategory): Promise<CategoryEntity>;
  findCategoryById(id: string): Promise<CategoryEntity | null>;
  findCategoryPosts(
    id: string,
    order?: 'ASC' | 'DESC'
  ): Promise<CategoryEntity | null>;
  findCategories(order?: 'ASC' | 'DESC'): Promise<CategoryEntity[]>;
  updateCategory(categoryId: string, title: string): Promise<boolean>;
  deleteCategory(id: string): Promise<boolean>;
}
