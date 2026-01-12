const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' }); // Load .env from parent directory

// Import routes
const blogRoutes = require('./routes/blogRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Port configuration
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  });

// Routes
app.use('/api/blogs', blogRoutes);

// Basic route for testing
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}`);
});
