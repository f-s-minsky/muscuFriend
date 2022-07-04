import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import workoutRoutes from './routes/workouts.js';
import connectDB from './config/db.js';

// Load .env file content (env variables) in process.env
dotenv.config({ path: './config/config.env' });

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// DB connection
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running on ${process.env.PORT} my friend !`)
);
