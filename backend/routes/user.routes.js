const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth.middleware');
const { getProfile, updateProfile, searchUsers } = require('../controllers/user.controller');

router.get('/profile', protect, getProfile); // GET  own profile
router.put('/profile', protect, updateProfile); // Fix 6: UPDATE own profile
router.get('/search', protect, searchUsers); // Fix 5: SEARCH users

module.exports = router;
