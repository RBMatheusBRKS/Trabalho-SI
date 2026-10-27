const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
// Armazena as motos em memória enquanto o servidor estiver ligado.
const motos = [];

// Retorna todas as motos cadastradas.
app.get("/motos", (req, res) => {
  res.json(motos);
});
app.get("/", (req, res) => {
  res.json({
    mensagem: "API Motiva funcionando!"
  });
});

// Inicia o servidor.
app.listen(PORT, () => {

    app.post("/motos", (req, res) => {
  const { modelo, marca, placa, ano, status } = req.body;

  // Toda moto precisa ter identificação e situação.
  if (typeof placa !== "string" || placa.trim() === "") {
    return res.status(400).json({
      erro: "A placa é obrigatória."
    });
  }

  const statusPermitidos = [
    "DISPONIVEL",
    "ALUGADA",
    "MANUTENCAO"
  ];

  if (!statusPermitidos.includes(status)) {
    return res.status(400).json({
      erro: "Informe um status válido: DISPONIVEL, ALUGADA ou MANUTENCAO."
    });
  }

  const novaMoto = {
    id: motos.length + 1,
    modelo,
    marca,
    placa: placa.trim().toUpperCase(),
    ano,
    status
  };

  motos.push(novaMoto);

  return res.status(201).json(novaMoto);
});
   
const motos = [];

app.get("/motos", (req, res) => {
  res.json(motos);
});
  console.log(`API disponível em http://localhost:${PORT}`);
});