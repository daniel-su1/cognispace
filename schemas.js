const Joi = require('joi')
const studySpotSchema = Joi.object({
    studySpot: Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
        location: Joi.string.required(),
        description: Joi.string.required()
    }).required()
});

module.exports.studySpotSchema = studySpotSchema;
