const express = require("express");
const foxsController = require("../controllers/foxsController");
const router = express.Router();

router.get("/foxs", foxsController.getProducts);
router.get("/foxs/:id/:desc", foxsController.getProduct);

module.exports = router;
