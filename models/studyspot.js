const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const StudySpotSchema = new Schema({
    title: String,
    image: String,
    description: String,
    location: String,
    image: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

StudySpotSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('studyspot', StudySpotSchema);