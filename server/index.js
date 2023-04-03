const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authenticationRoutes = require("./routes/authenticationRoutes");
const userRoutes = require("./routes/userRoutes");
const plantRoutes = require("./routes/plantRoutes");
const Plant = require("./models/Plant");
const allplantsRoutes = require("./routes/allplantsRoutes");
const path = require('path');

//import env variables
require("dotenv").config();

app.use(express.json());
app.use(cors());

//import mongoogse ORM
const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl, err => {
  if (err) throw err;
  console.log("Mongodb connected...");
});


app.use(express.static(path.join(__dirname, '../client/build')));

//import routes
app.use("/api/authentication", authenticationRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/user", userRoutes);
app.use("/",allplantsRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// initiate express
const port = process.env.PORT ||6000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});