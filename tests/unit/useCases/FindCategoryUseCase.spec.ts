import 'reflect-metadata';
import { container } from 'tsyringe';
import { FakeCategoryService } from '../../../src/services/fakes/FakeCategoryService';
import { FindCategoryUseCase } from '../../../src/useCases/categories/findCategory/findCategoryUseCase';

beforeAll(() => {
  container.clearInstances();
});

describe('DeleteCategoryUseCase', () => {
  const fakeService = new FakeCategoryService();
  const sut = new FindCategoryUseCase(fakeService);
  const fakeUser = [
    {
      id: `AN4JK465BU5YGF65TY29878`,
      name: 'admin',
      email: 'admin@mail.com',
      role: 'admin',
    },
    {
      id: `5BU29TYN4JK468A5YGF6578`,
      name: 'John Doe',
      email: 'john@doe.com',
      role: 'user',
    },
  ];

  describe('Should', () => {
    test('be able to find a category', async () => {
      const category = await sut.execute('123');

      expect(category.owner).toEqual(fakeUser[0].id);
    });
  });

  describe('Should not', () => {
    test('not be able to find a category - CATEGORY_NOT_FOUND', async () => {
      await expect(sut.execute('321')).rejects.toThrowError(
        'CATEGORY_NOT_FOUND'
      );
    });
  });
});
