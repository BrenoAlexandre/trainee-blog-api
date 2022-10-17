import { FindUserController } from './findUser.controller';
import { FindUserUseCase } from './findUserUseCase';
import UserRepository from '../../../database/repositories/user.repository';

const userRepository = UserRepository;

const useCase = new FindUserUseCase(userRepository);
const controller = new FindUserController(useCase);

export default controller;
