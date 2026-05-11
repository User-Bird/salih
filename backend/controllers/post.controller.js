const Post = require('../models/Post');

const createPost = async (req, res) => {
  try {
    const { title, description, price, image, category, stock } = req.body;

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
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name profession profilePhoto')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fix 4: like/unlike toggle
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.user._id.toString();
    const alreadyLiked = post.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      // unlike
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      // like
      post.likes.push(req.user._id);
    }

    await post.save();

    res.json({
      liked: !alreadyLiked,
      likesCount: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  likePost,
};
