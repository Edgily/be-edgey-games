const { getReviewByIdModel } = require("../models/reviews.models.js");

exports.getReviewById = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const review = await getReviewByIdModel(review_id);

    return res.status(200).send({ review: review });
  } catch (error) {
    next(error);
  }
};
