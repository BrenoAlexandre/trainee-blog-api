import AppDataSource from '../dataSource';
import { ICreatePost, IUpdatePost } from '../../models/post.model';
import Post from '../entities/Post.Entity';
import { IFindParams } from '../../interfaces/IFindParams';

const postRepository = AppDataSource.getRepository(Post).extend({
  async createPost(data: ICreatePost): Promise<Post> {
    const post = this.create(data);
    const newPost = await this.save(post);
    return newPost;
  },
  async findPostById(postId: string): Promise<Post | null> {
    const post = await this.createQueryBuilder('post')
      .where('post.id = :postId', { postId })
      .innerJoinAndSelect('post.owner', 'owner')
      .innerJoinAndSelect('post.category', 'category')
      .select([
        'post.id',
        'post.title',
        'post.description',
        'post.likes',
        'post.created_at',
        'owner.id',
        'owner.name',
        'category.id',
        'category.title',
      ])
      .getOne();

    if (!post) return null;
    return post;
  },
  async findPosts({ pagination, order }: IFindParams): Promise<Post[]> {
    const posts = await this.createQueryBuilder('post')
      .innerJoinAndSelect('post.owner', 'owner')
      .innerJoinAndSelect('post.category', 'category')
      .select([
        'post.id',
        'post.title',
        'post.description',
        'post.likes',
        'post.created_at',
        'owner.id',
        'owner.name',
        'category.id',
        'category.title',
      ])
      .skip(pagination.page * pagination.take)
      .take(pagination.take)
      .orderBy('post.created_at', order)
      .getMany();

    if (!posts) return [];
    return posts;
  },
  async findPostsByCategory(
    categoryId: string,
    order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<Post[]> {
    //! Implementar paginação
    const posts = await this.createQueryBuilder('post')
      .where('post.category = :categoryId', { categoryId })
      .innerJoinAndSelect('post.owner', 'owner')
      .innerJoinAndSelect('post.category', 'category')
      .select([
        'post.id',
        'post.title',
        'post.description',
        'post.likes',
        'post.created_at',
        'owner.id',
        'owner.name',
        'category.id',
        'category.title',
      ])
      .orderBy('post.created_at', order)
      .getMany();

    if (!posts) return [];
    return posts;
  },
  async findPostsByOwner(
    ownerId: string,
    order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<Post[]> {
    //! Implementar paginação
    const posts = await this.createQueryBuilder('post')
      .where('post.owner = :ownerId', { ownerId })
      .innerJoinAndSelect('post.owner', 'owner')
      .innerJoinAndSelect('post.category', 'category')
      .select([
        'post.id',
        'post.title',
        'post.description',
        'post.likes',
        'post.created_at',
        'owner.id',
        'owner.name',
        'category.id',
        'category.title',
      ])
      .orderBy('post.created_at', order)
      .getMany();

    if (!posts) return [];
    return posts;
  },
  async patchPost(data: IUpdatePost): Promise<boolean> {
    const { title, description, categoryId, postId, ownerId } = data;
    const patchBlock = { title, description, category: categoryId };
    const updateResult = await this.createQueryBuilder('post')
      .update(Post)
      .set(patchBlock)
      .where('id = :postId', {
        postId,
      })
      .andWhere('owner_id = :ownerId', { ownerId })
      .execute();

    return updateResult ? !!updateResult.affected : false;
  },
  async deletePost(postId: string, userId: string): Promise<boolean> {
    const deleteResult = await this.createQueryBuilder()
      .delete()
      .from(Post)
      .where('id = :postId', {
        postId,
      })
      .andWhere('owner_id = :userId', { userId })
      .execute();

    return !!deleteResult.affected;
  },
});

export default postRepository;
