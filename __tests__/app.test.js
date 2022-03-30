const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const users = require("../db/data/test-data/users");

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
  test("status:200, responds with an article and comment count", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toEqual({
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_id: 1,
          comment_count: "11",
        });
      });
  });
});
describe("GET api/articles/:article_id/comments", () => {
  test("status:200, responds the comments for a given article_id, ONE", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toEqual({
          comment_id: 2,
          body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
          article_id: 1,
          author: "butter_bridge",
          votes: 14,
          created_at: "2020-10-31T03:03:00.000Z",
        });
      });
  });
  test("status:200, responds the comments for a given article_id, TWO", () => {
    return request(app)
      .get("/api/articles/5/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toEqual({
          comment_id: 14,
          body: "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
          article_id: 5,
          author: "icellusedkars",
          votes: 16,
          created_at: "2020-06-09T05:00:00.000Z",
        });
      });
  });
});

describe("PATCH api/articles", () => {
  test("status:200, responds with an updated article object INCREASE VOTE", async () => {
    return request(app)
      .patch("/api/articles/1")
      .expect(200)
      .send({ inc_votes: 1 })
      .then((res) => {
        expect(res.body.articles).toEqual({
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
  test("status:200, responds with an updated article object DECREASE VOTE", async () => {
    return request(app)
      .patch("/api/articles/1")
      .expect(200)
      .send({ inc_votes: -100 })
      .then((res) => {
        expect(res.body.articles).toEqual({
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
describe("POST /api/articles/:article_id/comments", () => {
  test("status:200, responds with a added comment ONE", async () => {
    const path = "/api/articles/1/comments";
    const { body } = await request(app)
      .post(path)
      .send({ username: "butter_bridge", body: "posting new comment" })
      .expect(201);
    expect(body.comment).toEqual(
      expect.objectContaining({
        author: "butter_bridge",
        body: "posting new comment",
      })
    );
  });
  test("status:200, responds with a added comment NINE", async () => {
    const path = "/api/articles/9/comments";
    const { body } = await request(app)
      .post(path)
      .send({ username: "icellusedkars", body: "posting morecomment" })
      .expect(201);
    expect(body.comment).toEqual(
      expect.objectContaining({
        author: "icellusedkars",
        body: "posting morecomment",
      })
    );
  });
});
describe("GET api/users", () => {
  test("status:200, responds with an array of users with usernames", async () => {
    const res = await request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        expect(res.body.users).toBeInstanceOf(Array);
        expect(res.body.users[0].username).toBe("butter_bridge");
        expect(res.body.users).toHaveLength(4);
        expect(res.body.users[0]).toMatchObject({
          username: expect.any(String),
          name: expect.any(String),
          avatar_url: expect.any(String),
        });
      });
  });
  test("status:200, responds an array of users with usernames FOR EACH", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        response.body.users.forEach((object) => {
          expect(object).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});
////////ERRORS///////////////////////////////////////////////////////
///////////////////////////ERRORS////////////////////////////////////
////////////////////////////////////////////ERRORS///////////////////

describe("ERROR TESTING ARTICLES", () => {
  test("status:404, path not found", () => {
    return request(app)
      .get("/api/top")
      .expect(404)
      .then((res) => {
        console.log(res.body);
        expect(res.body.msg).toBe("path not found!");
      });
  });
  test("status:400, bad request", () => {
    return request(app)
      .get("/api/articles/99l99")
      .expect(400)
      .then((res) => {
        console.log(res.body);
        expect(res.body.msg).toBe("bad request!");
      });
  });
  test("status:404, responds with a path not found ID DOES NOT EXIST", () => {
    return request(app)
      .patch("/api/articles/999")
      .send({ inc_votes: 1 })
      .expect(404)
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.msg).toBe("path not found!");
      });
  });
  test("status:400, responds with an invalid invalid path", () => {
    return request(app)
      .patch("/api/articles/someNonsense")
      .send({ inc_votes: 1 })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.msg).toBe("bad request!");
      });
  });
});
describe("ERROR TESTING USERS", () => {
  test("status:404, path not found", () => {
    return request(app)
      .get("/api/use")
      .expect(404)
      .then((res) => {
        console.log(res.body);
        expect(res.body.msg).toBe("path not found!");
      });
  });
});
describe("ERROR TESTING COMMENTS", () => {
  test("status:404, path not found", () => {
    return request(app)
      .get("/api/articles/1/stnemmoc")
      .expect(404)
      .then((res) => {
        console.log(res.body);
        expect(res.body.msg).toBe("path not found!");
      });
  });
  test("status:404, should return 400 given an empty object", () => {
    return request(app)
      .post("/api/articles/9/comments")
      .send({})
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("bad request!");
      });
  });
});
