const { newsTopics, newsArticles } = require("../models/models");

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
      if (article_id === undefined) {
        res.status(400).send();
      }
      res.status(200).json({ articles });
    })
    .catch(next);
};
