const User = require('../models/userModel');

exports.getUserProfile = async (req, res) => {
  try {
    console.log('User ID from token:', req.user.userId);  // Ensure the correct field is accessed
    const user = await User.findById(req.user.userId);  // Use userId from the token
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// userController.js
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from the URL parameters
    const updates = req.body; // Get updates from the request body

    // Find user by ID and update their details
    const user = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true } // Return updated document & run validation
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user by ID and delete
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllProfiles = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, '-password'); // Exclude the password field for security

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.json({ message: 'All user profiles retrieved successfully', users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
