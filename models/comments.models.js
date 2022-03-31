const db = require("../db/connection");
const articles = require("../db/data/test-data/comments");

exports.newsComments = async (article_id) => {
  const comments = await db.query(
    `SELECT * FROM comments WHERE article_id = $1`,
    [article_id]
  );
  return comments.rows;
};

exports.commentsPost = async (article_id, reqBody) => {
  const { username, body } = reqBody;

  const results = await db.query(
    `
  INSERT INTO comments (author, body, article_id) 
  VALUES ($1, $2, $3) 
  RETURNING *;
  `,
    [username, body, article_id]
  );
  return results.rows[0];
};

exports.commentsDelete = (comment_id) => {
  return db
    .query(
      `
    DELETE FROM comments 
    WHERE comment_id = $1
    RETURNING *;`,
      [comment_id]
    )
    .then((results) => {
      if (results.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "not found!",
        });
      }
    });
};
