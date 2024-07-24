const express = require("express");
const jarseController = require("../controllers/jarseController");
const router = express.Router();

router.get("/jarse", jarseController.getProducts);
router.get("/jarse/:id/:desc", jarseController.getProduct);

module.exports = router;
