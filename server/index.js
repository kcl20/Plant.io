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

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);





app.use(express.static(path.join(__dirname, '../client/public')));

//import routes
app.use("/api/authentication", authenticationRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/user", userRoutes);
app.use("/",allplantsRoutes);


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/public/index.html'));
// });


// initiate express
const port = process.env.PORT ||6000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});