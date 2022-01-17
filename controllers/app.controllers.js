const app = require("../app");
const { getCategoriesModel } = require("../models/app.models");

exports.getApi = (req, res, next) => {
  const endpoints = {
    "/api": "Get a list of all endpoints",
    "/api/categories": "Get a list of all categories",
  };

  return res.status(200).send({ endpoints });
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await getCategoriesModel();

    return res.status(200).send({ categories: categories.rows });
  } catch (error) {
    next(error);
  }
};
