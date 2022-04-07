const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");

exports.newsTopics = async () => {
  const results = await db.query(
    `
    SELECT * 
    FROM topics
    ;`
  );
  return results.rows;
};

exports.sortArticles = async (
  article_id,
  sort_by = "created_at",
  order = "desc",
  topic
) => {
  let query = `SELECT * FROM articles`;
  const values = [];
  if (article_id !== undefined) {
    query += " WHERE article_id = $1";
    values.push(article_id);
    if (topic !== undefined) {
      query += ` AND topic = $2`;
      values.push(topic);
    }
  }
  if (topic !== undefined) {
    query += ` WHERE topic = $1`;
    values.push(topic);
  }

  query += ` ORDER BY ${sort_by} ${order};`;

  const result = await db.query(query, values);

  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found!" });
  }

  return result.rows;
};

exports.newsArticles = async (
  article_id,
  sort_by = "article_id",
  order_by = "DESC"
) => {
  const articleSQLreturn = await db.query(
    `
    SELECT  articles.*,
    COUNT(comments.comment_id)
    AS comment_count
    FROM articles
    JOIN comments
    ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order_by}
    ;`,
    [article_id]
  );
  // QUERY SQL STILL TO BE COMPLETED
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
