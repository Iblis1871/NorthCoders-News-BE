const { newsTopics } = require("../models/models");

exports.getTopics = (req, res, next) => {
  newsTopics()
    .then((topics) => {
      res.status(200).json({ topics });
    })
    .catch(next);
};
