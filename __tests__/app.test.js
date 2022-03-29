const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");

afterAll(() => {
  db.end();
});
beforeEach(() => seed(testData));

describe("GET api/topics", () => {
  test("status:200, responds with an array of topics", async () => {
    const res = await request(app).get("/api/topics").expect(200);
    expect(res.body.topics).toBeInstanceOf(Array);
  });
});
describe("GET api/articles", () => {
  test("status:200, responds with an article based on article ID", async () => {
    const res = await request(app).get("/api/articles/1").expect(200);
    expect(res.body.articles).toBeInstanceOf(Object);
    expect(res.body.articles.title).toBe("Living in the shadow of a great man");
    expect(res.body.articles.topic).toBe("mitch");
    expect(res.body.articles.created_at).toBe("2020-07-09T20:11:00.000Z");
    expect(res.body.articles.body).toBe("I find this existence challenging");
    expect(res.body.articles.votes).toBe(100);
  });
  test("status:200, responds with an article based on article ID + properties from joined table", async () => {
    const res = await request(app).get("/api/articles/1").expect(200);
    expect(res.body.articles).toBeInstanceOf(Object);
    expect(res.body.articles.author).toBe("butter_bridge");
  });
});
describe("PATCH api/articles", () => {
  test("status:202, responds with an updated article object INCREASE VOTE", async () => {
    return request(app)
      .patch("/api/articles/1")
      .expect(202)
      .send({ inc_votes: 1 })
      .then((res) => {
        expect(res.body.article).toEqual({
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 101,
          article_id: 1,
        });
      });
  });
  test("status:202, responds with an updated article object DECREASE VOTE", async () => {
    return request(app)
      .patch("/api/articles/1")
      .expect(202)
      .send({ inc_votes: -100 })
      .then((res) => {
        expect(res.body.article).toEqual({
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 0,
          article_id: 1,
        });
      });
  });
});
