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
            author: {
                _id: "64a26e573d1c50a0fad5e696",
                email: '123@123',
                username: '123',
                __v: 0
              },
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: "https://res.cloudinary.com/doi9yfsfy/image/upload/v1688590000/cld-sample-3.jpg",
                    filename: "cld-sample-3.jpg"
                },
                {
                    url: "https://res.cloudinary.com/doi9yfsfy/image/upload/v1688590000/cld-sample-4.jpg",
                    filename: "cld-sample-4.jpg"
                },
                {
                    url: "https://res.cloudinary.com/doi9yfsfy/image/upload/v1688590000/cld-sample-2.jpg",
                    filename: "cld-sample-2.jpg"
                },
                {
                    url: "https://res.cloudinary.com/doi9yfsfy/image/upload/v1688590000/cld-sample-5.jpg",
                    filename: "cld-sample-5.jpg"
                }
            ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda ipsa harum, est ratione eos consectetur deleniti a voluptates cumque perspiciatis. Cum dolore facere mollitia quos, quibusdam nemo cumque quo exercitationem.'
        })
        await study.save();
    }
}

seedDB();