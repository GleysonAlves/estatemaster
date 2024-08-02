const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Configure EJS as a preview engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;