const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const StudySpot = require('./models/studyspot');

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


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/makestudyspot', async (req, res) => {
    const studySpot = new StudySpot({title: 'Library', description: "quiet space"});
    await studySpot.save();
    res.send(studySpot);
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})