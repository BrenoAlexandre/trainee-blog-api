import { UserRepository } from '../../../services/implementation/UserRepository';
import { CreateUserController } from './createUser.controller';
import { CreateUserUseCase } from './createUserUseCase';

const userRepository = new UserRepository();

const useCase = new CreateUserUseCase(userRepository);
export const controller = new CreateUserController(useCase);
