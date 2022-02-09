const db = require("../db/connection.js");

exports.getUsersModel = () => {
  const query = `
  SELECT * FROM users
  ;`;

  return db.query(query).then((result) => result.rows);
};

exports.postUsersModel = ({ username, name, avatar_url }) => {
  const query = `
  INSERT INTO users
  (username, name, avatar_url)
  VALUES
  ($1, $2, $3)
  RETURNING *
  ;`;

  return db
    .query(query, [username, name, avatar_url])
    .then((result) => result.rows[0]);
};
