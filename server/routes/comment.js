const express = require('express');
const { CommentController } = require('../controllers');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/create-comment', authenticateToken, CommentController.createComment);
router.delete('/delete-comment/:id', authenticateToken, CommentController.deleteComment);

module.exports = router;
