import { CreatePostController } from './createPost.controller';
import CreatePostService from './createPostUseCase';

const service = new CreatePostService();
const controller = new CreatePostController(service);

export default controller;
