const express = require("express");
const fgController = require("../controllers/fgController");
const router = express.Router();

router.get("/fg", fgController.getProducts);
router.get("/fg/:id/:desc", fgController.getProduct);

module.exports = router;
