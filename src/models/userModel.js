const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Email is required and unique
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],  // Allow only 'user' or 'admin'
    default: 'user',  // Default to 'user' role
  },
});

// Hash the password before saving the user (for security)
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare provided password with hashed password in the database
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
