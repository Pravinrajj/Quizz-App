const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const quizRoutes = require('./routes/quizrouter');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// const mongoURI = 'mongodb://localhost:27017/quizApp'; // Replace with your MongoDB connection string
const mongoURI = 'mongodb+srv://sangamanramesh04:Sangu$004@cluster0.dx5vy.mongodb.net/quizApp?retryWrites=true&w=majority&appName=Cluster0'
mongoose
    .connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/quizzes', quizRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Quiz App API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
