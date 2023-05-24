const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudySpotSchema = new Schema({
    title: String,
    image: String,
    description: String,
    location: String,
    image: String
});

module.exports = mongoose.model('studyspot', StudySpotSchema);