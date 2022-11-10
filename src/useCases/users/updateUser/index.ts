import { UserService } from '../../../services/implementation/UserService';
import { UpdateUserController } from './updateUser.controller';
import { UpdateUserUseCase } from './updateUserUseCase';

const userRepository = new UserService();

const useCase = new UpdateUserUseCase(userRepository);
const controller = new UpdateUserController(useCase);

export default controller;
