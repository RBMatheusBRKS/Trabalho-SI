const { Router } = require("express");
const motoController = require("../controller/motoController");

const router = Router();

router.post('/motos', motoController.register);
router.get('/motos', motoController.getAll);

module.exports = router;