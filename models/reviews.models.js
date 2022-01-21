const db = require("../db/connection.js");
const reviewsRouter = require("../routers/reviews.routers.js");

exports.getReviewsModel = (
  sortQuery = "created_at",
  orderQuery = "DESC",
  categoryQuery
) => {
  let categoryLine = "";

  if (categoryQuery) {
    categoryLine = `HAVING reviews.category = '${categoryQuery}'`;
  }

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
  ${categoryLine}
  ORDER BY ${sortQuery} ${orderQuery}
  ;
  `;

  return db.query(query).then((result) => {
    return result.rows;
  });
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
  let votesMod = inc_votes;

  let query = `
    UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING *
    ;`;

  if (inc_votes < 0) {
    votesMod = JSON.stringify(votesMod).replace("-", "");
    query = `
        UPDATE reviews
        SET votes = votes - $1
        WHERE review_id = $2
        RETURNING *
        ;`;
  }

  return db.query(query, [votesMod, review_id]).then((result) => {
    return result.rows[0];
  });
};

exports.getCommentsByIdModel = (review_id) => {
  const query = `
    SELECT comment_id, author, body, votes, created_at 
    FROM comments
    WHERE comments.review_id = ${review_id};
    `;

  return db.query(query).then((result) => result.rows);
};

exports.postCommentToIdModel = (reviewIdQuery, usernameQuery, bodyQuery) => {
  const query = `
    INSERT INTO comments
    (review_id, author, body)
    VALUES
    ($1, $2, $3)
    RETURNING *
    ;`;

  return db
    .query(query, [reviewIdQuery, usernameQuery, bodyQuery])
    .then((result) => {
      return result.rows[0];
    });
};
