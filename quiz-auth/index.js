const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const app = express();

// Database connection
mongoose.connect('mongodb://localhost/quiz-auth', { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Passport configuration
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect username.' });
        
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) return done(null, user);
            else return done(null, false, { message: 'Incorrect password.' });
        });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Quiz Website');
});

app.get('/login', (req, res) => {
    res.send('Login Page');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/quiz',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/register', (req, res) => {
    res.send('Register Page');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.send('Error hashing password');
        
        const newUser = new User({ username, password: hash });
        newUser.save(err => {
            if (err) return res.send('Error saving user');
            res.redirect('/login');
        });
    });
});

app.get('/quiz', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Quiz Page');
    } else {
        res.redirect('/login');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
