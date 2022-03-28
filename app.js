const express = require("express");
const { getTopics } = require("./controllers/controllers");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

// app.post("ABC", ABC);

// app.patch("ABC", ABC);

// app.delete("ABC", ABC);

app.use((req, res, next) => {
  res.status(404).send({ msg: "path not found!" });
});

module.exports = app;
