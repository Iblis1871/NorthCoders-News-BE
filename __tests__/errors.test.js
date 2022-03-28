const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");

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
  test("status:400, bad request", () => {
    return request(app)
      .get("/api/articles/99l99")
      .expect(400)
      .then((res) => {
        console.log(res.body);
        expect(res.body.msg).toBe("bad request!");
      });
  });
});
