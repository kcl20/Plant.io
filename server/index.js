//setup express
const express = require('express');
const app = express();
// const port = 3000;
app.use(express.json());


//import mongoogse ORM
const mongoose = require('mongoose');
const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl, err => {
  if (err) throw err;
  console.log("Mongodb connected...");
});

//import JS modules
const path = require('path');
const cors = require('cors');
app.use(cors());


//import env variables
require("dotenv").config();

//import routes
const authenticationRoutes = require("./routes/authenticationRoutes");
const userRoutes = require("./routes/userRoutes");
const plantRoutes = require("./routes/plantRoutes");

app.use("/api/authentication", authenticationRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/user", userRoutes);

//To-do OPENAI chatGPT component





// initiate express
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});