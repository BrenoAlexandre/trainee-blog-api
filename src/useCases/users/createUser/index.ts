import UserRepository from '../../../database/repositories/user.repository';
import { CreateUserController } from './createUser.controller';
import { CreateUserUseCase } from './createUserUseCase';

const userRepository = UserRepository;

const useCase = new CreateUserUseCase(userRepository);
const controller = new CreateUserController(useCase);

export default controller;
