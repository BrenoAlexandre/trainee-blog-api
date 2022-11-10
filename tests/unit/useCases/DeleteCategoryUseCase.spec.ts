import 'reflect-metadata';
import { container } from 'tsyringe';
import { FakeCategoryService } from '../../../src/services/fakes/FakeCategoryService';
import { DeleteCategoryUseCase } from '../../../src/useCases/categories/deleteCategory/DeleteCategoryUseCase';

beforeAll(() => {
  container.clearInstances();
});

describe('DeleteCategoryUseCase', () => {
  const fakeService = new FakeCategoryService();
  const sut = new DeleteCategoryUseCase(fakeService);
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
    test('be able to delete a category', async () => {
      await expect(
        sut.execute({
          categoryId: '123',
          userRole: fakeUser[0].role,
        })
      ).resolves.not.toThrow();
    });
  });

  describe('Should not', () => {
    test('be able to delete a category - FORBIDDEN_OPERATION', async () => {
      await expect(
        sut.execute({
          categoryId: '1234',
          userRole: fakeUser[1].role,
        })
      ).rejects.toThrowError('FORBIDDEN_OPERATION');
    });

    test('be able to delete a category - CATEGORY_NOT_FOUND', async () => {
      await expect(
        sut.execute({
          categoryId: '12',
          userRole: fakeUser[0].role,
        })
      ).rejects.toThrowError('CATEGORY_NOT_FOUND');
    });
  });
});
