const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/CatchAsync')
const {spotSchema} = require('../schemas.js')
const {isLoggedIn, validateSpot, isAuthor} = require('../middleware.js');
const Spot = require('../models/spot');

router.get('/', async (req, res) => {
    const spots = await Spot.find({});
    res.render('spots/index', { spots })
})

router.get('/new', isLoggedIn, (req, res) => {
    res.render('spots/new');
});

router.post('/', isLoggedIn, validateSpot, catchAsync(async (req, res, next) => {
    const spot = new Spot(req.body.spot);
    spot.author = req.user._id;
    await spot.save();
    req.flash('success', 'Successfully made a new spot!');
    res.redirect(`/spots/${spot._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const spot = await Spot.findById(req.params.id)
    .populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!spot) {
        req.flash('error', 'Cannot find that spot!');
        return res.redirect('/spots');
    }
    console.log(spot)
    res.render('spots/show', { spot });
}))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const spot = await Spot.findById(req.params.id);
    if(!spot){
        req.flash('error', 'Cannot find that spot!');
        return res.redirect('/spots');
    }
    res.render('spots/edit', { spot });
}))

router.put('/:id', validateSpot, isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const spot = await Spot.findByIdAndUpdate(id, { ...req.body.spot });
    req.flash('success', 'Successfully updated spot!');
    res.redirect(`/spots/${spot._id}`)
}))

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Spot.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted spot!')
    res.redirect('/spots');
}))

module.exports = router;