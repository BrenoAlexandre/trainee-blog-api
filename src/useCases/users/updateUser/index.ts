import UserRepository from '../../../database/repositories/user.repository';
import { UpdateUserController } from './updateUser.controller';
import { UpdateUserUseCase } from './updateUserUseCase';

const userRepository = UserRepository;

const useCase = new UpdateUserUseCase(userRepository);
const controller = new UpdateUserController(useCase);

export default controller;
