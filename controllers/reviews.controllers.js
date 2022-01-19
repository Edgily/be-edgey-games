const {
  getReviewsModel,
  getReviewByIdModel,
  patchReviewByIdModel,
} = require("../models/reviews.models.js");

// const { selectCategories } = require("../utils/reviews.utils.js");

exports.getReviews = async (req, res, next) => {
  try {
    console.log("CONTROLLER --->");

    const { sort_by, order, category } = req.query;

    if (category) {
      category = category.replace("%", " ");
    }

    let sortQuery = undefined;
    let orderQuery = undefined;
    let categoryQuery = undefined;

    const allowedSort = [
      "review_id",
      "title",
      "owner",
      "category",
      "designer",
      "review_img_url",
      "review_body",
      "votes",
      "created_at",
    ];

    const allowedOrder = ["desc", "asc"];

    if (allowedSort.includes(sort_by)) {
      sortQuery = sort_by;
    }

    if (allowedOrder.includes(order)) {
      orderQuery = order.toUpperCase();
    }

    // if (allowedCategory.includes(category)) {
    //   categoryQuery = category;
    // }

    if (Object.keys(req.query).length > 0) {
      if (!sortQuery && !orderQuery && !categoryQuery) {
        throw { status: 400, msg: "Bad request" };
      }
    }

    // console.log("QUERIES --->", sortQuery, orderQuery, categoryQuery);

    const reviews = await getReviewsModel(sortQuery, orderQuery, categoryQuery);

    // console.log("REVIEWS --->", reviews);

    return res.status(200).send({ reviews: reviews });
  } catch (err) {
    console.log("CATCH --->");

    next(err);
  }
};

exports.getReviewById = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const review = await getReviewByIdModel(review_id);

    if (review) {
      return res.status(200).send({ review: review });
    } else {
      throw { status: 404, msg: "Not found" };
    }
  } catch (err) {
    next(err);
  }
};

exports.patchReviewById = async (req, res, next) => {
  try {
    const { inc_votes } = req.body;
    const { review_id } = req.params;

    const updated = await patchReviewByIdModel(inc_votes, review_id);

    if (updated) {
      return res.status(200).send({ updated });
    } else {
      throw { status: 404, msg: "Not found" };
    }
  } catch (err) {
    next(err);
  }
};
