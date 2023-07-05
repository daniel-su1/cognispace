const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/CatchAsync');
const User = require('../models/user');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

router.get('/register', (req, res) => {
    res.render('users/register');
})
router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, function (err) {
            if (err) {
                console.log(err);
                return next(err);
            }
            console.log(registeredUser);
            req.flash('success', 'Welcome to Study Spotter!');
            res.redirect('/spots');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login',
    // use the storeReturnTo middleware to save the returnTo value from sessioj to res.locals
    storeReturnTo,
    // passport.authenticate logs the user in and clears req.session
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    //now we can use res.locals.returnTo to redirect the user after login
    (req, res) => {
        req.flash('success', 'Welcome Back!');
        const redirectURL = res.locals.returnTo || '/spots';
        delete res.locals.returnTo;
        res.redirect(redirectURL);
    })

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/spots');
    });
})

module.exports = router;