import Workout from '../models/WorkoutModel.js';
import mongoose from 'mongoose';

// get all workouts
export const getWorkouts = async (req, res) => {
  try {
    // all workouts in descendant creation order.
    const workouts = await Workout.find({}).sort({
      createdAt: -1,
    });

    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get single workout
export const getWorkout = async (req, res) => {
  // extract id from params object
  const { id } = req.params;

  // check if valid id and send error msg to prevent app crash(internal error)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: 'No such workout !' });
  }

  // const workout = await Workout.findById(id);

  // if (!workout) {
  //   res.status(404).json({ error: 'No workout like this !!' });
  // }

  // res.status(200).json({ workout });

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      res
        .status(404)
        .json({ error: 'No workout like this !!' });
    }

    res.status(200).json({ workout });
  } catch (err) {
    res.status(404).json({ error: 'No workout like this' });
  }
};

// create new workout
export const createWorkout = async (req, res) => {
  // extract properties from req.body
  const { title, load, reps } = req.body;

  let emptyFields = [];

  // cheks for handling error message
  if (!title) {
    emptyFields.push('title');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: 'Please fill in all the fields',
      emptyFields,
    });
  }

  // add doc to DB
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
};

// delete a workout
export const deleteWorkout = async (req, res) => {
  // extract id from params object
  const { id } = req.params;

  // check if valid id and send error msg to prevent app crash(internal error)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'No such workout' });
  }

  try {
    const workout = await Workout.findOneAndDelete({
      _id: id,
    });

    if (!workout) {
      return res
        .status(400)
        .json({ error: 'No such workout' });
    }

    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// update a workout
export const updateWorkout = async (req, res) => {
  // extract id from params object
  const { id } = req.params;

  // check if valid id and send error msg to prevent app crash(internal error)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'No such workout' });
  }

  try {
    // return the document original value
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!workout) {
      return res
        .status(400)
        .json({ error: 'No such workout' });
    }

    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
