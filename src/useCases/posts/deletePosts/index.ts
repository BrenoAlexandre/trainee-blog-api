import PostRepository from '../../../database/repositories/post.repository';
import { DeletePostController } from './deletePost.controller';
import { DeletePostUseCase } from './deletePostUseCase';

const postRepository = PostRepository;

const useCase = new DeletePostUseCase(postRepository);
const controller = new DeletePostController(useCase);

export default controller;
