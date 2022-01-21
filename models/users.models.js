const db = require("../db/connection.js");

exports.getUsersModel = () => {
  console.log("*** MODEL ***");
  const query = `
  SELECT * FROM users
  ;`;

  return db.query(query).then((result) => result.rows);
};
