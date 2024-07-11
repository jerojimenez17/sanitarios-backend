const express = require("express");
const sergioController = require("../controllers/sergioController");
const router = express.Router();

router.get("/sergio", sergioController.getProducts);
router.get("/sergio/:id/:desc", sergioController.getProduct);

module.exports = router;
