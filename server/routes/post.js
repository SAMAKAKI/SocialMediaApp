const express = require('express');
const { PostController } = require('../controllers');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/create-post', authenticateToken, PostController.createPost);
router.get('/', authenticateToken, PostController.getAllPosts);
router.get('/:id', authenticateToken, PostController.getPostById);
router.delete('/delete-post/:id', authenticateToken, PostController.deletePost);

module.exports = router;
