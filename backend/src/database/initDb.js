const pool = require('./db');

async function initDb() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS motos (
            modelo VARCHAR(75) NOT NULL,
            marca VARCHAR(75) NOT NULL,
            ano INT NOT NULL,
            placa VARCHAR(7) NOT NULL,
            status ENUM('DISPONIVEL','ALUGADA','MANUTENÇÃO') NOT NULL DEFAULT 'DISPONIVEL'
        )
    `);
}

module.exports= initDb;