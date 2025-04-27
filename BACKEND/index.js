import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './database/connection.js';
import userRoutes from './routes/userRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import nutritionRoutes from './routes/nutritionRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(
    
));
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
connectDB()
  .then(() => {
    // Basic route for testing
    app.get('/', (req, res) => {
      res.send('Fitness Tracker API is running');
    });

    // Routes
    app.use('/api/users', userRoutes);
    app.use('/api/workouts', workoutRoutes);
    app.use('/api/nutrition', nutritionRoutes);

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Failed to connect to database:', err));