const express = require('express');
const router = require('router');
const { getAllPlants, getPlant, addPlant, updatePlant, deletePlant } = require("../controllers/plantControllers");


// api routes
router.get("/", getAllPlants);
router.get("/:plantId", getPlant);
router.post("/", addPlant);
router.put("/:plantId", updatePlant);
router.delete("/:plantId", deletePlant);

module.exports = router;
