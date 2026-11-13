const pool = require("../database/db");

async function createBike({ modelo, marca, placa, ano, status }) {
    const [result] = await pool.query(
          'INSERT INTO motos (modelo, marca, placa, ano, status) VALUES (?, ?, ?, ?, ?)',
        [modelo, marca, placa, ano, status]
    );
    return {id: result.insertId, modelo, marca, placa, ano, status};
}

async function getAllBikes() {
    const [rows] = await pool.query("SELECT * FROM motos");
    return rows;
}

async function findByPlate(placa) {
  const [rows] = await pool.query(
    "SELECT * FROM motos WHERE placa = ? LIMIT 1",
    [placa]
  );

  return rows[0];
}

module.exports = {createBike, getAllBikes, findByPlate};