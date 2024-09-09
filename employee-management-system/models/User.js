const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  phone: {
    type: String,
    required: true, 
  },
  department: {
    type: String,
    required: true,  
  },
  password: {
    type: String,
    required: true,  
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically set the creation date
  },
});

module.exports = mongoose.model('User', UserSchema);

