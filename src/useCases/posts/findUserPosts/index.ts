import PostRepository from '../../../database/repositories/post.repository';
import { FindUserPostsController } from './findUserPosts.controller';
import { FindUserPostsUseCase } from './findUserPostsUseCase';

const postRepository = PostRepository;

const useCase = new FindUserPostsUseCase(postRepository);
const controller = new FindUserPostsController(useCase);

export default controller;
