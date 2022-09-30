import { ICreateCategory } from '../../models/category.model';
import Category from '../entities/Category.Entity';
import { AppDataSource } from '../ormconfig';

const categoryRepository = AppDataSource.getRepository(Category).extend({
  async createCategory(data: ICreateCategory): Promise<Category> {
    const { title, owner } = data;
    const category = this.create({ title, owner });
    const newCategory = await this.save(category);
    return newCategory;
  },
  async findCategoryById(id: string): Promise<Category | null> {
    const category = await this.createQueryBuilder('category')
      .where('id = :id', { id })
      .leftJoinAndSelect('category.owner', 'owner')
      .execute();
    if (!category) return null;
    return category;
  },
  async findCategoryPosts(id: string): Promise<Category | null> {
    const category = await this.createQueryBuilder('category')
      .where('id = :id', { id })
      .leftJoinAndSelect('category.posts', 'post')
      .execute();
    if (!category) return null;
    return category;
  },
  async findCategories(): Promise<Category[]> {
    const categories = await this.find();
    if (!categories) return [];
    return categories;
  },
  async deleteCategory(id: string): Promise<void> {
    await this.delete(id);
  },
});

export default categoryRepository;
