const db = require("../connection");
const format = require("pg-format");
const {
  formatCategories,
  formatUsers,
  formatReviews,
  formatComments,
} = require("../../utils/seed.utils.js");

const seed = (data) => {
  const { categoryData, userData, reviewData, commentData } = data;
  // 1. create tables
  // 2. insert data

  return (
    // DROP existing section
    db
      .query(`DROP TABLE IF EXISTS categories CASCADE;`)
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS users CASCADE;`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS reviews CASCADE;`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS comments;`);
      })

      // CREATE tables section
      .then(() => {
        return db.query(`
          CREATE TABLE categories (
            slug VARCHAR(255) PRIMARY KEY,
            description VARCHAR(1000)
          );`);
      })
      .then(() => {
        return db.query(`
          CREATE TABLE users (
            username VARCHAR(255) PRIMARY KEY,
            avatar_url VARCHAR(1000), 
            name VARCHAR(255)
          );`);
      })
      .then(() => {
        return db.query(`
          CREATE TABLE reviews (
            review_id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            owner VARCHAR(255) REFERENCES users(username) NOT NULL,
            category VARCHAR(255) REFERENCES categories(slug),
            designer VARCHAR(255),
            review_img_url VARCHAR(1000) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
            review_body TEXT,
            votes INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT NOW()
          );`);
      })
      .then(() => {
        return db.query(`
          CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY,
            review_id INT REFERENCES reviews(review_id),
            author VARCHAR(255) REFERENCES users(username) NOT NULL,
            body VARCHAR(1000),
            votes INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT NOW()
          );`);
      })

      // INSERT data into tables section
      .then(() => {
        const query = format(
          `INSERT INTO categories
          (slug, description)
          VALUES
          %L
          RETURNING *;`,
          formatCategories(categoryData)
        );
        return db.query(query);
      })
      .then(() => {
        const query = format(
          `INSERT INTO users
          (username, name, avatar_url)
          VALUES
          %L
          RETURNING *;`,
          formatUsers(userData)
        );
        return db.query(query);
      })
      .then(() => {
        const query = format(
          `INSERT INTO reviews
          (title, owner, category, designer, review_img_url, review_body, votes, created_at)
          VALUES
          %L
          RETURNING *;`,
          formatReviews(reviewData)
        );
        return db.query(query);
      })
      .then(() => {
        const query = format(
          `INSERT INTO comments
          (review_id, author, body, votes, created_at)
          VALUES
          %L
          RETURNING *;`,
          formatComments(commentData)
        );
        return db.query(query);
      })

      // CATCH section
      .catch((err) => console.log(err))
  );
};

module.exports = seed;
