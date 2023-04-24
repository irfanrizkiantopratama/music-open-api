const Joi = require ('joi');
const SongPayloadSchema  = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().required(),
    genre: Joi.string().required(),
    performer: Joi.string().required(),
    duration: Joi.number().integer().required(),
    
})

module.exports= { SongPayloadSchema } ;