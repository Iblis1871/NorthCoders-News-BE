const express = require("express");
const {
  getTopics,
  getArticleById,
  patchArticleById,
  getAndSortArticles,
} = require("./controllers/articles.controllers");
const { getUsers } = require("./controllers/users.controllers");
const {
  getCommentsById,
  postCommentsById,
  deleteComment,
} = require("./controllers/comments.controllers");
const { getAPI } = require("./controllers/app.controllers");

const app = express();
app.use(express.json());

app.get("/api", getAPI);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticleById);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsById);
app.patch("/api/articles/:article_id", patchArticleById);
app.post("/api/articles/:article_id/comments", postCommentsById);
app.delete("/api/comments/:comment_id", deleteComment);
app.get("/api/users", getUsers);
////////////////////////////////////////////////////////////////////




app.use((err, req, res, next) => {
  errors = ["22P02"];
  if (errors.includes(err.code)) {
    res.status(400).send({ msg: "bad request!" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((req, res, next) => {
  res.status(404).send({ msg: "not found!" });
});

app.use((err, req, res, next) => {
  res.status(400).send({ msg: "bad request!" });
});

module.exports = app;
