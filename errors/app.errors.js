exports.invalidEndpoint = (req, res) => {
  return res.status(404).send({
    message: "Invalid endpoint. Try '/api' to see a list of all endpoints.",
  });
};

exports.errorCustom = (err, req, res, next) => {
  if (err.status && err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.errorPsql = (err, req, res, next) => {
  if (err.code === "22P02") {
    return res.status(400).send({ msg: "Bad request" });
  } else next(err);
};

exports.errorAll = (err, req, res, next) => {
  return res.status(500).send({ msg: "Internal Server Error" });
};
