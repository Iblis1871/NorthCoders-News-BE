const db = require("../db/connection");
const articles = require("../db/data/test-data/comments");

exports.newsComments = async (article_id) => {
  const comments = await db.query(
    `SELECT * FROM comments WHERE article_id = $1`,
    [article_id]
  );
  return comments.rows[0];
};

exports.commentsPost = async (articleID, reqBody) => {
  const { username, body } = reqBody;

  const results = await db.query(
    `
  INSERT INTO comments (author, body, article_id) 
  VALUES ($1, $2, $3) 
  RETURNING *;
  `,
    [username, body, articleID]
  );
  return results.rows[0];
};
