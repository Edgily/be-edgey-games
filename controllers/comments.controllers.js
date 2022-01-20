const { deleteCommentModel } = require("../models/comments.models");

exports.deleteComment = async (req, res, next) => {
  try {
    const { comment_id } = req.params;

    const goDelete = await deleteCommentModel(comment_id);
    if (goDelete) {
      return res.sendStatus(204);
    } else {
      throw { status: 404, msg: "Not found" };
    }
  } catch (err) {
    next(err);
  }
};
