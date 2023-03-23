const Plant = require("../models/Plant");
const { validateObjectId } = require("../utils/validation");


exports.getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find({ user: req.user.id });
    res.status(200).json({ plants, status: true, msg: "Plants loaded successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.getPlant = async (req, res) => {
  try {
    if (!validateObjectId(req.params.plantId)) {
      return res.status(400).json({ status: false, msg: "Plant id not valid" });
    }

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
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ status: false, msg: "Description of plant not found" });
    }
    const plant = await Plant.create({ user: req.user.id, description });
    res.status(200).json({ plant, status: true, msg: "Plant created successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.updatePlant = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ status: false, msg: "Description of plant not found" });
    }

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

    plant = await Plant.findByIdAndUpdate(req.params.plantId, { description }, { new: true });
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