const {
  getUsersModel,
  postUsersModel,
  deleteUserModel,
} = require("../models/users.models");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await getUsersModel();

    return res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

exports.postUsers = async (req, res, next) => {
  try {
    const user = await postUsersModel(req.body);

    return res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
};

// commented out until can figure out SQL shenanigans
// exports.deleteUser = async (req, res, next) => {
//   try {
//     console.log("***CONTROLLER***");

//     const goDelete = await deleteUserModel(req.params);

//     console.log(goDelete);
//   } catch (err) {
//     console.log("***CATCH***");
//     console.log(err);
//     next(err);
//   }
// };
