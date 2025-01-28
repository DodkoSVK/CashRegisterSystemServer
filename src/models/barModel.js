const { pool } = require('../../config/database');

const getBarDB = async (sortBy) => {
    try {
        let query = "SELECT * FROM public.bars";
        if(sortBy)
            query += ` ORDER BY ${sortBy};`
        else
            query += ';'
        const result = await pool.query(query)
        return result;
    } catch (e) {
        console.log(`We got a problem: ${e}`);
        throw e;
    }
}

const getBarByIdDB = async (id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM public.bars WHERE id = $1;',
            [id]
        );
        return result;
    } catch (e) {
        console.log(`We got a problem: ${e}`);
        throw e;
    }
}

const createBarDB = async (barName, barCity, barStreet, barPostal, createdBy, createDate) => {
    try {
        const result = await pool.query(
            'INSERT INTO bars (name, city, street, postal, created_by, create_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;',
            [barName, barCity, barStreet, barPostal, createdBy, createDate]
        );
        return result;        
    } catch (e) {
        console.log(`We got a problem: ${e}`);
        throw e;
    }
}

const patchBarDb = async(fieldsToUpdate, valuesToUpdate) => {
    try {
        const results = await pool.query(`UPDATE public.bars SET ${fieldsToUpdate.join(', ')} WHERE id = $${fieldsToUpdate.length+1} RETURNING id;`, valuesToUpdate);
        return results;        
    } catch (e) {
        console.log(`We got a problem: ${e}`);
        throw e;
    }
}

const deleteBarDB = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM public.bars WHERE id = $1 RETURNING id;',
            [id]
        );
        return result;
    } catch (e) {
        console.log(`We got a problem: ${e}`);
        throw e;
    }
}

module.exports = { getBarDB, getBarByIdDB, createBarDB, patchBarDb, deleteBarDB };