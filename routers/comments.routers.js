const express = require("express");

const {
  controllerFunctions,
} = require("../controllers/comments.controllers.js");

const commentsRouter = express.Router();

// all addresses have /api/comments innately
commentsRouter.route("/:comment_id").delete(placeHolder).patch(placeHolder);

module.exports = commentsRouter;

// planned endpoints:
// DELETE /api/comments/:comment_id
// PATCH /api/comments/:comment_id
