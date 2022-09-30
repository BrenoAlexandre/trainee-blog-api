import { ICreatePost } from '../../models/post.model';
import Post from '../entities/Post.Entity';
import { AppDataSource } from '../ormconfig';

const postRepository = AppDataSource.getRepository(Post).extend({
  async createPost(data: ICreatePost): Promise<Post> {
    const post = this.create(data);
    const newPost = await this.save(post);
    return newPost;
  },
  async findPostById(id: string): Promise<Post | null> {
    const post = await this.createQueryBuilder('post')
      .where('id = :id', { id })
      .getOne();
    if (!post) return null;
    return post;
  },
  async findPosts(): Promise<Post[]> {
    //! Implementar paginação
    const posts = await this.find();
    if (!posts) return [];
    return posts;
  },
  async findPostsByCategory(categoryId: string): Promise<Post[]> {
    const posts = await this.createQueryBuilder()
      .select('post')
      .from(Post, 'post')
      .where('post.category = :categoryId', { categoryId })
      .leftJoinAndSelect('post.owner', 'owner')
      .leftJoinAndSelect('post.category', 'category')
      .execute();
    if (!posts) return [];
    return posts;
  },
  async findPostsByOwner(ownerId: string): Promise<Post[]> {
    const posts = await this.createQueryBuilder()
      .select('post')
      .from(Post, 'post')
      .where('post.owner = :ownerId', { ownerId })
      .leftJoinAndSelect('post.owner', 'owner')
      .leftJoinAndSelect('post.category', 'category')
      .execute();
    if (!posts) return [];
    return posts;
  },
  async deletePost(id: string): Promise<void> {
    await this.delete(id);
  },
});

export default postRepository;
