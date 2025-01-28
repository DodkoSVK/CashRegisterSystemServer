const barSchemas = require('../schemas/barSchemas');
const barsModel = require('../models/barModel');

const getBar = async (req, res) => {
    const { sortBy } = req.query;
    if(sortBy) {
        const { error } = barSchemas.sortBars.validate({ sortBy });
        if(error)
            return res.status(400).send({ message: error.details[0].message });
        if(sortBy === "by")
            sortBy = "created_by";
        if(sortBy === "date")
            sortBy = "create_date";
    }
    try {
        const result = await barsModel.getBarDB(sortBy);
        if(result.rows.length < 1)
            return res.status(500).send({message: "V databáze sa nenachadzajú žiadne bary/kaviarne"});
        console.log(`🟢 getBars.`);
        res.status(202).json(result.rows);
    } catch (e) {
        console.log(`🟠 We got a problem: ${e}`);
        return res.status(500).send({message: "Neocakavana chyba na strane databazy."});
    }        
};

const createBar = async (req, res) => {
    const {error} = barSchemas.createBarSchema.validate(req.body);
    if(error) 
        res.status(400).send(error.details[0].message);
    const { barName, barCity, barStreet, barPostal, createdBy, createDate } = req.body;
    try {
        const result = await barsModel.createBarDB(barName, barCity, barStreet, barPostal, createdBy, createDate);
        if(result.rows.length < 1)
            return res.status(500).send({message: "Nedokážem vytvoriť nový bar/kaviateň."});
        
        const barId = result.rows[0].id;
        console.log(`🟢 New bar is created with id: ${barId}`);
        return res.status(201).send({message: `Bar vytvorený s ID: ${barId}`});
    } catch (e) {
        console.log(`🟠 We got a problem: ${e}`);
        return res.status(500).send({message: "Neocakavana chyba na strane databazy."});
    }
};

module.exports = { getBar, createBar }