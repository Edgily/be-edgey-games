const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("Seed database", () => {
  describe("Categories table", () => {
    it("Returns correct format", () => {
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
    it("Returns correct format", () => {
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
    it("Returns correct format", () => {
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
    it("Returns correct format", () => {
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

describe("*", () => {
  describe("ALL", () => {
    it("Returns an error message if invalid endpoint is used", () => {
      return request(app)
        .get("/whatsits")
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual({
            message:
              "Invalid endpoint. Try '/api' to see a list of all endpoints.",
          });
        });
    });

    it("Returns an error message if invalid endpoint is used", () => {
      return request(app)
        .get("/api/whatsits")
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual({
            message:
              "Invalid endpoint. Try '/api' to see a list of all endpoints.",
          });
        });
    });
  });
});

describe("/api", () => {
  describe("GET", () => {
    it("Returns a list of all endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((res) => {
          expect(typeof res.body).toBe("object");
        });
    });
  });
});

describe("/api/categories", () => {
  describe("GET", () => {
    it("Returns an object with key of 'categories' whose property is an array of category objects with slug and description properties", () => {
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
          expect(res.body.categories[1]).toEqual({
            slug: "social deduction",
            description: "Players attempt to uncover each other's hidden role",
          });
        });
    });
  });
});

describe("/api/reviews/:review_id", () => {
  describe("GET", () => {
    it("Returns a review object with correct keys", () => {
      return request(app)
        .get("/api/reviews/2")
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            review: {
              review_id: 2,
              title: "Jenga",
              owner: "philippaclaire9",
              category: "dexterity",
              designer: "Leslie Scott",
              review_img_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
              review_body: "Fiddly fun for all the family",
              votes: 5,
              created_at: "2021-01-18T10:01:41.251Z",
              comment_count: "3",
            },
          });
        });
    });
    it("Returns an error if given an ID with no entries", () => {
      return request(app)
        .get("/api/reviews/1")
        .expect(404)
        .then((res) => {});
    });
  });
});

// describe("", () => {
//   describe("", () => {
//     test("", () => {});
//   });
// });
