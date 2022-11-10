import { UserService } from '../../../services/implementation/UserService';
import { CreateUserController } from './createUser.controller';
import { CreateUserUseCase } from './createUserUseCase';

const userRepository = new UserService();

const useCase = new CreateUserUseCase(userRepository);
export const controller = new CreateUserController(useCase);
