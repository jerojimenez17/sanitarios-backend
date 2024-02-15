const express = require("express");
const bethularController = require("../controllers/bethularController");
const router = express.Router();

router.get("/bethular", bethularController.getProducts);
router.get("/bethular/:id/:desc", bethularController.getProduct);

module.exports = router;
