const Spot = require('./models/spot');
const Review = require('./models/review');
const { spotSchema , reviewSchema}  = require('./schemas.js');
const ExpressError = require('./utils/ExpressError')


// Description: Middleware functions for the app
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if(req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateSpot = (req, res, next) => {
    
    const { error } = spotSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const spot = await Spot.findById(id);
    if (!spot.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/spots/${id}`);
    }
    next();
}

module.exports.defaultReviewTitle = (req, res, next) => {
    if (!req.body.review.title) {
        if (req.body.review.body.length > 20){
            req.body.review.title = req.body.review.body.substring(0, 20) + '...';
        }
        else {
            req.body.review.title = req.body.review.body;
        }
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/spots/${id}`);
    }
    next();
}