const express = require('express');
const router = require('router');
const { signup, login } = require('../controllers/authenticationController');

// routes for logging in and signing up
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
