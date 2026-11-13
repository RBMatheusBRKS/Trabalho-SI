const motoRepository = require("../repositories/motoRepository");

function error(status, message) {
    const e = new Error(message);
    e.status = status;
    return e;
}

async function registerBike({ modelo, marca, placa, ano, status }) {
    if (!modelo || !marca || !placa || !ano || !status) {
        throw error(400, "Todos os campos são obrigatórios!");
    }

    const statusAllowed = [
      "DISPONIVEL",
      "ALUGADA",
      "MANUTENCAO"
    ]

    if(!status) {
      throw new Error(400, "O status da moto é obrigatório!")
    } if(!statusAllowed.includes(status)) {
      throw new Error(400, "O status da moto deve ser DISPONIVEL, ALUGADA ou em MANUTENÇÃO!")
    }
  
    return await motoRepository.createBike({ modelo, marca, placa, ano, status });
  }

async function getAllBikes() {
  if(motoRepository.lenght === 0) {
      throw new Error(404, "Não há motos cadastradas!")
    }
  return await motoRepository.getAllBikes();
  }

module.exports = { registerBike, getAllBikes };  