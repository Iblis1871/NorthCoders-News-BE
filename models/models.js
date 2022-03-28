const db = require("../db/connection");

exports.newsTopics = () => {
  return db
    .query(
      `
    SELECT * 
    FROM topics
    ORDER BY slug;`
    )
    .then((results) => {
      return results.rows;
    });
};
