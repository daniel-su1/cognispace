const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const {studySpotSchema, reviewSchema} = require('./schemas.js')
const catchAsync = require('./utils/CatchAsync')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')
const StudySpot = require('./models/studyspot');
const Review = require('./models/review');
const review = require('./models/review');

mongoose.connect('mongodb://127.0.0.1:27017/study-spotter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validateStudySpot = (req, res, next) => {
    
    const { error } = studySpotSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

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

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/spots', async (req, res) => {
    const studySpots = await StudySpot.find({});
    res.render('spots/index', { studySpots })
})

app.get('/spots/new', (req, res) => {
    res.render('spots/new');
});

app.post('/spots', validateStudySpot, catchAsync(async (req, res, next) => {

    const studySpot = new StudySpot(req.body.studySpot);
    await studySpot.save();
    res.redirect(`/spots/${studySpot._id}`)
}))

app.get('/spots/:id', catchAsync(async (req, res) => {
    const studySpot = await StudySpot.findById(req.params.id).populate('reviews');
    console.log(studySpot)
    res.render('spots/show', { studySpot });
}))

app.get('/spots/:id/edit', catchAsync(async (req, res) => {
    const studySpot = await StudySpot.findById(req.params.id);
    res.render('spots/edit', { studySpot });
}))

app.put('/spots/:id', validateStudySpot, catchAsync(async (req, res) => {
    const { id } = req.params;
    const studySpot = await StudySpot.findByIdAndUpdate(id, { ...req.body.studySpot })
    res.redirect(`/spots/${studySpot._id}`)
}))

app.delete('/spots/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await StudySpot.findByIdAndDelete(id);
    res.redirect('/spots');
}))

app.post('/spots/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const studySpot = await StudySpot.findById(req.params.id);
    const review = new Review(req.body.review);
    studySpot.reviews.push(review);
    await review.save();
    await studySpot.save();
    res.redirect(`/spots/${studySpot._id}`);
}))

app.delete('/spots/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const {id, reviewId } = req.params;
    await StudySpot.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/spots/${id}`)
}))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) (err.message = 'Something went wrong')
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})
