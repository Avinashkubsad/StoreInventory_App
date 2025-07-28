const express = require("express");
const router = express.Router();
const { submitPurchase } = require("../controllers/purchaseController");

router.post("/submit", submitPurchase);
module.exports = router;
