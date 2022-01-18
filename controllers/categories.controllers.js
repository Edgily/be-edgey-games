const { getCategoriesModel } = require("../models/categories.models.js");

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await getCategoriesModel();

    return res.status(200).send({ categories: categories.rows });
  } catch (error) {
    next(error);
  }
};
