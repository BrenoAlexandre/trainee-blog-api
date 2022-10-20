import { UserRepository } from '../../../services/implementation/UserRepository';
import { FindUserController } from './findUser.controller';
import { FindUserUseCase } from './findUserUseCase';

const userRepository = new UserRepository();

const useCase = new FindUserUseCase(userRepository);
const controller = new FindUserController(useCase);

export default controller;
