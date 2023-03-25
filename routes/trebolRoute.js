const express = require("express");
const trebolController = require("../controllers/trebolController");
const router = express.Router();

router.get("/trebol", trebolController.getProducts);
router.get("/trebol/:id/:desc", trebolController.getProduct);

module.exports = router;
