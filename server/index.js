//setup express
const express = require('express');
const app = express();
const port = 3000;

//import mongoogse ORM
const mongoose = require('mongoose');

//import JS modules
const path = require('path');
const cors = require('cors');

//import env variables
require("dotenv").config();

//import routes
const authenticationRoutes = require("./routes/authenticationRoutes");
const userRoutes = require("./routes/userRoutes");
const plantRoutes = require("./routes/plantRoutes");

app.get('/', (req, res) => {
    res.send('Hello World!');
});