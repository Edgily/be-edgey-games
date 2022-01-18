const db = require("../db/connection.js");

exports.getCategoriesModel = () => {
  return db.query(`SELECT * FROM categories;`);
};
