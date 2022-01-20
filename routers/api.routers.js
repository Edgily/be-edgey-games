const express = require("express");

const { getEndpoints } = require("../controllers/app.controllers.js");
const { getCategories } = require("../controllers/categories.controllers.js");

const apiRouter = express.Router();

const reviewsRouter = require("../routers/reviews.routers.js");
// const usersRouter = require("../routers/users.routers.js");
const commentsRouter = require("../routers/comments.routers.js");

// all addresses have /api innately
apiRouter.get("/", getEndpoints);
apiRouter.get("/categories", getCategories);

apiRouter.use("/reviews", reviewsRouter);

// apiRouter.use("/users", usersRouter);

apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;

// planned endpoints:
// GET /api ***

// GET /api/categories ***

// GET /api/reviews
// GET /api/reviews/:review_id
// PATCH /api/reviews/:review_id

// GET /api/reviews/:review_id/comments
// POST /api/reviews/:review_id/comments

// GET /api/users
// GET /api/users/:username

// DELETE /api/comments/:comment_id
// PATCH /api/comments/:comment_id
