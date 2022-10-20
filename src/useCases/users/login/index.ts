import { UserRepository } from '../../../services/implementation/UserRepository';
import { LoginController } from './login.controller';
import { LoginUseCase } from './loginUseCase';

const userRepository = new UserRepository();

const useCase = new LoginUseCase(userRepository);
const controller = new LoginController(useCase);

export default controller;
