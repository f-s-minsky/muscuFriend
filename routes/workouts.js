import express from 'express';
import Workout from '../models/WorkoutModel.js';

const router = express.Router();

// @route     GET api/workouts
// @desc      Get all workouts
// @access
router.get('/', (req, res) => {
  res.json({
    msg: 'GET all workouts',
  });
});

// @route     GET api/workouts/:id
// @desc      Get a single workout
router.get('/:id', (req, res) => {
  res.json({
    msg: 'GET a single workout',
  });
});

// @route     POST api/workouts
// @desc      Post a new workout
router.post('/', async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    // doc created stored in workout var
    const workout = await Workout.create({
      title,
      load,
      reps,
    });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route     DELETE api/workouts/:id
// @desc      Delete a workout
router.delete('/:id', (req, res) => {
  res.json({ msg: 'Delete a workout' });
});

// @route     PATCH api/workouts/:id
// @desc      Update a workout
router.patch('/:id', (req, res) => {
  res.json({ msg: 'Update a workout' });
});

export default router;
