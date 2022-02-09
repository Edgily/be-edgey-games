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

// commented out until can figure out SQL shenanigans
// exports.deleteUserModel = ({ username }) => {
//   console.log("***MODEL***");
//   console.log(username);

//   const query = `
//     DELETE FROM users
//     WHERE username = $1
//     RETURNING *;
//   ;`;

//   return db.query(query, [username]).then((result) => console.log(res.rows));
// };
