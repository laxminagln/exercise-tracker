const express = require('express');
// const bodyParser = require('body-parser');
const cors =  require('cors');
const mongoose = require('mongoose');

require('dotenv').config();     // we get env files in the dot env file

const app = express();
const port = process.env.PORT || 5000;  // creating express server

app.use(cors());                // cors middleware
app.use(express.json());        // (middleware) allows parsing json
// app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;      // connecting mongoDB
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises',exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);  // starts server
});