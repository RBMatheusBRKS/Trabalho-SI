const motoService = require("../services/motoService");

async function register(req, res) {
    try {
        const moto = await motoService.registerBike(req.body);
        console.log("Moto cadastrada com sucesso!", moto)
    } catch (error) {
        if(error.status) {
            return res.status(error.status).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: "Erro no cadastro da moto" });
    }
}

module.exports = { register };