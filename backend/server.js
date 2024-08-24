//Entry file for backend
//we will register express app here.
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');



//express app
const app = express();

//global middleware
app.use(express.json()); //any requests that comes this checkes whether the request has a body, if yes the attaches to req object 
app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/api/workouts', workoutRoutes); 

//connect to db and then listen to requests
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT , () => {
        console.log(`connected to db & listening on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log(err);
})
