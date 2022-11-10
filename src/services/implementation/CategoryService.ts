import CategoryEntity from '../../database/entities/Category.Entity';
import categoryRepository from '../../database/repositories/category.repository';
import { ICategoryRepository as ICategoryService } from '../../interfaces';
import { ICreateCategory } from '../../models/category.model';

export class CategoryService implements ICategoryService {
  public createCategory = async (
    data: ICreateCategory
  ): Promise<CategoryEntity> => {
    const newCategory = await categoryRepository.createCategory(data);
    return newCategory;
  };

  public findCategoryById = async (
    id: string
  ): Promise<CategoryEntity | null> => {
    const category = await categoryRepository.findCategoryById(id);
    return category;
  };

  public findCategoryPosts = async (
    id: string,
    order?: 'ASC' | 'DESC' | undefined
  ): Promise<CategoryEntity | null> => {
    const categoryPosts = await categoryRepository.findCategoryPosts(id, order);
    return categoryPosts;
  };

  public findCategories = async (
    order?: 'ASC' | 'DESC' | undefined
  ): Promise<CategoryEntity[]> => {
    const categories = await categoryRepository.findCategories(order);
    return categories;
  };

  public updateCategory = async (
    categoryId: string,
    title: string
  ): Promise<boolean> => {
    const isUpdated = await categoryRepository.updateCategory(
      categoryId,
      title
    );
    return isUpdated;
  };

  public deleteCategory = async (id: string): Promise<boolean> => {
    const isDeleted = await categoryRepository.deleteCategory(id);
    return isDeleted;
  };
}
