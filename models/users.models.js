const db = require("../db/connection");
const users = require("../db/data/test-data/users");

exports.usersWithUsername = async () => {
  const results = await db.query(
    `
    SELECT * 
    FROM users;`
  );
  return results.rows;
};

exports.usersByUsername = async () => {
  const results = await db.query(
    `
    SELECT * 
    FROM users;`
  );
  return results.rows;
};
