const { patchArticleById } = require("../controllers/controllers");
const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");

exports.newsTopics = async () => {
  const results = await db.query(
    `
    SELECT * 
    FROM topics`
  );
  return results.rows;
};
exports.newsArticles = async (article_id) => {
  return db
    .query(
      `
        SELECT * 
        FROM articles
        JOIN users
        ON articles.author = users.username
        WHERE article_id = $1;
        `,
      [article_id]
    )
    .then((results) => {
      return results.rows[0];
    });
};

exports.articlesPatch = (article_id, article) => {
  const { inc_votes } = article;
  return db
    .query(
      `
      UPDATE articles
      SET votes = votes +$1
      WHERE article_id = $2
      RETURNING *;`,
      [inc_votes, article_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};
