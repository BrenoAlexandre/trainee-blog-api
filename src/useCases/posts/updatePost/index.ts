import PostRepository from '../../../database/repositories/post.repository';
import { UpdatePostController } from './updatePost.controller';
import { UpdatePostUseCase } from './updatePostUseCase';

const postsRepository = PostRepository;

const useCase = new UpdatePostUseCase(postsRepository);
const controller = new UpdatePostController(useCase);

export default controller;
