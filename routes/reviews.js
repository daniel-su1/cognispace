const express = require('express');
const router = express.Router({ mergeParams: true});

const {reviewSchema} = require('../schemas.js')

const Spot = require('../models/spot');
const Review = require('../models/review');

const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/CatchAsync')

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

router.post('/', validateReview, catchAsync(async (req, res) => {
    const spot = await Spot.findById(req.params.id);
    const review = new Review(req.body.review);
    spot.reviews.push(review);
    await review.save();
    await spot.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/spots/${spot._id}`);
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const {id, reviewId } = req.params;
    await Spot.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!')
    res.redirect(`/spots/${id}`)
}))

module.exports = router;