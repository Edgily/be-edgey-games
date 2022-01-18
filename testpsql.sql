\c nc_games_test;

-- SELECT USERS.username, COUNT(FAVORITES.id) 
-- FROM USERS 
-- INNER JOIN FAVORITES 
-- ON FAVORITES.userID=USERS.id 
-- GROUP BY USERS.username
-- HAVING COUNT(FAVORITES.id) > 2;

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
  HAVING comments.review_id = 3;

-- reviews.review_id, 
-- reviews.title, 
-- reviews.owner, 
-- reviews.category, 
-- reviews.designer, 
-- reviews.review_img_url, 
-- reviews.review_body, 
-- reviews.votes, 
-- reviews.created_at,
-- comments.review_id,