exports.getEndpoints = (req, res, next) => {
  const endpoints = {
    "/api": "Get a list of all endpoints",
    "/api/categories": "Get a list of all categories",
  };

  return res.status(200).send({ endpoints });
};
