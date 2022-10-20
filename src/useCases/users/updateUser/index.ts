import { UserRepository } from '../../../services/implementation/UserRepository';
import { UpdateUserController } from './updateUser.controller';
import { UpdateUserUseCase } from './updateUserUseCase';

const userRepository = new UserRepository();

const useCase = new UpdateUserUseCase(userRepository);
const controller = new UpdateUserController(useCase);

export default controller;
