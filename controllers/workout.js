const Workout = require('../models/Workout.js');

module.exports.addWorkout = async (req, res) => {
  try {
    const newWorkout = new Workout({
      ...req.body,
      userId: req.userId
    });
    const savedWorkout = await newWorkout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add workout' });
  }
};

module.exports.getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.userId });
    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve workouts' });
  }
};

module.exports.updateWorkout = async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        duration: req.body.duration,
        status: req.body.status
      },
      { new: true }
    );
    res.status(200).json({
      message: 'Workout updated successfully',
      updatedWorkout: updatedWorkout
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
};

module.exports.deleteWorkout = async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
};

module.exports.completeWorkoutStatus = async (req, res) => {
  try {
    const completedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    );
    res.json({
      message: 'Workout status updated successfully',
      updatedWorkout: completedWorkout
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark workout as complete' });
  }
};