const mongoose = require('mongoose');

// Blog Schema Definition
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export Blog model
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
