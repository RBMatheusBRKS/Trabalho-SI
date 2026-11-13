const { Routes } = require("express");
const motoController = require("../controller/motoController");

const router = Routes();

router.post('/motos', motoController.register);

module.exports = router;