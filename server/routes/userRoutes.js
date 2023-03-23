const express = require("express");
const router = express.Router();
const { getUser } = require("../controllers/userControllers");


// Routes beginning with /api/profile
router.get("/", getUser);

module.exports = router;