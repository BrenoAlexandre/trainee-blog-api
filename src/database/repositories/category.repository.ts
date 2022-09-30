import AppDataSource from '../dataSource';
import { ICreateCategory } from '../../models/category.model';
import Category from '../entities/Category.Entity';

const categoryRepository = AppDataSource.getRepository(Category).extend({
  async createCategory(data: ICreateCategory): Promise<Category> {
    const { title, owner } = data;
    const category = this.create({ title, owner });
    const newCategory = await this.save(category);
    return newCategory;
  },
  async findCategoryById(id: string): Promise<Category | null> {
    const category = await this.createQueryBuilder('category')
      .where('category.id = :id', { id })
      .leftJoinAndSelect('category.owner', 'owner')
      .select(['category.id', 'category.title'])
      .getOne();

    if (!category) return null;
    return category;
  },
  async findCategoryPosts(
    id: string,
    order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<Category | null> {
    const category = await this.createQueryBuilder('category')
      .where('category.id = :id', { id })
      .leftJoinAndSelect('category.posts', 'post')
      .select([
        'category.id',
        'category.title',
        'post.id',
        'post.title',
        'post.description',
        'post.likes',
        'post.created_at',
      ])
      .orderBy('category.created_at', order)
      .execute();
    if (!category) return null;
    return category;
  },
  async findCategories(order: 'ASC' | 'DESC' = 'ASC'): Promise<Category[]> {
    const categories = await this.createQueryBuilder('category')
      .innerJoinAndSelect('category.owner', 'owner')
      .select(['category.id', 'category.title', 'owner.name'])
      .orderBy('category.created_at', order)
      .getMany();

    if (!categories) return [];
    return categories;
  },
  async updateCategory(categoryId: string, title: string): Promise<boolean> {
    const updateResult = await this.createQueryBuilder('category')
      .update(Category)
      .set({ title })
      .where('id = :categoryId', {
        categoryId,
      })
      .execute();

    return updateResult ? !!updateResult.affected : false;
  },
  async deleteCategory(id: string): Promise<boolean> {
    const deleteResult = await this.delete(id);
    return !!deleteResult.affected;
  },
});

export default categoryRepository;
