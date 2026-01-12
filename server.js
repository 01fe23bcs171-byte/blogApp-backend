const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const blogRoutes = require('./routes/blogRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Port configuration (Railway provides PORT automatically)
const PORT = process.env.PORT || 8080;

// MongoDB Connection (✅ MATCHES Railway variable)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  });

// Routes
app.use('/api/blogs', blogRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'Blog App API is running!',
    endpoints: {
      getAllBlogs: 'GET /api/blogs',
      getBlogById: 'GET /api/blogs/:id',
      createBlog: 'POST /api/blogs',
      updateBlog: 'PUT /api/blogs/:id',
      deleteBlog: 'DELETE /api/blogs/:id'
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
