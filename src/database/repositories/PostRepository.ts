import { EntityRepository, Repository } from 'typeorm';
import { ICreatePost } from '../../models/post.model';
import Post from '../entities/Post.Entity';

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  public async createPost(data: ICreatePost): Promise<Post> {
    const post = this.create(data);
    const newPost = await this.save(post);
    return newPost;
  }

  public async findPostById(id: string): Promise<Post | null> {
    const post = await this.findOne(id);
    if (!post) return null;
    return post;
  }

  public async findPosts(): Promise<Post[] | null> {
    //! Implementar paginação
    const posts = await this.find();
    if (!posts) return null;
    return posts;
  }

  public async findPostsByCategory(categoryId: string): Promise<Post[] | null> {
    const posts = await this.createQueryBuilder()
      .select()
      .from('posts', 'posts')
      .where('category = categoryId', { categoryId })
      .execute();
    if (!posts) return null;
    return posts;
  }

  public async findPostsByOwner(ownerId: string): Promise<Post[] | null> {
    const posts = await this.createQueryBuilder()
      .select()
      .from('posts', 'posts')
      .where('owner = ownerId', { ownerId })
      .execute();
    if (!posts) return null;
    return posts;
  }

  public async deletePost(id: string): Promise<void> {
    await this.delete(id);
  }
}

export default PostRepository;
