const express = require("express");
const jmController = require("../controllers/jmController");
const router = express.Router();

router.get("/jm", jmController.getProducts);
router.get("/jm/:id/:desc", jmController.getProduct);

module.exports = router;
