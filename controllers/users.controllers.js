const users = require("../db/data/test-data/users");
const {
  usersWithUsername,
  usersByUsername,
} = require("../models/users.models");

exports.getUsers = (req, res, next) => {
  usersWithUsername()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch(next);
};

exports.getUsersByUsername = (req, res, next) => {
  const { username } = req.params;
  usersByUsername()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch(next);
};
