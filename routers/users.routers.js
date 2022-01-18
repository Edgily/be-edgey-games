const express = require("express");

const { controllerFunctions } = require("../controllers/users.controllers.js");

const usersRouter = express.Router();

// all addresses have /api/users innately
usersRouter.route("/").get(placeHolder);

usersRouter.route("/:username").get(placeHolder);

module.exports = usersRouter;

// planned endpoints:
// GET /api/users
// GET /api/users/:username
