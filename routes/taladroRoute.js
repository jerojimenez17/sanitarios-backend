const express = require("express");
const taladroController = require("../controllers/taladroController");
const router = express.Router();

router.get("/taladro", taladroController.getProducts);
router.get("/taladro/:id/:desc", taladroController.getProduct);

module.exports = router;
