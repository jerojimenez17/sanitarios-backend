const express = require("express");
const afipCtrl = require("../controllers/afipController");

const router = express.Router();

router.post("/afip", afipCtrl.generateVoucher);

module.exports = router;
