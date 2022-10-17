import PostRepository from '../../../database/repositories/post.repository';
import { FindCategoryPostsController } from './findCategoryPosts.controller';
import { FindCategoryPostsUseCase } from './findCategoryPostsUseCase';

const postRepository = PostRepository;

const useCase = new FindCategoryPostsUseCase(postRepository);
const controller = new FindCategoryPostsController(useCase);

export default controller;
