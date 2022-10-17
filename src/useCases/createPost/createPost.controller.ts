import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Route, SuccessResponse, Post, Body } from 'tsoa';
import { ICreatePostInput } from './interfaces';
import logger from '../../config/logger';
import { CreatePostInput } from '../../schemas/post.schema';
import CreatePostUseCase from './createPostUseCase';

@Route('Users')
export class CreatePostController {
  constructor(private createPostService: CreatePostUseCase) {}

  @SuccessResponse(StatusCodes.CREATED, ReasonPhrases.CREATED)
  @Post()
  public async handler(
    @Body() request: Request<{}, {}, CreatePostInput['body']>,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { user } = response.locals;
      const { body } = request;
      const { title, description, category, likes = 0 } = body;

      const data: ICreatePostInput = {
        title,
        description,
        likes,
        category,
        owner: user.id,
      };

      const newPost = await this.createPostService.execute(data);
      response.status(StatusCodes.CREATED).json(newPost);
    } catch (error) {
      logger.error(`createPostController :>> ${error}`);
      next(error);
    }
  }
}
