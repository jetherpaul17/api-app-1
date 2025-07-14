const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user.js');
const workoutRoutes = require('./routes/workout.js');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://jetherquintana:jetherquintana@fitnesscluster.qlsbyec.mongodb.net/?retryWrites=true&w=majority&appName=fitnessCluster');
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/workouts', workoutRoutes);

if(require.main === module){
    app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
}

module.exports = {app,mongoose};