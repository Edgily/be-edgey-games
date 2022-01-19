const db = require("../db/connection.js");

exports.selectCategories = () => {
  return db.query(`SELECT category FROM reviews`).then((result) => {
    console.log(result.rows);

    return result;
  });
};
