import { EntityRepository, Repository } from 'typeorm';
import { ICreateCategory } from '../../models/category.model';
import Category from '../entities/Category.Entity';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  public async createCategory(data: ICreateCategory): Promise<Category> {
    const category = this.create(data);
    const newCategory = await this.save(category);
    return newCategory;
  }

  public async findCategoryById(id: string): Promise<Category | null> {
    const category = await this.findOne(id);
    if (!category) return null;
    return category;
  }

  public async findCategories(): Promise<Category[] | null> {
    const categories = await this.find();
    if (!categories) return null;
    return categories;
  }

  public async deleteCategory(id: string): Promise<void> {
    await this.delete(id);
  }
}

export default CategoryRepository;
