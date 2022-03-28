const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const { patch } = require("../app");
const { send } = require("express/lib/response");

xdescribe("PATCH api/articles", () => {
  test("status:202, responds with an updated article object", async () => {
    const res = await request(app)
      .patch("/api/articles/1")
      .expect(202)
      .send({ inc_votes: 1 })
      .expect(res.body.article.votes)
      .toBe(101);
  });
});
