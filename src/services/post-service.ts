import { Sequelize } from 'sequelize';
import { Post, PostContent } from '../db/index.ts';

export default class PostService {
    private PostModel: typeof Post;
    private PostContentModel: typeof PostContent;
    private SequelizeInstance: Sequelize;
    constructor(
        post: typeof Post,
        postContent: typeof PostContent,
        sequelize: Sequelize,
    ) {
        this.PostModel = post;
        this.PostContentModel = postContent;
        this.SequelizeInstance = sequelize;
    }

    async getPostById(postId: number) {
        return await this.PostModel.findByPk(postId, {
            include: [this.PostContentModel],
        });
    }

    async getPostsByOffset(offset: number) {
        return await this.PostModel.findAll({
            offset: (offset - 1 * 5) as number,
            limit: 5,
            include: [this.PostContentModel],
        });
    }

    async addPost(
        userId: number,
        postData: { title: string; content: string },
    ) {
        const transaction = await this.SequelizeInstance.transaction();
        try {
            const post = (await this.PostModel.create(
                { title: postData.title, user_id: userId },
                { transaction, returning: true },
            )) as any;

            const postContent = await this.PostContentModel.create(
                { content: postData.content, post_id: post.id },
                { transaction },
            );
            await transaction.commit();
            return { post, postContent };
        } catch (err) {
            await transaction.rollback();
            return err;
        }
    }

    async updatePost(
        userId: number,
        postId: number,
        updatedData: { title?: string; content?: string },
    ) {
        const post = (await this.PostModel.findOne({
            where: { id: postId },
        })) as any;

        if (post.user_id == userId) {
            if (updatedData.title) {
                await this.PostModel.update(
                    { title: updatedData.title },
                    {
                        where: {
                            id: postId,
                            user_id: userId,
                        },
                    },
                );
            }
            if (updatedData.content) {
                await this.PostContentModel.update(
                    {
                        content: updatedData.content,
                    },
                    {
                        where: {
                            post_id: postId,
                        },
                    },
                );
            }
            return { message: 'update ok' };
        } else {
            return { message: 'authenticate failed' };
        }
    }

    async deletePost(userId: number, postId: number) {
        return await this.PostModel.destroy({
            where: {
                id: postId,
                user_id: userId,
            },
        });
    }
}
