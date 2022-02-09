const express = require("express");

const { getUsers, postUsers } = require("../controllers/users.controllers.js");

const usersRouter = express.Router();

// all addresses have /api/users innately
usersRouter.route("/").get(getUsers);
usersRouter.route("/").post(postUsers);
// usersRouter.route("/").delete(placeholder);

// usersRouter.route("/:username").get(placeHolder);

module.exports = usersRouter;

// planned endpoints:
// GET /api/users
// GET /api/users/:username
