const { getUsersModel } = require("../models/users.models");

exports.getUsers = async (req, res, next) => {
  try {
    console.log("*** CONTROLLER ***");
    const users = await getUsersModel();

    return res.status(200).send({ users });
  } catch (err) {
    console.log("*** CATCH ***", err);

    next(err);
  }
};
