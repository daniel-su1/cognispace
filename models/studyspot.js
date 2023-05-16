const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudySpotSchema = new Schema({
    title: String,
    description: String,
    location: String
});

module.exports = mongoose.model('studyspot', StudySpotSchema);