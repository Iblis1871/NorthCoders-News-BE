const articles = require("../db/data/test-data/articles");
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
  const { article_id } = req.params;
  articlesPatch(article_id, req.body)
    .then((article) => {
      if (article_id >= 99) {
        res.status(404).send({ msg: "path not found!" });
      }
      if (article_id === String) {
        res.send(400).send({ msg: "bad request!" });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};
