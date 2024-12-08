const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: false, unique: true }, // Make username optional for Google login
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // Make password optional for Google login
  googleId: { type: String, unique: true, sparse: true, required: false },
  picture: {
    type: String, // Ensure picture URL is stored as a string
    required: false,
  }, // Make googleId optional
});


// Hash password before saving (only if password is provided)
UserSchema.pre('save', async function(next) {
  if (this.password && this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare hashed password (only if password exists)
UserSchema.methods.matchPassword = async function(enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model from the schema
const User = mongoose.model('User', UserSchema);

// Export the model
module.exports = User;
