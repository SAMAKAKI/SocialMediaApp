const express = require('express');
const { FollowController } = require('../controllers');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/follow-user', authenticateToken, FollowController.followUser);
router.delete('/unfollow-user/:id', authenticateToken, FollowController.unfollowUser);

module.exports = router;
