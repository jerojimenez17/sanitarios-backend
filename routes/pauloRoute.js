const express = require("express");
const pauloController = require("../controllers/pauloController");
const router = express.Router();

router.get("/paulo", pauloController.getProducts);
router.get("/paulo/:id/:desc", pauloController.getProduct);

module.exports = router;
