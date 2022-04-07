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

exports.usersByUsername = async (username) => {
  const results = await db.query(
    `
    SELECT * 
    FROM users
    WHERE username =$1
    ;`,
    [username]
  );
  return results.rows;
};
