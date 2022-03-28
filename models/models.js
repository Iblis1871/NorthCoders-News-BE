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
exports.newsArticles = (article_id) => {
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
