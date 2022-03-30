const express = require("express");
const {
  getTopics,
  getArticleById,
  patchArticleById,
} = require("./controllers/articles.controllers");
const { getUsers } = require("./controllers/users.controllers");
const { getCommentsById } = require("./controllers/comments.controllers");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsById);
app.patch("/api/articles/:article_id", patchArticleById);

app.get("/api/users", getUsers);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((req, res, next) => {
  res.status(404).send({ msg: "path not found!" });
});

app.use((err, req, res, next) => {
  res.status(400).send({ msg: "bad request!" });
});

module.exports = app;
