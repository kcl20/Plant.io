const express = require('express');
const router = express.Router();
const { getAllPlants, getPlant, addPlant, updatePlant, deletePlant } = require("../controllers/plantControllers");

router.get("/",verifyAccessToken,getAllPlants);

module.exports = router;
