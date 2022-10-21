import * as Express from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Route, SuccessResponse, Post, Request, Tags } from 'tsoa';
import CreatePostUseCase from './createPostUseCase';
import { ICreatePostInput } from './interfaces';

@Route('post')
export class CreatePostController {
  constructor(private createPostUseCase: CreatePostUseCase) {}

  @Tags('Posts')
  @SuccessResponse(StatusCodes.CREATED, ReasonPhrases.CREATED)
  @Post()
  public async handler(@Request() request: Express.Request) {
    const { body } = request;
    const { title, description, category, likes = 0, user } = body;

    const data: ICreatePostInput = {
      title,
      description,
      likes,
      category,
      owner: user.id,
    };

    const newPost = await this.createPostUseCase.execute(data);
    return newPost;
  }
}
