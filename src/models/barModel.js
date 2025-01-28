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

module.exports = { getBarDB, createBarDB };