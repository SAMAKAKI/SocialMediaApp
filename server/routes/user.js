const express = require('express');
const { UserController } = require('../controllers');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/current', authenticateToken, UserController.currentUser);
router.get('/:id', authenticateToken, UserController.getUserById);
router.put('/:id', authenticateToken, UserController.updateUser);

module.exports = router;
