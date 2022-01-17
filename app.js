const express = require("express");

const app = express();

app.use(express.json());

const {
  getEndpoints,
  getCategories,
} = require("./controllers/app.controllers.js");

const { invalidEndpoint } = require("./errors/app.errors.js");

app.get("/api", getEndpoints);

app.get("/api/categories", getCategories);

app.all("*", invalidEndpoint);

module.exports = app;
