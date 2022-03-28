const { query } = require("../db/connection");
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

exports.articlesPatch = async (inc_votes) => {
  const { votes } = inc_votes;
  const results = await db.query(
    `
      UPDATE articles
      SET votes =$1
      WHERE article_id = $2
      RETURNING *;`,
    [votes, articles_id]
  );
  if (results.rows.length === 0) {
    return Promise.reject({ status: 404, msg: " path not found!" });
  }
  return results.rows[0];
};
