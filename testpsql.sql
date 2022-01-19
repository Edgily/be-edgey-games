\c nc_games_test;



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
      HAVING reviews.category = 'social deduction'
      ORDER BY created_at DESC
      ;

-- review_id, 
-- title, 
-- owner, 
-- category, 
-- designer, 
-- review_img_url, 
-- review_body, 
-- votes, 
-- created_at,