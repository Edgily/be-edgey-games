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
        .get("/api/reviews/999")
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual({ msg: "Not found" });
        });
    });

    it("Returns an error if given an invalid ID", () => {
      return request(app)
        .get("/api/reviews/banana")
        .expect(400)
        .then((res) => {
          expect(res.body).toEqual({ msg: "Bad request" });
        });
    });
  });

  describe("PATCH", () => {
    it("Returns a review object with votes count updated", () => {
      return request(app)
        .patch("/api/reviews/2")
        .expect(200)
        .send({ inc_votes: 5 })
        .then((res) => {
          expect(res.body).toEqual({
            updated: {
              review_id: 2,
              title: "Jenga",
              owner: "philippaclaire9",
              category: "dexterity",
              designer: "Leslie Scott",
              review_img_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
              review_body: "Fiddly fun for all the family",
              votes: 10,
              created_at: "2021-01-18T10:01:41.251Z",
            },
          });
        });
    });

    it("Returns a review object with votes count updated", () => {
      return request(app)
        .patch("/api/reviews/3")
        .expect(200)
        .send({ inc_votes: 3 })
        .then((res) => {
          expect(res.body).toEqual({
            updated: {
              review_id: 3,
              title: "Ultimate Werewolf",
              owner: "bainesface",
              category: "social deduction",
              designer: "Akihisa Okui",
              review_img_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
              review_body: "We couldn't find the werewolf!",
              votes: 8,
              created_at: "2021-01-18T10:01:41.251Z",
            },
          });
        });
    });

    it("Returns an error if given an ID with no entries", () => {
      return request(app)
        .patch("/api/reviews/999")
        .send({ inc_votes: 5 })
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual({ msg: "Not found" });
        });
    });

    it("Return an error when given an invalid ID", () => {
      return request(app)
        .patch("/api/reviews/banana")
        .expect(400)
        .send({ inc_votes: 5 })
        .then((res) => {
          expect(res.body).toEqual({ msg: "Bad request" });
        });
    });
  });
});

describe("/api/reviews", () => {
  describe("GET", () => {
    describe("sort_by query", () => {
      it("Returns an array of review objects", () => {
        return request(app)
          .get("/api/reviews")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews.length).toEqual(13);
            res.body.reviews.forEach((review) => {
              expect.objectContaining({
                review: {
                  review_id: expect.any(Number),
                  title: expect.any(String),
                  owner: expect.any(String),
                  category: expect.any(String),
                  designer: expect.any(String),
                  review_img_url: expect.any(String),
                  review_body: expect.any(String),
                  votes: expect.any(Number),
                  created_at: expect.any(String),
                  comment_count: expect.any(String),
                },
              });
            });
          });
      });

      it("Returns an array of review objects sorted by created_at DESC by default", () => {
        return request(app)
          .get("/api/reviews")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews).toBeSortedBy("created_at", {
              descending: true,
            });
          });
      });

      it("Returns an array of review objects with sort_by=title query", () => {
        return request(app)
          .get("/api/reviews?sort_by=title")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews).toBeSortedBy("title", {
              descending: true,
            });
          });
      });

      it("Returns an array of review objects with sort_by=order query", () => {
        return request(app)
          .get("/api/reviews?sort_by=owner")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews).toBeSortedBy("owner", {
              descending: true,
            });
          });
      });

      it("Returns an error for a blank sort_by", () => {
        return request(app)
          .get("/api/reviews?sort_by=")
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({ msg: "Bad request" });
          });
      });

      it("Returns an error for an invalid sort_by", () => {
        return request(app)
          .get("/api/reviews?sort_by=bana*n;as")
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({ msg: "Bad request" });
          });
      });

      it("Returns an error for an invalid sort_by", () => {
        return request(app)
          .get("/api/reviews?sordfasdft_y=bana*n;as&osjdf=j'asdfk")
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({ msg: "Bad request" });
          });
      });
    });

    describe("order query", () => {
      it("Returns the list of reviews in ASC order", () => {
        return request(app)
          .get("/api/reviews?order=asc")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews).toBeSortedBy("created_at", {
              ascending: true,
            });
          });
      });

      it("Returns the list of reviews in DESC order", () => {
        return request(app)
          .get("/api/reviews?order=desc")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews).toBeSortedBy("created_at", {
              descending: true,
            });
          });
      });

      it("Returns an error if invalid value is used", () => {
        return request(app)
          .get("/api/reviews?order=ugh")
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({ msg: "Bad request" });
          });
      });

      it("Returns an error if invalid query is used", () => {
        return request(app)
          .get("/api/reviews?ordd=ugh")
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({ msg: "Bad request" });
          });
      });
    });

    describe("category query", () => {
      it("Returns a filtered list based on category query", () => {
        return request(app)
          .get("/api/reviews?category=social%deduction")
          .expect(200)
          .then((res) => {
            console.log(res.body);
          });
      });
    });
  });
});
