exports.getAPI = (req, res, next) => {
  const app = require("../endpoints.json");
  res.status(200).send(app);
};
