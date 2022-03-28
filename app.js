const express = require("express");
const { getTopics, getArticleById } = require("./controllers/controllers");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);

// app.post("ABC", ABC);

// app.patch("ABC", ABC);

// app.delete("ABC", ABC);

app.use((req, res, next) => {
  res.status(404).send({ msg: "path not found!" });
});

app.use((err, req, res, next) => {
  res.status(400).send({ msg: "bad request!" });
});

module.exports = app;
