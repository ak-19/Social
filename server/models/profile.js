const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    type: String
  },
  birthPlace: {
    type: String,
    min: 2,
    max: 40
  },
  status: {
    type: String
  },
  interests: {
    type: [String],
    default: []
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);
