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
describe("GET api/", () => {
  test("status 200: responds with a JSON of all endpoints and actions", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((result) => {
        expect(result.body).toBeInstanceOf(Object);
        expect(result.body["GET /api/articles/:article_id/comments"]).toEqual({
          description:
            "serves a selection of comments from an article based on article_id",
          queries: ["article_id"],
          exampleResponse: {
            comments: [
              {
                comment_id: 1,
                votes: 16,
                created_at: 1586179020000,
                author: "butter_bridge",
                body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
              },
            ],
          },
        });
      });
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
  test("status:200, responds with an article and comment count", async () => {
    const { body } = await request(app).get("/api/articles/1").expect(200);
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
  xtest("status:200, responds with a sorted array", async () => {
    const res = await request(app)
      .get("/api/articles?sort_by=article_id")
      .expect(200);
    expect(res.body.articles).toBeSortedBy("article_id", {
      descending: true,
    });
  });
});
describe("GET api/articles/:article_id/comments", () => {
  test("status:200, responds the comments for a given article_id", async () => {
    const { body } = await request(app)
      .get("/api/articles/1/comments")
      .expect(200);
    const { comments } = body;
    comments.forEach((result) => {
      expect(result).toEqual(
        expect.objectContaining({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
        })
      );
      expect(body.comments).toBeInstanceOf(Array);
    });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("status:204 deletes a comment by id", async () => {
    const res = await request(app).delete("/api/comments/1").expect(204);
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
  test("status:200, responds with an added comment", async () => {
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

describe("ERROR TESTING ARTICLES ", () => {
  test("status:404, /api/ path not found", async () => {
    const res = await request(app).get("/api/top").expect(404);
    expect(res.body.msg).toBe("not found!");
  });
  test("status:400, /api/articles/99l99 bad request", async () => {
    const res = await request(app).get("/api/articles/99l99").expect(400);
    expect(res.body.msg).toBe("bad request!");
  });
  test("status:404, /api/articles/999 responds with a path not found ID DOES NOT EXIST", async () => {
    const res = await request(app)
      .patch("/api/articles/999")
      .send({ inc_votes: 1 })
      .expect(404);
    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe("not found!");
  });
  test("status:400, /api/articles/someNonsense responds not found as must be integer", async () => {
    const res = await request(app)
      .patch("/api/articles/someNonsense")
      .send({ inc_votes: 1 })
      .expect(400);
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe("bad request!");
  });
});
describe("ERROR TESTING COMMENTS", () => {
  test("status:400, /api/articles/9/comments should return 400 given an empty object", async () => {
    const res = await request(app)
      .post("/api/articles/9/comments")
      .send({})
      .expect(400);
    expect(res.body.msg).toBe("bad request!");
  });
  test("status:400, /api/comments/ invalid input when deleting a comment", async () => {
    const res = await request(app).delete("/api/comments/notAnId").expect(400);
    expect(res.body.msg).toBe("bad request!");
  });
  test("status:404, /api/comments/ comment_id not found", async () => {
    const res = await request(app).delete("/api/comments/99999").expect(404);
    expect(res.body.msg).toBe("not found!");
  });
});
