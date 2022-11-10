import { UserService } from '../../../services/implementation/UserService';
import { FindUserController } from './findUser.controller';
import { FindUserUseCase } from './findUserUseCase';

const userRepository = new UserService();

const useCase = new FindUserUseCase(userRepository);
const controller = new FindUserController(useCase);

export default controller;
