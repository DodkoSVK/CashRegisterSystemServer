const Joi = require("joi");

const sortBars = Joi.object({
    sortBy: Joi.string().valid('id', 'city', 'street', 'postal', 'by', 'date')
});

const createBarSchema = Joi.object({
    barName: Joi.string(),
    barCity: Joi.string(),
    barStreet: Joi.string(),
    barPostal: Joi.string(),
    createdBy: Joi.number().min(1),
    createDate: Joi.date()
});

module.exports = { sortBars, createBarSchema };