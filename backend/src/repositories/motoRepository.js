// Guarda as motos em memória.
const motos = [];

function listar() {
  return [...motos];
}

function cadastrar(dados) {
  const novaMoto = {
    ...dados,
    id: motos.length + 1
  };

  motos.push(novaMoto);

  return novaMoto;
}

module.exports = {
  listar,
  cadastrar
};