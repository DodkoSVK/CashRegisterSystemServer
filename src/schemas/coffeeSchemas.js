const Joi = require("joi");

const tableSchema = Joi.object({
    barId: Joi.number().min(1),
    tableName: Joi.string()
});

module.exports = { barSchema, tableSchema}