import { EntityRepository, Repository } from 'typeorm';
import { ICreateCategory } from '../../models/category.model';
import Category from '../entities/Category.Entity';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  public async createCategory(data: ICreateCategory): Promise<Category> {
    const { title, owner } = data;
    const category = this.create({ title, owner });
    const newCategory = await this.save(category);
    return newCategory;
  }

  public async findCategoryById(id: string): Promise<Category | null> {
    const category = await this.createQueryBuilder('category')
      .select('category')
      .where('category.id = :id', { id })
      .leftJoinAndSelect('category.owner', 'owner')
      .execute();
    if (!category) return null;
    return category;
  }

  public async findCategoryPosts(id: string): Promise<Category | null> {
    const category = await this.createQueryBuilder('category')
      .select('category')
      .where('category.id = :id', { id })
      .leftJoinAndSelect('category.posts', 'post')
      .execute();
    if (!category) return null;
    return category;
  }

  public async findCategories(): Promise<Category[]> {
    const categories = await this.find();
    if (!categories) return [];
    return categories;
  }

  public async deleteCategory(id: string): Promise<void> {
    await this.delete(id);
  }
}

export default CategoryRepository;
