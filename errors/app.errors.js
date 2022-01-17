exports.invalidEndpoint = (req, res, next) => {
  return res.status(404).send({
    message: "No such endpoint. Try '/api' to see a list of all endpoints.",
  });
};
