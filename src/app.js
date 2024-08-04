require('dotenv').config({ path: './src/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/routes');

const app = express();

// Configure EJS as a preview engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

module.exports = app;