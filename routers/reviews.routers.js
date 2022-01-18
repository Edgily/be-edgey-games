const express = require("express");

const { getReviewById } = require("../controllers/reviews.controllers.js");

const reviewsRouter = express.Router();

// all addresses have /api/reviews innately

// reviewsRouter.route("/").get(placeHolder);

reviewsRouter.route("/:review_id").get(getReviewById);
// .patch(placeHolder);

// reviewsRouter.route("/:review_id/comments").get(placeHolder).post(placeHolder);

module.exports = reviewsRouter;

// planned endpoints:
// GET /api/reviews
// GET /api/reviews/:review_id
// PATCH /api/reviews/:review_id

// GET /api/reviews/:review_id/comments
// POST /api/reviews/:review_id/comments
