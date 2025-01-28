const barSchemas = require('../schemas/barSchemas');
const barsModel = require('../models/barModel');

const getBar = async (req, res) => {
    const { sortBy } = req.query;
    if(sortBy) {
        const { error } = barSchemas.sortBarsSchema.validate({ sortBy });
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

const getBarByID = async (req, res) => {
    const { error } = barSchemas.barIdSchema.validate(req.params);
    if (error)
        return res.status(400).send({ message: error.details[0].message });
    try {
        const { id } = req.params;
        const result = await barsModel.getBarByIdDB(id);
        if(result.rows.length < 1)
            return res.status(500).send({message: "V databáze sa nenachadzajú žiadne bary/kaviarne so zadaným ID"});
        res.status(202).json(result.rows);
        console.log(`🟢 getBarsByID.`)
    } catch (e) {
        console.log(`🟠 We got a problem: ${e}`);
        return res.status(500).send({message: "Neocakavana chyba na strane databazy."});
    }
}

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

const editBar = async (req, res) => {
    const { error } = barSchemas.barIdSchema.validate(req.params);
    if (error)
        return res.status(400).send({ message: error.details[0].message });

    const { bodyError } = barSchemas.editBarSchema.validate(req.body);
    if (bodyError)
        return res.status(400).send({ message: bodyError.details[0].message });

    const { barName, barCity, barStreet, barPostal } = req.body;

    let fieldsToUpdate = [];
    let valuesToUpdate = [];

    if (barName) {
        fieldsToUpdate.push(`name = $${fieldsToUpdate.length+1}`);
        valuesToUpdate.push(barName);
    }
    if (barCity) {
        fieldsToUpdate.push(`city = $${fieldsToUpdate.length+1}`);
        valuesToUpdate.push(barCity);
    }
    if (barStreet) {
        fieldsToUpdate.push(`street = $${fieldsToUpdate.length+1}`);
        valuesToUpdate.push(barStreet);
    }
    if (barPostal) {
        fieldsToUpdate.push(`postal = $${fieldsToUpdate.length+1}`);
        valuesToUpdate.push(barPostal);
    }
    if(fieldsToUpdate < 1) 
        return res.status(400).send({message: "Musia byť definované polia pre úpravu."});

    try {
        const { id } = req.params;
        valuesToUpdate.push(id);
        const result = await barsModel.patchBarDb(fieldsToUpdate, valuesToUpdate);
        if (result.rows.length < 1)
            return res.status(500).send({message: "Nebolo mozne upravit knihu v databazy"});

        const barId = result.rows[0].id;
        console.log(`🟢 Bar with ID: ${barId} is edited.`);
        return res.status(201).send({message: `Kniha s ID: ${barId} bola upravená`});     
    } catch (e) {
        console.log(`🟠 We got a problem: ${e}`);
        return res.status(500).send({message: "Neocakavana chyba na strane databazy."});
    }

}

const deleteBar = async (req, res) => {
    const { error } = barSchemas.barIdSchema.validate(req.params);
    if (error)
        return res.status(400).send({ message: error.details[0].message });
    try {
        const { id } = req.params;
        const result = await barsModel.deleteBarDB(id);
        if(result.rows.length < 1)
            return res.status(500).send({message: "V databáze sa nenachadzajú žiadne bary/kaviarne so zadaným ID"});
        res.status(202).json(result.rows);
        console.log(`🟢 getBarsByID.`)
    } catch (e) {
        console.log(`🟠 We got a problem: ${e}`);
        return res.status(500).send({message: "Neocakavana chyba na strane databazy."});
    }
}

module.exports = { getBar, getBarByID, createBar, editBar, deleteBar }