const express = require("express");

const app = express();

app.use(express.json());

const { getApi, getCategories } = require("./controllers/app.controllers.js");

app.get("/api", getApi);

app.get("/api/categories", getCategories);

module.exports = app;
