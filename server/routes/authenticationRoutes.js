const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authenticationControllers');
const { verifyAccessToken } = require("../middlewares.js");
// routes for logging in and signing up
router.post("/signup",verifyAccessToken, signup);
router.post("/login", verifyAccessToken,login);

module.exports = router;
