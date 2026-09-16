const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// ---------------------------------------------------------
// MongoDB Connection Setup
// Team Note: Make sure to add MONGODB_URI in your .env file
// Format: MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/hostel
// ---------------------------------------------------------
const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error('❌ MONGODB_URI is not defined in .env file.');
            console.error('Please configure your MongoDB credentials!');
            process.exit(1);
        }
        
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
        process.exit(1);
    }
};

// Initialize DB Connection
connectDB();

// ---------------------------------------------------------
// Basic Route for testing
// ---------------------------------------------------------
app.get('/', (req, res) => {
    res.send('Hostel Allocation API - Week 5 Milestone Running!');
});

// ---------------------------------------------------------
// Placeholder for Inventory Routes (Assigned to Team Member 2)
// ---------------------------------------------------------
// app.use('/api/inventory', require('./routes/inventory'));

// ---------------------------------------------------------
// Placeholder for Application Routes (Assigned to Team Member 3)
// ---------------------------------------------------------
// app.use('/api/cycles', require('./routes/cycles'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
