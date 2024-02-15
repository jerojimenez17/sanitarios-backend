const express = require("express");
const bethularController = require("../controllers/bethularController");
const router = express.Router();

router.get("/fg", bethularController.getProducts);
router.get("/fg/:id/:desc", bethularController.getProduct);

module.exports = router;
