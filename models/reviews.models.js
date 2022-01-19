const db = require("../db/connection.js");

exports.getReviewsModel = (
  sortQuery = "created_at",
  orderQuery = "DESC",
  categoryQuery
) => {
  console.log("MODEL --->");

  let categoryLine = "";

  console.log("CATEGORYQUERY --->", categoryQuery);

  // if (categoryQuery) {
  //   categoryLine = `HAVING reviews.category = '${categoryQuery}'`;
  // }

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
  LEFT JOIN comments
    ON reviews.review_id = comments.review_id
  GROUP BY reviews.review_id, comments.review_id
  ORDER BY ${sortQuery} ${orderQuery}
  ;
  `;

  // ${categoryLine}
  console.log(query);

  return db.query(query).then((result) => result.rows);
};

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

exports.patchReviewByIdModel = (inc_votes, review_id) => {
  const query = `
    UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING *
    ;`;

  return db
    .query(query, [inc_votes, review_id])
    .then((result) => result.rows[0]);
};
