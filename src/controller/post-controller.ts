import { Request, Response } from 'express';
import { PostServiceInstance } from '../services/index.ts';

import { TokenRequest } from '../interfaces/jwt-token-validation.ts';

export async function addPost(req: TokenRequest, res: Response) {
    const userId = req.tokenInfo.id;
    const result = await PostServiceInstance.addPost(userId, req.body);
    res.json(result);
}
export async function getPostById(req: Request, res: Response) {
    const postId = Number(req.query.id);
    const result = await PostServiceInstance.getPostById(postId);
    res.json(result);
}
export async function getPostsByOffset(req: Request, res: Response) {
    const offset = Number(req.query.offset);
    const result = await PostServiceInstance.getPostsByOffset(offset);
    res.json(result);
}
export async function updatePost(req: TokenRequest, res: Response) {
    const userId = req.tokenInfo.id;
    const postId = Number(req.query.id);
    const updatedData = req.body;
    const result = await PostServiceInstance.updatePost(
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
export async function deletePost(req: TokenRequest, res: Response) {
    const userId = req.tokenInfo.id;
    const postId = Number(req.query.id);
    const result = await PostServiceInstance.deletePost(userId, postId);
    res.json(result);
}
