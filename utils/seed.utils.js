// categoryData, userData, reviewData, commentData

exports.formatCategories = (categoryData) => {
  return categoryData.map((category) => [category.slug, category.description]);
};

exports.formatUsers = (userData) => {
  return userData.map((user) => [user.username, user.name, user.avatar_url]);
};

exports.formatReviews = (reviewData) => {
  return reviewData.map((review) => [
    review.title,
    review.owner,
    review.category,
    review.designer,
    review.review_img_url,
    review.review_body,
    review.votes,
    review.created_at,
  ]);
};

exports.formatComments = (commentData) => {
  return commentData.map((comment) => [
    comment.review_id,
    comment.author,
    comment.body,
    comment.votes,
    comment.created_at,
  ]);
};
