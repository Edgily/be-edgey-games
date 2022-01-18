const db = require("../db/connection.js");

exports.getReviewByIdModel = (review_id) => {
  const query = `
    SELECT
    reviews.review_id, 
    reviews.title, 
    reviews.owner, 
    reviews.category, 
    reviews.designer, 
    reviews.review_img_url, 
    reviews.review_body, 
    reviews.votes, 
    reviews.created_at,
    COUNT(comments.review_id) AS comment_count
    FROM reviews
    JOIN comments
      ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id, comments.review_id
    HAVING comments.review_id = $1;`;

  return db.query(query, [review_id]).then((result) => result.rows[0]);
};
