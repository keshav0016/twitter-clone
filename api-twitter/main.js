const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser')


const registerApiRouter = require('./user/register');
const loginApiRouter = require('./user/login')
const createTweetRouter = require('./tweets/createTweet');
const deleteTweetRouter = require('./tweets/deleteTweet');
const config = require('./config/passport');
const authToken = require('./authToken/authMiddleware');
const followUserRouter = require('./follow/followUser');
const timelineTweetsRouter = require('./tweets/timelineTweets');



// Cross origin request
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Connect to database
mongoose.connect("mongodb://localhost:27017/twitter-clone");


// Cookie parser middleware
app.use(cookieParser())


// Parse json data
app.use(bodyParser.json())

// Internal error handler
app.use((error, req, res, next) => {
    res.status(500).send('internal error occurred');
})



// Passport config and initialise
passport.use(config);
app.use(passport.initialize());


// Register router
app.use('/user',registerApiRouter);


// Login router
app.use('/user',loginApiRouter);


// Authentication middleware
app.use(authToken);

// Create tweet router
app.use('/tweet',createTweetRouter);

// Delete tweet router
app.use('/tweet',deleteTweetRouter);


// Follow user router
app.use('/', followUserRouter)

// Timeline Tweets router
app.use('/tweet', timelineTweetsRouter);


// Server at 3001
app.listen(3001);