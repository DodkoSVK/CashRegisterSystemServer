const Joi = require("joi");

const sortBarsSchema = Joi.object({
    sortBy: Joi.string().valid('id', 'city', 'street', 'postal', 'by', 'date')
});

const barIdSchema = Joi.object({
    id: Joi.number().min(1)
})

const createBarSchema = Joi.object({
    barName: Joi.string().required(),
    barCity: Joi.string().required(),
    barStreet: Joi.string().required(),
    barPostal: Joi.string().required(),
    createdBy: Joi.number().min(1).required(),
    createDate: Joi.date().required(),
});

const editBarSchema = Joi.object({
    barName: Joi.string(),
    barCity: Joi.string(),
    barStreet: Joi.string(),
    barPostal: Joi.string(),
});

module.exports = { sortBarsSchema, barIdSchema, createBarSchema, editBarSchema };