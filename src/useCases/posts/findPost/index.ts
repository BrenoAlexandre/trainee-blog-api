import PostRepository from '../../../database/repositories/post.repository';

import { FindPostController } from './findPost.controller';
import { FindPostUseCase } from './findPostUseCase';

const postRepository = PostRepository;

const useCase = new FindPostUseCase(postRepository);
const controller = new FindPostController(useCase);

export default controller;
