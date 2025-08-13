const express = require('express');
const dotenv = require('dotenv');
const db = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const movieRoutes = require('./src/routes/movieRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const userRoutes = require('./src/routes/userRoutes');
const searchRoutes = require('./src/routes/searchRoutes'); // Correct import for searchRoutes
const upcomingReleaseRoutes = require('./src/routes/upcomingReleaseRoutes'); // Correct import for upcomingReleaseRoutes
const Watchlist = require('./src/routes/Watchlist'); // Correct import for watchlist
const boxOfficeRoutes = require('./src/routes/boxOfficeRoutes');
const bcrypt = require('bcryptjs');
const User = require('./src/models/userModel'); // Import the User model
const recommendationRoutes = require('./src/routes/recommendationRoutes'); // Import the recommendation routes
const newsRoutes = require('./src/routes/newsRoutes');

dotenv.config();
db();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Check if admin exists, if not create one
async function createAdmin() {
  try {
    const adminExists = await User.findOne({ role: 'admin' }); // Check if admin exists
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10); // Hash the password
      const admin = new User({
        username: 'ahmadad',
        email: 'ahm@example.com',
        password: '123456', // Use hashed password
        role: 'admin',
      });
      await admin.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

// Call the createAdmin function when server starts
createAdmin();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/search', searchRoutes); // Register the search route
app.use('/api/upcoming', upcomingReleaseRoutes); // Register the upcoming release route
app.use('/api/watchlist', Watchlist); // Register the watchlist route
app.use('/api/boxoffice', boxOfficeRoutes); // Register the box office route
app.use('/api/recommendations', recommendationRoutes); // Register the recommendations route
app.use('/api/news', newsRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
