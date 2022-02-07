const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const apiRouter = require("./routers/api.routers.js");

app.use("/api", apiRouter);

// Invalid endpoint
const { invalidEndpoint } = require("./errors/app.errors.js");

app.all("*", invalidEndpoint);

// Errors section
const { errorCustom, errorPsql, errorAll } = require("./errors/app.errors.js");

app.use(errorCustom);

app.use(errorPsql);

app.use(errorAll);

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
