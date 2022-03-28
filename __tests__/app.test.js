const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");

afterAll(() => {
  db.end();
});
beforeEach(() => seed(testData));

describe("GET REQUEST TESTING", () => {
  test("status:200, responds with an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body.topics).toBeInstanceOf(Array);
      });
  });
});

describe("ERROR TESTING", () => {
  test("status:404, path not found", () => {
    return request(app)
      .get("/api/top")
      .expect(404)
      .then((res) => {
        console.log(res.body);
        expect(res.body.msg).toBe("path not found!");
      });
  });
});
