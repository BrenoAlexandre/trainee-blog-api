import PostRepository from '../../../database/repositories/post.repository';
import { FindPostsController } from './findPosts.controller';
import { FindPostsUseCase } from './findPostsUseCase';

const postRespository = PostRepository;

const useCase = new FindPostsUseCase(postRespository);
const controller = new FindPostsController(useCase);

export default controller;
