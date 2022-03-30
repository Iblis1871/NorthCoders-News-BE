const {
  newsTopics,
  newsArticles,
  articlesPatch,
} = require("../models/articles.models");

exports.getTopics = (req, res, next) => {
  newsTopics()
    .then((topics) => {
      res.status(200).json({ topics });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  newsArticles(article_id)
    .then((articles) => {
      if (article_id.length === 0) {
        res.status(400).send();
      }
      res.status(200).send({ articles: articles[0] });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  articlesPatch(article_id, req.body)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  newsComments(article_id)
    .then((articles) => {
      res.status(200).json({ articles });
    })
    .catch(next);
};
