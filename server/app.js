const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler.js');
const authRoutes = require('./routes/auth.js');
const categoryRoutes = require('./routes/categories.js');
const postRoutes = require('./routes/posts.js');
const commentRoutes = require('./routes/comments.js');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;