const {
  getReviewByIdModel,
  patchReviewByIdModel,
} = require("../models/reviews.models.js");

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

    return res.status(200).send({ updated });
  } catch (err) {
    next(err);
  }
};
