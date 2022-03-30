const { newsComments } = require("../models/comments.models");

exports.getCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  newsComments(article_id)
    .then((articles) => {
      res.status(200).json({ articles });
    })
    .catch(next);
};
