const express = require("express");
const ciardiController = require("../controllers/ciardiController");
const router = express.Router();

router.get("/ciardi", ciardiController.getProducts);
router.get("/ciardi/:id/:desc", ciardiController.getProduct);

module.exports = router;
