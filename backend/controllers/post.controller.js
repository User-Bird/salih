const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {

    const {
      title,
      description,
      price,
      image,
      category,
      stock,
    } = req.body;

    const post = await Post.create({
      user: req.user._id,
      title,
      description,
      price,
      image,
      category,
      stock,
    });

    res.status(201).json(post);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPosts = async (req, res) => {
  try {

    const posts = await Post.find()
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
};