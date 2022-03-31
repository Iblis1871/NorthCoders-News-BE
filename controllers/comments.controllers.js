const {
  newsComments,
  commentsPost,
  commentsDelete,
} = require("../models/comments.models");

exports.getCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  newsComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentsById = (req, res, next) => {
  commentsPost(req.params.article_id, req.body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.deleteComment = (req, res) => {
  const { comment_id } = req.params;
  commentsDelete(comment_id).then(() => {
    res.status(204).send();
  });
};
