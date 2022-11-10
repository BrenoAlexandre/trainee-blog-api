import 'reflect-metadata';
import { container } from 'tsyringe';
import { FakeCategoryService } from '../../../src/services/fakes/FakeCategoryService';
import { CreateCategoryUseCase } from '../../../src/useCases/categories/createCategory/createCategoryUseCase';

beforeAll(() => {
  container.clearInstances();
});

describe('CreateCategoryUseCase', () => {
  const fakeService = new FakeCategoryService();
  const sut = new CreateCategoryUseCase(fakeService);
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

  describe('Should be', () => {
    test('able to create a category', async () => {
      const newRepo = await sut.execute({
        input: { title: 'Test', owner: fakeUser[0].id },
        userRole: fakeUser[0].role,
      });

      expect(newRepo).toHaveProperty('id');
    });
  });

  describe('Should not be', () => {
    test('able to create a category - FORBIDDEN_OPERATION', async () => {
      await expect(
        sut.execute({
          input: { title: 'Test error', owner: fakeUser[1].id },
          userRole: fakeUser[1].role,
        })
      ).rejects.toThrowError(`FORBIDDEN_OPERATION`);
    });
  });
});
