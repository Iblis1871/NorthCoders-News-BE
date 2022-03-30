const { newsComments, commentsPost } = require("../models/comments.models");

exports.getCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  newsComments(article_id)
    .then((articles) => {
      res.status(200).json({ articles });
    })
    .catch(next);
};

// exports.postCommentsById = (req, res, next) => {
//   commentsPost(req.body)
//     .then((comments) => {
//       res.status(201).json({ comments });
//     })
//     .catch(next);
// };

exports.postCommentsById = (req, res, next) => {
  commentsPost(req.params.article_id, req.body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
