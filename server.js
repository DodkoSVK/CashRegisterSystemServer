const express = require('express');
require('dotenv').config();
const Joi = require("joi");

const barSchema = Joi.object({
    barName: Joi.string(),
    barCity: Joi.string(),
    barStreet: Joi.string(),
    barPostal: Joi.string(),
    createdBy: Joi.number().min(1),
    createDate: Joi.date()
});

const app = express();
const PORT = process.env.PORT;

const logger = (req, res, next) => {
    console.log(`🟡 New request: ${req.method}, requested URL: ${req.originalUrl}`);
    next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get("/", (req, res) => {
    res.status(202).send({message: "Get / is working"});    
});

app.post("/cafe/bar", (req, res) => {
    const { barName, barCity, barStreet, barPostal, createdBy, createDate } = req.body;
    console.log(`I get: ${barName}, ${barCity}, ${barStreet}, ${barPostal}, ${createdBy}, ${createDate}`);
    const {error} = barSchema.validate(req.body)
    if (error) {
        res.status(400).send(error.message);
    }    
    res.status(202).send({message: `I get: Bar:${barName}, City: ${barCity}, Street: ${barStreet}, Postal: ${barPostal}, Created By: ${createdBy}, Create Date: ${createDate}`});
});

app.post("/cafe/employee", (res, req) => {
    
})

app.listen(PORT, () => {
    console.log(`🟢 Server is on. Listening on port ${PORT}`);
});