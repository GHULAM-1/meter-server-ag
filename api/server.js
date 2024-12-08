const express = require('express');
const {
  OAuth2Client
} = require('google-auth-library');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const zipCodeRoutes = require('../routes/zipCodes');  // Import zipCodes.js routes
const generationFuelMixRoute = require('../routes/generationFuelmix')
const localForecastRoute = require('../routes/localForecast')
const electricUsageRoutes = require('../routes/monthlyElectricUsage'); // Import the routes
const rateOrderHistoryRoutes = require('../routes/rateOrderHistory');
const rateToCompareRoute = require('../routes/rateToCompare'); // Import the route
const supplierRateRoute = require('../routes/supplierRate');

// Initialize Google OAuth Client
const client = new OAuth2Client('537737940502-6erc90mg0naa5os0n6r04kuq2j7l087k.apps.googleusercontent.com'); // Replace with your actual client ID

// Initialize Express app
const app = express();
dotenv.config(); // Load environment variables from .env file

// Middleware
app.use(
  cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  })
);

// MongoDB Connection
mongoose.connect('mongodb+srv://gammadevelopers:1234@cluster0.0nbjd.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Google OAuth2 Authentication Route
app.post('/auth/google/callback', async (req, res) => {
  const {
    credential
  } = req.body; // Get Google token (credential) from frontend
  try {
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: '537737940502-6erc90mg0naa5os0n6r04kuq2j7l087k.apps.googleusercontent.com', // Replace with your Google Client ID
    });
    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name;
    const picture = payload.picture || '';

    // Check if the user exists
    let user = await User.findOne({
      googleId
    });
    if (!user) {
      // If user does not exist, create new user
      user = new User({
        googleId,
        email,
        name,
        picture,
        username: email.split('@')[0], // Set username based on email
      });
      await user.save();
    }

    // Send response with user data
    res.json({
      message: 'User authenticated successfully',
      user: {
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        picture: user.picture,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(400).json({
      message: 'Authentication failed'
    });
  }
});

// Traditional Signup Route (Email + Password)
app.post('/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;
  console.log(email, password, username);

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide username, email, and password' });
  }

  try {
    // Check if user with the same email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user and save (googleId is not required here)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    
    await newUser.save();
    
    // Generate JWT Token after user is saved
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      message: 'User registered successfully',
      token: token,
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.use('/zipcodes', zipCodeRoutes);
app.use('/generation-fuel-mix', generationFuelMixRoute);
app.use('/local-forecast', localForecastRoute)
app.use('/monthly-electric-usage', electricUsageRoutes);  // Prefix all routes with '/api'
app.use('/rate-order-history', rateOrderHistoryRoutes);
app.use('/rate-to-compare', rateToCompareRoute);
app.use('/supplier-rate', supplierRateRoute);


// Traditional Login Route (Email + Password)
app.post('/auth/login', async (req, res) => {
  const {
    email,
    password
  } = req.body;
  console.log(email, password);
  try {
    // Check if user exists
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        message: 'User not found'
      });
    }

    // Check if password matches
    // fetch password from db  -> dbpassword
    // de3crypt it  -- decryptedDBpassword
    // decrypteddbpassword === password 
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {

      console.log("arrr gaya " , isMatch , password)
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }
    const token = jwt.sign({
      id: user._id
    }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    console.log("Generated Token:", token); // Add this to check the token
    // res.json({
    //   message: 'Login successful',
    //   token
    // });


    // Send user info (excluding password)
    res.json({
      message: 'User logged in successfully',
      token: token,
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Login failed'
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});