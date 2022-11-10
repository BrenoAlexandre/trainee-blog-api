import { UserService } from '../../../services/implementation/UserService';
import { LoginController } from './login.controller';
import { LoginUseCase } from './loginUseCase';

const userRepository = new UserService();

const useCase = new LoginUseCase(userRepository);
const controller = new LoginController(useCase);

export default controller;
