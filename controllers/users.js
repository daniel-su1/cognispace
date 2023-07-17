const User = require('../models/user');

module.exports.renderSignUp = (req, res) => {
    res.render('users/sign-up');
}

module.exports.signUp = async (req, res, next) => {
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
        res.redirect('sign-up');
    }
}

module.exports.renderSignIn = (req, res) => {
    res.render('users/sign-in');
}

module.exports.signIn = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectURL = res.locals.returnTo || '/spots';
    delete res.locals.returnTo;
    res.redirect(redirectURL);
}

module.exports.signOut = (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/spots');
    });
}