import express from 'express'
const router = express.Router()
import postController from '../controllers/forumController.js'

router.get('/posts/:id', postController.getPostById);
router.get('/posts/t/:title', postController.getPostByTitle);
router.post('/posts/:id/comments', postController.addComment);
router.delete('/posts/:id', postController.deletePost);
router.post('/posts', postController.createPost);
router.get('/', postController.getPosts);

export default router
