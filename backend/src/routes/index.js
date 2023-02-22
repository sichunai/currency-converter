const express = require("express");
const router = express.Router();
const currency = require("./currency");
const conversion = require("./conversion");
router.get("/currency", currency);
router.get("/conversion", conversion);
module.exports = router;
