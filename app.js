const express = require("express");

const app = express();

const apiRouter = require("./routers/api.routers.js");

app.use("/api", apiRouter);

const { invalidEndpoint } = require("./errors/app.errors.js");

app.all("*", invalidEndpoint);

module.exports = app;

// planned endpoints:
// GET /api

// GET /api/categories

// GET /api/reviews
// GET /api/reviews/:review_id
// PATCH /api/reviews/:review_id

// GET /api/reviews/:review_id/comments
// POST /api/reviews/:review_id/comments

// GET /api/users
// GET /api/users/:username

// DELETE /api/comments/:comment_id
// PATCH /api/comments/:comment_id
