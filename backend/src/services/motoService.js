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
  ];

  if (!statusAllowed.includes(status)) {
    throw error(400, "Status inválido!");
  }

  const placaNormalizada = placa.trim().toUpperCase()
  const motoExistente = await motoRepository.findByPlate(placaNormalizada);
  if (motoExistente) {
    throw error(409, "Já existe uma moto cadastrada com essa placa!");
  }

  if (placa.length !== 7) {
    throw error(400, "A placa deve possuir exatamente 7 caracteres!");
  }

  return await motoRepository.createBike({
    modelo,
    marca,
    placa: placaNormalizada,
    ano,
    status
  });
}

async function getAllBikes() {
  const motos = await motoRepository.getAllBikes();

  if (motos.length === 0) {
    throw error(404, "Não há motos cadastradas!");
  }

  return motos;
}

module.exports = { registerBike, getAllBikes };