const users = require("../db/data/test-data/users");
const { usersWithUsername } = require("../models/users.models");

exports.getUsers = (req, res, next) => {
  usersWithUsername()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch(next);
};
