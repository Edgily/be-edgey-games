const fs = require("fs/promises");

exports.getEndpoints = async (req, res, next) => {
  try {
    const endpoints = await fs
      .readFile("endpoints.json", "utf-8")
      .then((data) => JSON.parse(data));

    return res.status(200).send({ endpoints });
  } catch (err) {
    next(err);
  }
};
