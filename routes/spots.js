const express = require('express');
const router = express.Router();
const spots = require('../controllers/spots');
const catchAsync = require('../utils/CatchAsync')
const { isLoggedIn, validateSpot, isAuthor } = require('../middleware.js');

router.route('/')
    .get(spots.index)
    .post(isLoggedIn, validateSpot, catchAsync(spots.createSpot))

router.get('/new', isLoggedIn, spots.renderNewForm);

router.route('/:id')
    .get(catchAsync(spots.showSpot))
    .put(validateSpot, isLoggedIn, isAuthor, catchAsync(spots.updateSpot))
    .delete(isLoggedIn, catchAsync(spots.deleteSpot))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(spots.renderEditForm))

module.exports = router;