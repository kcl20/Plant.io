//to-do: server side code

const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


app.get('/', (req, res) => {
    res.send('Hello World!');
});