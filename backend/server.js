const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow frontend to access backend
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api', require('./routes/api'));

// Test route
app.get('/', (req, res) => {
    res.send('✅ PrepConnect Backend is Running');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 API Endpoint: http://localhost:${PORT}/api`);
});
app.get("/", (req, res) => {
  res.send("Backend is running");
});
