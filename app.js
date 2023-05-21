const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const StudySpot = require('./models/studyspot');
const studyspot = require('./models/studyspot');


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

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

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

app.post('/spots', async (req, res) => {
    const studySpot = new StudySpot(req.body.studySpot);
    await studySpot.save();
    res.redirect(`/spots/${studySpot._id}`)
});

app.get('/spots/:id', async (req, res) => {
    const studySpot = await StudySpot.findById(req.params.id);
    res.render('spots/show', { studySpot });
})

app.get('/spots/:id/edit', async(req, res) => {
    const studySpot = await StudySpot.findById(req.params.id);
    res.render('spots/edit', { studySpot });
})

app.put('/spots/:id', async(req, res) => {
    const { id } = req.params;
    const studySpot = await StudySpot.findByIdAndUpdate(id, {...req.body.studySpot})
    res.redirect(`/spots/${studySpot._id}`)
})

app.delete('/spots/:id', async (req, res) => {
    const {id} = req.params;
    await StudySpot.findByIdAndDelete(id);
    res.redirect('/spots');
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})
