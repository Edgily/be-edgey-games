const express = require("express");

const { getUsers } = require("../controllers/users.controllers.js");

const usersRouter = express.Router();

// all addresses have /api/users innately
usersRouter.route("/").get(getUsers);

// usersRouter.route("/:username").get(placeHolder);

module.exports = usersRouter;

// planned endpoints:
// GET /api/users
// GET /api/users/:username
