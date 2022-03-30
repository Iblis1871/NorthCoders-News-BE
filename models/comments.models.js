const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");

exports.newsComments = async (article_id) => {
  const comments = await db.query(
    `SELECT * FROM comments WHERE article_id = $1`,
    [article_id]
  );
  return comments.rows[0];
};
