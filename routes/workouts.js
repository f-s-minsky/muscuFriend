import express from 'express';
// import Workout from '../models/WorkoutModel.js';
import {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} from '../controllers/workoutController.js';

const router = express.Router();

// @route     GET api/workouts
// @desc      Get all workouts
// @access
router.get('/', getWorkouts);

// @route     GET api/workouts/:id
// @desc      Get a single workout
router.get('/:id', getWorkout);

// @route     POST api/workouts
// @desc      Post a new workout
router.post('/', createWorkout);

// @route     DELETE api/workouts/:id
// @desc      Delete a workout
router.delete('/:id', deleteWorkout);

// @route     PATCH api/workouts/:id
// @desc      Update a workout
router.patch('/:id', updateWorkout);

export default router;
