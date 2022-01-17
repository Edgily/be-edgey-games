const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("Is database seeded correctly?", () => {
  describe("Categories table", () => {
    test("Returns correct format", () => {
      return db.query(`SELECT * FROM categories;`).then((res) => {
        res.rows.forEach((category) => {
          expect(category).toEqual({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
    });
  });

  describe("Users table", () => {
    test("Returns correct format", () => {
      return db.query(`SELECT * FROM users;`).then((res) => {
        res.rows.forEach((user) => {
          expect(user).toEqual({
            username: expect.any(String),
            avatar_url: expect.any(String),
            name: expect.any(String),
          });
        });
      });
    });
  });

  describe("Reviews table", () => {
    test("Returns correct format", () => {
      return db.query(`SELECT * FROM reviews;`).then((res) => {
        res.rows.forEach((review) => {
          expect(review).toEqual({
            review_id: expect.any(Number),
            title: expect.any(String),
            owner: expect.any(String),
            category: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            review_body: expect.any(String),
            votes: expect.any(Number),
            created_at: expect.any(Object),
          });
        });
      });
    });
  });

  describe("Comments table", () => {
    test("Returns correct format", () => {
      return db.query(`SELECT * FROM comments;`).then((res) => {
        res.rows.forEach((comment) => {
          expect(comment).toEqual({
            comment_id: expect.any(Number),
            review_id: expect.any(Number),
            author: expect.any(String),
            body: expect.any(String),
            votes: expect.any(Number),
            created_at: expect.any(Object),
          });
        });
      });
    });
  });
});

describe("/api", () => {
  describe("GET", () => {
    test("returns a list of all endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((res) => {
          console.log(res.rows);
        });
    });
  });
});

describe("/api/categories", () => {
  describe("GET", () => {
    test("returns an object with key of 'categories' whose property is an array of category objects with slug and description properties", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((res) => {
          expect(typeof res.body).toBe("object");
          expect(res.body.categories.length).toBe(4);
          res.body.categories.forEach((category) => {
            expect(category).toEqual({
              slug: expect.any(String),
              description: expect.any(String),
            });
          });
        });
    });
  });
});

describe.skip("", () => {
  describe("", () => {
    test("", () => {});
  });
});
