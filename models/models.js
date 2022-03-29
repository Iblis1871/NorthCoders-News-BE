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
          msg: "path not found!",
        });
      }
      return result.rows[0];
    });
};

// exports.updateTreasures = (treasure_id, edditedTreasure) => {
//   const { cost_at_auction } = edditedTreasure;
//   return db
//     .query(
//       `UPDATE treasures SET cost_at_auction = $1
//   WHERE treasure_id = $2 RETURNING *;`,
//       [cost_at_auction, treasure_id]
//     )
//     .then((result) => {
//       if (result.rows.length === 0) {
//         return Promise.reject({
//           status: 404,
//           msg: `No Treasure found at treasure_id: ${treasure_id}`,
//         });
//       }
//       return result.rows[0];
//     });
// };
