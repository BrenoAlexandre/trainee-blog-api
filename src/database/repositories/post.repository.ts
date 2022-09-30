import AppDataSource from '../dataSource';
import { ICreatePost } from '../../models/post.model';
import Post from '../entities/Post.Entity';

const postRepository = AppDataSource.getRepository(Post).extend({
  async createPost(data: ICreatePost): Promise<Post> {
    const post = this.create(data);
    const newPost = await this.save(post);
    return newPost;
  },
  async findPostById(id: string): Promise<Post | null> {
    const post = await this.createQueryBuilder('post')
      .where('post.id = :id', { id })
      .getOne();
    if (!post) return null;
    return post;
  },
  async findPosts(): Promise<Post[]> {
    //! Implementar paginação
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
        'category.title',
      ])
      .getMany();

    if (!posts) return [];
    return posts;
  },
  async findPostsByCategory(categoryId: string): Promise<Post[]> {
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
        'category.title',
      ])
      .getMany();

    if (!posts) return [];
    return posts;
  },
  async findPostsByOwner(ownerId: string): Promise<Post[]> {
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
        'owner.name',
        'category.title',
      ])
      .getMany();
    if (!posts) return [];
    return posts;
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
