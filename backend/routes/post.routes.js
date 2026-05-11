const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createPost,
  getPosts,
} = require("../controllers/post.controller");

router.post("/", protect, createPost);
router.get("/", getPosts);

module.exports = router;