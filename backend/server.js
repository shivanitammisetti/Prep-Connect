const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// 1. Load Environment Variables
dotenv.config();

// 2. Connect to Database
connectDB();

const app = express();

// 3. Middlewares
app.use(cors());
app.use(express.json());

// 4. Routes (CLEANED UP - No more './routes/api')
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/doubts', require('./routes/doubtRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));

// 5. Root Route for testing
app.get('/', (req, res) => {
  res.send('🚀 PrepConnect API is running smoothly!');
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`✅ Ready for Postman testing!`);
});