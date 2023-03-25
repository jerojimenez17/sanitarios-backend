const express = require("express");
const cerrajeriaController = require("../controllers/cerrajeriaController");
const router = express.Router();

router.get("/cerrajeria", cerrajeriaController.getProducts);
router.get("/cerrajeria/:id/:desc", cerrajeriaController.getProduct);

module.exports = router;
