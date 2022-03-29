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
  //   try {
  //     const { article_id } = req.params;
  //     const { inc_votes } = req.body;
  //     const articlesPatch = await model.articlesPatch(article_id, inc_votes);
  //     res.status(202).json({ articles });
  //   } catch (err) {
  //     next(err);
  //   }
  //   const { article_id } = req.params;
  //   const { inc_votes } = req.body;
  //   if (article_id.length === 0) {
  //     res.status(400).send();
  //   }
  //   articlesPatch(
  //     (article_id, inc_votes).then((articles) => {
  //       res.status(202).json({ articles });
  //     })
  //   );

  //// Kept the above in for review as couldn't get async/await pattern to work, or wasn't using it correctly ////

  const { article_id } = req.params;
  articlesPatch(article_id, req.body)
    .then((article) => {
      if (article_id >= 99) {
        res.status(400).send({ msg: "bad request!" });
      }
      res.status(202).send({ article });
    })
    .catch(next);
};
