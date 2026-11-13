const motoService = require("../services/motoService");

async function register(req, res) {
    try {
        const moto = await motoService.registerBike(req.body);

        return res.status(201).json({
            message: "Moto cadastrada com sucesso!",
            moto
        });

    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({
                error: error.message
            });
        }

        console.log(error);

        return res.status(500).json({
            error: "Erro no cadastro da moto"
        });
    }
}

async function getAll(req, res) {
    try {
        const motos = await motoService.getAllBikes();
        return res.status(200).json(motos);

    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message
        });
    }
}

module.exports = { register, getAll };