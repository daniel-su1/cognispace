const express = require('express');
const router = express.Router({ mergeParams: true});
const { defaultReviewTitle, validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');


const reviews = require('../controllers/reviews');

const catchAsync = require('../utils/CatchAsync')

router.post('/', isLoggedIn, defaultReviewTitle , validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;