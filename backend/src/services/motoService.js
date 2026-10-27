const motoRepository = require("../repositories/motoRepository");

const statusPermitidos = [
  "DISPONIVEL",
  "ALUGADA",
  "MANUTENCAO"
];

function listar() {
  return motoRepository.listar();
}

function cadastrar(dados = {}) {
  const { modelo, marca, placa, ano, status } = dados;

  if (typeof placa !== "string" || placa.trim() === "") {
    throw new Error("A placa é obrigatória.");
  }

  if (!statusPermitidos.includes(status)) {
    throw new Error(
      "Informe um status válido: DISPONIVEL, ALUGADA ou MANUTENCAO."
    );
  }

  return motoRepository.cadastrar({
    modelo,
    marca,
    placa: placa.trim().toUpperCase(),
    ano,
    status
  });
}

module.exports = {
  listar,
  cadastrar
};