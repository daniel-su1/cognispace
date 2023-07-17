const express = require('express');
const router = express.Router();
const spots = require('../controllers/spots');
const catchAsync = require('../utils/CatchAsync')
const { isLoggedIn, validateSpot, isAuthor, copyLocation} = require('../middleware.js');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    .get(spots.index)
    .post(isLoggedIn, upload.array('image'), copyLocation, validateSpot, catchAsync(spots.createSpot))

router.get('/new', isLoggedIn, spots.renderNewForm);

router.route('/:id')
    .get(catchAsync(spots.showSpot))
    .put(isLoggedIn, isAuthor, upload.array('image'), copyLocation, validateSpot, catchAsync(spots.updateSpot))
    .delete(isLoggedIn, catchAsync(spots.deleteSpot))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(spots.renderEditForm))

module.exports = router;