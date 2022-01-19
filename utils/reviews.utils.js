const db = require("../db/connection.js");

exports.selectCategories = () => {
  return db.query(`SELECT category FROM reviews`).then((result) => {
    return Array.from(new Set(result.rows.map((item) => item.category)));
  });
};

exports.removePercent = (category) => {
  return category.replace("%", " ");
};
