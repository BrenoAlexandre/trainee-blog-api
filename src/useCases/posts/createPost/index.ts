import PostRepository from '../../../database/repositories/post.repository';
import { CreatePostController } from './createPost.controller';
import CreatePostService from './createPostUseCase';

const postRepository = PostRepository;

const service = new CreatePostService(postRepository);
const controller = new CreatePostController(service);

export default controller;
