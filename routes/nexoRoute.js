const express = require("express");
const nexoController = require("../controllers/nexoController");
const router = express.Router();

router.get("/nexo", nexoController.getProducts);
router.get("/nexo/:id/:desc", nexoController.getProduct);

module.exports = router;
