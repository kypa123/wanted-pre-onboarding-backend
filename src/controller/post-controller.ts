import { Request, Response } from 'express';
import PostService from '../services/post-service.ts';
import { TokenRequest } from '../interfaces/jwt-token-validation.ts';

export default class PostController {
    private postService: PostService;
    constructor(PostService: PostService) {
        this.postService = PostService;
    }

    async addPost(req: TokenRequest, res: Response) {
        const userId = req.tokenInfo.id;
        const result = await this.postService.addPost(userId, req.body);
        res.json(result);
    }
    async getPostById(req: Request, res: Response) {
        const postId = Number(req.query.id);
        const result = await this.postService.getPostById(postId);
        res.json(result);
    }
    async getPostsByOffset(req: Request, res: Response) {
        const offset = Number(req.query.offset);
        const result = await this.postService.getPostsByOffset(offset);
        res.json(result);
    }
    async updatePost(req: TokenRequest, res: Response) {
        const userId = req.tokenInfo.id;
        const postId = Number(req.query.id);
        const updatedData = req.body;
        const result = await this.postService.updatePost(
            userId,
            postId,
            updatedData,
        );
        if (result.message == 'authenticate failed') {
            res.status(401).json(result);
        } else {
            res.json(result);
        }
    }
    async deletePost(req: TokenRequest, res: Response) {
        const userId = req.tokenInfo.id;
        const postId = Number(req.query.id);
        const result = await this.postService.deletePost(userId, postId);
        res.json(result);
    }
}
