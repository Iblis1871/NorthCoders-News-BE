const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");

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
