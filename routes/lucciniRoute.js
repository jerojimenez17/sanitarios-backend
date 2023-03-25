const express = require("express");
const lucciniController = require("../controllers/lucciniController");
const router = express.Router();

router.get("/luccini", lucciniController.getProducts);
router.get("/luccini/:id/:desc", lucciniController.getProduct);

module.exports = router;
