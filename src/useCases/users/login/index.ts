import UserRepository from '../../../database/repositories/user.repository';
import { LoginController } from './login.controller';
import { LoginUseCase } from './loginUseCase';

const userRepository = UserRepository;

const useCase = new LoginUseCase(userRepository);
const controller = new LoginController(useCase);

export default controller;
