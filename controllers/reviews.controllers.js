const req = require("express/lib/request");
const {
  getReviewsModel,
  getReviewByIdModel,
  patchReviewByIdModel,
  getCommentsByIdModel,
  postCommentToIdModel,
} = require("../models/reviews.models.js");

const {
  selectCategories,
  removePercent,
} = require("../utils/reviews.utils.js");

exports.getReviews = async (req, res, next) => {
  try {
    const { sort_by, order, category } = req.query;

    let sortQuery;
    let orderQuery;
    let categoryQuery;

    if (sort_by) {
      if (/^[\w_]+$/.test(sort_by)) {
        sortQuery = sort_by;
      } else {
        sortQuery = undefined;
      }
    }

    if (order) {
      if (/^(asc|desc)$/.test(order)) {
        orderQuery = order.toUpperCase();
      } else {
        orderQuery = undefined;
      }
    }

    if (category) {
      if (/^[\w%]+$/.test(category)) {
        categoryQuery = category.replace("%", " ");
      } else {
        categoryQuery = undefined;
      }
    }

    if (Object.keys(req.query).length > 0) {
      if (!sortQuery && !orderQuery && !categoryQuery) {
        throw { status: 400, msg: "Bad request" };
      }
    }

    const reviews = await getReviewsModel(sortQuery, orderQuery, categoryQuery);

    if (reviews.length > 0) {
      return res.status(200).send({ reviews });
    } else {
      throw { status: 404, msg: "Not found" };
    }
  } catch (err) {
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

exports.getCommentsById = async (req, res, next) => {
  try {
    const { review_id } = req.params;

    if (/([0-9])+/.test(review_id)) {
      const comments = await getCommentsByIdModel(review_id);

      if (comments.length > 0) {
        return res.status(200).send({ comments });
      } else {
        throw { status: 404, msg: "Not found" };
      }
    } else {
      throw { status: 400, msg: "Bad request" };
    }
  } catch (err) {
    next(err);
  }
};

exports.postCommentToId = async (req, res, next) => {
  try {
    const { review_id } = req.params;

    const { username, body } = req.body;

    const comment = await postCommentToIdModel(review_id, username, body);

    return res.status(201).send({ comment });
  } catch (err) {
    next(err);
  }
};
