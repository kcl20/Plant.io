const Plant = require("../models/Plant");
const { validateObjectId } = require("../utils/validation");

// If user is authenticated, return only their plant posts
exports.getUserPlants = async (req, res) => {
  try {
    const plants = await Plant.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ plants, status: true, msg: "Plants found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

// If user is not authenticated, return all plant posts
exports.getAllPlants = async (req, res) => {
  try {
      const plants = await Plant.find().sort({ createdAt: -1 });
      res.status(200).json({ plants, status: true, msg: "Plants found successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

exports.getPlant = async (req, res) => {
  try {

    const plant = await Plant.findOne({ user: req.user.id, _id: req.params.plantId });
    if (!plant) {
      return res.status(400).json({ status: false, msg: "No plant found.." });
    }
    res.status(200).json({ plant, status: true, msg: "Plant found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.addPlant = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ status: false, msg: "Name of plant not found" });
    }
    const { description, sunlight, water, temperature, humidity, secure_url } = req.body;
    const plant = await Plant.create({ user: req.user.id, name, description, sunlight, water, temperature, humidity, secure_url });
    res.status(200).json({ plant, status: true, msg: "Plant created successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.updatePlant = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ status: false, msg: "Name of plant not found" });
    }

    const { description, sunlight, water, temperature, humidity, secure_url } = req.body;

    if (!validateObjectId(req.params.plantId)) {
      return res.status(400).json({ status: false, msg: "Plant id not valid" });
    }

    let plant = await Plant.findById(req.params.plantId);
    if (!plant) {
      return res.status(400).json({ status: false, msg: "Plant with given id not found" });
    }

    if (plant.user != req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't update plant of another user" });
    }

    plant = await Plant.findByIdAndUpdate(req.params.plantId, { name, description, sunlight, water, temperature, humidity, secure_url }, { new: true });
    res.status(200).json({ plant, status: true, msg: "Plant updated successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}


exports.deletePlant = async (req, res) => {
  try {
    if (!validateObjectId(req.params.plantId)) {
      return res.status(400).json({ status: false, msg: "Plant id not valid" });
    }

    let plant = await Plant.findById(req.params.plantId);
    if (!plant) {
      return res.status(400).json({ status: false, msg: "Plant with given id not found" });
    }

    if (plant.user != req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't delete plant of another user" });
    }

    await Plant.findByIdAndDelete(req.params.plantId);
    res.status(200).json({ status: true, msg: "Plant deleted successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}