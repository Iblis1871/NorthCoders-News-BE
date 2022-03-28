const { newsTopics, newsArticles, articlesPatch } = require("../models/models");

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
      res.status(200).json({ articles });
    })
    .catch(next);
};

exports.patchArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    articlesPatch(article_id, req.body);
    res.status(202).json({ articles });
  } catch (err) {
    next(err);
  }
};
