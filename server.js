// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const drawRoutes = require('./routes/drawRoutes'); // Import the route handler

const app = express();

// --- Middleware Setup ---
// Allows the frontend (your website) to talk to the backend (your server)
app.use(cors({
    origin: '*', // Allows any origin to connect (safe for simple API)
    methods: ['GET', 'POST'],
}));

// Parse JSON request bodies (for joining and revealing)
app.use(express.json()); 

// --- Database Connection ---
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('🎁 MongoDB Connected Successfully!'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1); 
    });

// --- API Routes ---
// All routes in drawRoutes.js will be accessed via /api/...
app.use('/api', drawRoutes); 


// --- Basic Route (For testing deployment) ---
app.get('/', (req, res) => {
    res.send('Jolly Picker Backend is Running!');
});


// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🎄 Server is running on port ${PORT}`);
});
