const pool = require('../config/database');

async function createBike({ modelo, marca, placa, ano, status }) {
    const [result] = await pool.query(
          'INSERT INTO motos (modelo, marca, placa, ano, status) VALUES (?, ?, ?, ?, ?)',
        [modelo, marca, placa, ano, status]
    );
    return {id: result.insertId, modelo, marca, placa, ano, status};
}

module.exports = {createBike};