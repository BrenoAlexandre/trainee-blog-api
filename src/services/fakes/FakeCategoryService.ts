import CategoryEntity from '../../database/entities/Category.Entity';
import User from '../../database/entities/User.Entity';
import { ICategoryRepository } from '../../interfaces';
import { ICreateCategory } from '../../models/category.model';

export class FakeCategoryService implements ICategoryRepository {
  private fakeUsers: User[] = [
    {
      id: 'AN4JK465BU5YGF65TY29878',
      name: 'admin',
      email: 'admin@mail.com',
      password: '',
      posts: [],
      role: 'admin',
      categories: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  private fakeRepo: CategoryEntity[] = [
    {
      id: '123',
      title: 'Category to be deleted',
      owner: 'AN4JK465BU5YGF65TY29878',
      posts: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '1234',
      title: 'Category not to be deleted',
      owner: 'AN4JK465BU5YGF65TY29878',
      posts: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  public createCategory = async (
    data: ICreateCategory
  ): Promise<CategoryEntity> => {
    const user =
      this.fakeUsers.find((fakeUser) => fakeUser.id === data.owner) ||
      this.fakeUsers[0];

    const newCategory: CategoryEntity = {
      id: `${Math.floor(Math.random() * 20 - 1)}`,
      title: data.title,
      owner: user.id,
      posts: [],
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.fakeRepo.push(newCategory);
    user.categories.push(newCategory);

    const updatedUsers = this.fakeUsers.map((fakeUser) => {
      if (fakeUser.id === user.id) {
        return user;
      }
      return fakeUser;
    });

    this.fakeUsers = updatedUsers;

    return newCategory;
  };

  public findCategoryById = async (
    id: string
  ): Promise<CategoryEntity | null> => {
    const foundCategory = this.fakeRepo.find((category) => category.id === id);
    if (!foundCategory) return null;
    return foundCategory;
  };

  public findCategoryPosts = async (
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    order?: 'ASC' | 'DESC' | undefined
  ): Promise<CategoryEntity | null> => {
    const foundCategory = this.fakeRepo.find((category) => category.id === id);
    if (!foundCategory) return null;
    return foundCategory;
  };

  public findCategories = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    order?: 'ASC' | 'DESC' | undefined
  ): Promise<CategoryEntity[]> => {
    const categories = this.fakeRepo;
    return categories.reverse();
  };

  public updateCategory = async (
    categoryId: string,
    title: string
  ): Promise<boolean> => {
    let isUpdated = false;

    const updatedRepo = this.fakeRepo.map((category) => {
      if (category.id === categoryId) {
        isUpdated = true;
        return { ...category, title };
      }
      return category;
    });

    this.fakeRepo = updatedRepo;

    return isUpdated;
  };

  public deleteCategory = async (id: string): Promise<boolean> => {
    const foundCategory = this.fakeRepo.find((category) => category.id === id);
    if (foundCategory) {
      const filteredRepo = this.fakeRepo.filter(
        (category) => category.id !== id
      );
      this.fakeRepo = filteredRepo;

      return true;
    }
    return false;
  };
}
