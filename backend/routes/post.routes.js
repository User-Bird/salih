const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth.middleware');
const { createPost, getPosts, likePost } = require('../controllers/post.controller');

router.get('/', getPosts);
router.post('/', protect, createPost);
router.put('/:id/like', protect, likePost); // Fix 4: like route

module.exports = router;
