const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Spot = require('../models/spot');

mongoose.connect('mongodb://127.0.0.1:27017/study-spotter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Spot.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const study = new Spot({
            author: '64a3b8317c73cf8392fc0cd4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/298137',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda ipsa harum, est ratione eos consectetur deleniti a voluptates cumque perspiciatis. Cum dolore facere mollitia quos, quibusdam nemo cumque quo exercitationem.'
        })
        await study.save();
    }
}

seedDB();