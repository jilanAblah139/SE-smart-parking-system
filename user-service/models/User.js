// File: user-service/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
