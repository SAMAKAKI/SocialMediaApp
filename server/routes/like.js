const express = require('express');
const { LikeController } = require('../controllers');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/like-post', authenticateToken, LikeController.likePost);
router.delete('/unlike-post/:id', authenticateToken, LikeController.unlikePost);

module.exports = router;
