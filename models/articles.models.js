const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");

exports.newsTopics = async () => {
  const results = await db.query(
    `
    SELECT * 
    FROM topics;`
  );
  return results.rows;
};

exports.newsArticles = async (article_id) => {
  const articleSQLreturn = await db.query(
    `
    SELECT articles.*, 
    COUNT(comments.comment_id) 
    AS comment_count 
    FROM articles 
    JOIN comments 
    ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;
    `,
    [article_id]
  );
  const { rows } = articleSQLreturn;
  return rows;
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
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "not found!",
        });
      }
      return result.rows[0];
    });
};
