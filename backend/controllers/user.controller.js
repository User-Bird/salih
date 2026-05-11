const User = require('../models/User');

// Get own profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fix 6: Update own profile
const updateProfile = async (req, res) => {
  try {
    const { name, profession, city, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, profession, city, bio },
      { new: true }, // return the updated document
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fix 5: Search users by name, profession or city
const searchUsers = async (req, res) => {
  try {
    const q = req.query.q?.trim();

    if (!q) {
      return res.json([]);
    }

    const regex = new RegExp(q, 'i'); // case-insensitive

    const users = await User.find({
      $or: [{ name: regex }, { profession: regex }, { city: regex }],
    })
      .select('-password')
      .limit(20);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  searchUsers,
};
