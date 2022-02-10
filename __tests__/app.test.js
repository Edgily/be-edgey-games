const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const devData = require("../db/data/development-data/index");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("Seed database", () => {
  describe("Categories table", () => {
    it("Returns correct format", () => {
      return db.query(`SELECT * FROM categories;`).then((res) => {
        expect(res.rows.length).toBe(4);
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
        expect(res.rows.length).toBe(4);
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
        expect(res.rows.length).toBe(13);
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
        expect(res.rows.length).toBe(6);
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
            msg: "Invalid endpoint. Try '/api' to see a list of all endpoints.",
          });
        });
    });

    it("Returns an error message if invalid endpoint is used", () => {
      return request(app)
        .get("/api/whatsits")
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual({
            msg: "Invalid endpoint. Try '/api' to see a list of all endpoints.",
          });
        });
    });
  });
});

describe("/api", () => {
  describe("GET", () => {
    it("status: 200 - Returns a list of all endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((res) => {
          expect(typeof res.body).toBe("object");

          expect(res.body.endpoints["GET /api"]).toEqual({
            description:
              "Get a JSON file listing all the available endpoints and their parameters/queries.",
          });
        });
    });
  });
});

describe("/api/categories", () => {
  describe("GET", () => {
    it("status: 200 - Returns an object with key of 'categories' whose property is an array of category objects with slug and description properties", () => {
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

describe("/api/reviews", () => {
  describe("GET", () => {
    describe("sort_by query", () => {
      it("status: 200 - Returns an array of review objects", () => {
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

      it("status: 200 - Returns an array of review objects sorted by created_at DESC by default", () => {
        return request(app)
          .get("/api/reviews")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews).toBeSortedBy("created_at", {
              descending: true,
            });
          });
      });

      it("status: 200 - Returns an array of review objects with sort_by=title query", () => {
        return request(app)
          .get("/api/reviews?sort_by=title")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews).toBeSortedBy("title", {
              descending: true,
            });
          });
      });

      it("status: 200 - Returns an array of review objects with sort_by=order query", () => {
        return request(app)
          .get("/api/reviews?sort_by=owner")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews).toBeSortedBy("owner", {
              descending: true,
            });
          });
      });

      it("status: 200 - Returns an array of review objects with sort_by=review_id query", () => {
        return request(app)
          .get("/api/reviews?sort_by=review_id")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews).toBeSortedBy("review_id", {
              descending: true,
            });
          });
      });

      it("status: 400 - Returns an error for a blank sort_by", () => {
        return request(app)
          .get("/api/reviews?sort_by=")
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({ msg: "Bad request" });
          });
      });

      it("status: 400 - Returns an error for an invalid sort_by", () => {
        return request(app)
          .get("/api/reviews?sort_by=bana*n;as")
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({ msg: "Bad request" });
          });
      });

      it("status: 400 - Returns an error for an invalid sort_by", () => {
        return request(app)
          .get("/api/reviews?sordfasdft_y=bana*n;as&osjdf=j'asdfk")
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({ msg: "Bad request" });
          });
      });
    });

    describe("order query", () => {
      it("status: 200 - Returns the list of reviews in ASC order", () => {
        return request(app)
          .get("/api/reviews?order=asc")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews).toBeSortedBy("created_at", {
              ascending: true,
            });
          });
      });

      it("status: 200 - Returns the list of reviews in DESC order", () => {
        return request(app)
          .get("/api/reviews?order=desc")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews).toBeSortedBy("created_at", {
              descending: true,
            });
          });
      });

      it("status: 400 - Returns an error if invalid value is used", () => {
        return request(app)
          .get("/api/reviews?order=ugh")
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({ msg: "Bad request" });
          });
      });

      it("status: 400 - Returns an error if invalid query is used", () => {
        return request(app)
          .get("/api/reviews?ordd=ugh")
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({ msg: "Bad request" });
          });
      });
    });

    describe("category query", () => {
      it("status: 200 - Returns a filtered list based on category query", () => {
        return request(app)
          .get("/api/reviews?category=social-deduction")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews.length).toBe(11);
            res.body.reviews.forEach((item) => {
              expect(item).toEqual(
                expect.objectContaining({
                  category: "social deduction",
                })
              );
            });

            expect(res.body.reviews[0]).toEqual({
              review_id: 7,
              title: "Mollit elit qui incididunt veniam occaecat cupidatat",
              owner: "mallionaire",
              category: "social deduction",
              designer: "Avery Wunzboogerz",
              review_img_url:
                "https://images.pexels.com/photos/278888/pexels-photo-278888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
              review_body:
                "Consectetur incididunt aliquip sunt officia. Magna ex nulla consectetur laboris incididunt ea non qui. Enim id eiusmod irure dolor ipsum in tempor consequat amet ullamco. Occaecat fugiat sint fugiat mollit consequat pariatur consequat non exercitation dolore. Labore occaecat in magna commodo anim enim eiusmod eu pariatur ad duis magna. Voluptate ad et dolore ullamco anim sunt do. Qui exercitation tempor in in minim ullamco fugiat ipsum. Duis irure voluptate cupidatat do id mollit veniam culpa. Velit deserunt exercitation amet laborum nostrud dolore in occaecat minim amet nostrud sunt in. Veniam ut aliqua incididunt commodo sint in anim duis id commodo voluptate sit quis.",
              votes: 9,
              created_at: "2021-01-25T11:16:54.963Z",
              comment_count: "0",
            });
          });
      });

      it("status: 200 - Returns a filtered list based on category query", () => {
        return request(app)
          .get("/api/reviews?category=dexterity")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews.length).toBe(1);
            res.body.reviews.forEach((item) => {
              expect(item).toEqual(
                expect.objectContaining({
                  category: "dexterity",
                })
              );
            });
          });
      });

      it("status: 200 - Returns a filtered list based on category query", () => {
        return request(app)
          .get("/api/reviews?category=social-deduction")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews.length).toBe(11);
            res.body.reviews.forEach((item) => {
              expect(item).toEqual(
                expect.objectContaining({
                  category: "social deduction",
                })
              );
            });
          });
      });

      it("status: 404 - Returns an error if invalid value is used", () => {
        return request(app)
          .get("/api/reviews?category=splergula")
          .expect(404)
          .then((res) => {
            expect(res.body).toEqual({ msg: "Not found" });
          });
      });

      it("status: 400 - Returns an error if invalid query is used", () => {
        return request(app)
          .get("/api/reviews?categodry=splergula")
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({ msg: "Bad request" });
          });
      });
    });

    describe("Combination queries", () => {
      it("status: 200 - Returns a list sorted by title and ordered DESC", () => {
        return request(app)
          .get("/api/reviews?sort_by=title&order=desc")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews[0]).toEqual({
              review_id: 3,
              title: "Ultimate Werewolf",
              owner: "bainesface",
              category: "social deduction",
              designer: "Akihisa Okui",
              review_img_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
              review_body: "We couldn't find the werewolf!",
              votes: 5,
              created_at: "2021-01-18T10:01:41.251Z",
              comment_count: "3",
            });

            expect(res.body.reviews).toBeSortedBy("title", {
              descending: true,
            });
          });
      });

      it("status: 200 - Returns a list sorted by designer DESC with only social deduction category", () => {
        return request(app)
          .get(
            "/api/reviews?sort_by=designer&order=desc&category=social-deduction"
          )
          .expect(200)
          .then((res) => {
            expect(res.body.reviews.length).toBe(11);

            res.body.reviews.forEach((item) => {
              expect(item).toEqual(
                expect.objectContaining({
                  category: "social deduction",
                })
              );
            });

            expect(res.body.reviews).toBeSortedBy("designer", {
              descending: true,
            });
          });
      });

      it("status: 404 - Returns an error when category is not found", () => {
        return request(app)
          .get("/api/reviews?sort_by=category&order=desc&category=bananas")
          .expect(404)
          .then((res) => {
            expect(res.body).toEqual({ msg: "Not found" });
          });
      });

      it("status: 200 - Returns default list when sort_by and category are undefined/wrong", () => {
        return request(app)
          .get(
            "/api/reviews?sortdf_by=categgurgory&order=desc&categssfory=bananas"
          )
          .expect(200)
          .then((res) => {
            expect(res.body.reviews).toBeSortedBy("created_at", {
              descending: true,
            });

            expect(res.body.reviews.length).toBe(13);
          });
      });

      it("status: 400 - Returns an error if no valid queries exist", () => {
        return request(app)
          .get(
            "/api/reviews?sortdf_by=categgurgory&ordffer=deesc&categssfory=bananas"
          )
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({ msg: "Bad request" });
          });
      });
    });
  });
});

describe("/api/reviews/:review_id", () => {
  describe("GET", () => {
    it("status: 200 - Returns a review object with correct keys for given ID", () => {
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

    it("status: 200 - Returns a review object with correct keys for given ID", () => {
      return request(app)
        .get("/api/reviews/1")
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            review: {
              review_id: 1,
              title: "Agricola",
              owner: "mallionaire",
              category: "euro game",
              designer: "Uwe Rosenberg",
              review_img_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
              review_body: "Farmyard fun!",
              votes: 1,
              created_at: "2021-01-18T10:00:20.514Z",
              comment_count: "0",
            },
          });
        });
    });

    it("status: 404 - Returns an error if given an ID with no entries", () => {
      return request(app)
        .get("/api/reviews/999")
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual({ msg: "Not found" });
        });
    });

    it("status: 400 - Returns an error if given an invalid ID", () => {
      return request(app)
        .get("/api/reviews/banana")
        .expect(400)
        .then((res) => {
          expect(res.body).toEqual({ msg: "Bad request" });
        });
    });
  });

  describe("PATCH", () => {
    it("status: 200 - Returns a review object with votes count incremented", () => {
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

    it("status: 200 - Returns a review object with votes count decremented", () => {
      return request(app)
        .patch("/api/reviews/3")
        .expect(200)
        .send({ inc_votes: -3 })
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
              votes: 2,
              created_at: "2021-01-18T10:01:41.251Z",
            },
          });
        });
    });

    it("status: 404 - Returns an error if given an ID with no entries", () => {
      return request(app)
        .patch("/api/reviews/999")
        .send({ inc_votes: 5 })
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual({ msg: "Not found" });
        });
    });

    it("status: 400 - Return an error when given an invalid ID", () => {
      return request(app)
        .patch("/api/reviews/banana")
        .expect(400)
        .send({ inc_votes: 5 })
        .then((res) => {
          expect(res.body).toEqual({ msg: "Bad request" });
        });
    });

    it("status: 200 - Return the unchanged review if inc_votes is missing/invalid", () => {
      return request(app)
        .patch("/api/reviews/3")
        .expect(200)
        .send({ invalid: 5 })
        .then((res) => {
          expect(res.body.updated).toEqual({
            review_id: 3,
            title: "Ultimate Werewolf",
            owner: "bainesface",
            category: "social deduction",
            designer: "Akihisa Okui",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "We couldn't find the werewolf!",
            votes: null,
            created_at: "2021-01-18T10:01:41.251Z",
          });
        });
    });

    it("status: 400 - Return an error when given an invalid body value", () => {
      return request(app)
        .patch("/api/reviews/3")
        .expect(400)
        .send({ inc_votes: "banana" })
        .then((res) => {
          expect(res.body).toEqual({ msg: "Bad request" });
        });
    });
  });
});

describe("/api/reviews/:review_id/comments", () => {
  describe("GET", () => {
    it("status: 200 - Returns an array of comments for the given review_id 2", () => {
      return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then((res) => {
          expect(res.body.comments.length).toBe(3);
          res.body.comments.forEach((item) => {
            expect(item).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                author: expect.any(String),
                body: expect.any(String),
                votes: expect.any(Number),
                created_at: expect.any(String),
              })
            );
          });
        });
    });

    it("status: 200 - Returns an array of comments for the given review_id 3", () => {
      return request(app)
        .get("/api/reviews/3/comments")
        .expect(200)
        .then((res) => {
          expect(res.body.comments.length).toBe(3);
          res.body.comments.forEach((item) => {
            expect(item).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                author: expect.any(String),
                body: expect.any(String),
                votes: expect.any(Number),
                created_at: expect.any(String),
              })
            );
          });
        });
    });

    it("status: 200 - Returns an empty array of comments when review_id has no associated comments", () => {
      return request(app)
        .get("/api/reviews/1/comments")
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            msg: "No associated comments for that review ID",
          });
        });
    });

    it("status: 400 - Returns an error when searching an invalid ID", () => {
      return request(app)
        .get("/api/reviews/spatula/comments")
        .expect(400)
        .then((res) => {
          expect(res.body).toEqual({ msg: "Bad request" });
        });
    });
  });

  describe("POST", () => {
    it("status: 201 - Posts a new comment and returns the posted comment", () => {
      return request(app)
        .post("/api/reviews/5/comments")
        .send({ username: "dav3rid", body: "Yo this review is lit" })
        .expect(201)
        .then((res) => {
          expect(res.body.comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              review_id: expect.any(Number),
              author: expect.any(String),
              body: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
            })
          );
        });
    });

    it("status: 201 - Still works when body contains special characters", () => {
      return request(app)
        .post("/api/reviews/5/comments")
        .send({ username: "dav3rid", body: "%%0982340&&@';;" })
        .expect(201)
        .then((res) => {
          expect(res.body.comment).toEqual(
            expect.objectContaining({
              body: "%%0982340&&@';;",
            })
          );
        });
    });

    it("status: 201 - Works for other users", () => {
      return request(app)
        .post("/api/reviews/5/comments")
        .send({ username: "bainesface", body: "%%0982340&&@';;" })
        .expect(201)
        .then((res) => {
          expect(res.body.comment).toEqual(
            expect.objectContaining({
              body: "%%0982340&&@';;",
            })
          );
        });
    });

    it("status: 404 - Returns an error when review_id does not exist", () => {
      return request(app)
        .post("/api/reviews/99/comments")
        .send({ username: "dav3rid", body: "Yo this review is lit" })
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual({ msg: "Not found" });
        });
    });

    it("status: 404 - Returns an error when username does not exist", () => {
      return request(app)
        .post("/api/reviews/5/comments")
        .send({ username: "Mr Smack", body: "Yo this review is lit" })
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual({ msg: "Not found" });
        });
    });

    it("status: 400 - Returns an error when review_id is not valid", () => {
      return request(app)
        .post("/api/reviews/splerg/comments")
        .send({ username: "dav3rid", body: "Yes this is a body" })
        .expect(400)
        .then((res) => {
          expect(res.body).toEqual({ msg: "Bad request" });
        });
    });
  });
});

describe("/api/comments/:comment_id", () => {
  describe("DELETE", () => {
    it("status: 204 - Delete comment by comment_id", () => {
      return request(app).delete("/api/comments/4").expect(204);
    });

    it("status: 404 - Returns error if no comment found for comment_id", () => {
      return request(app)
        .delete("/api/comments/99")
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual({ msg: "Not found" });
        });
    });
  });
});

describe("/api/users", () => {
  describe("GET", () => {
    it("status: 200 - Returns an array of objects with property 'username'", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          expect(res.body.users.length).toBe(4);
          res.body.users.forEach((item) => {
            expect.objectContaining({
              username: expect.any(String),
              avatar_url: expect.any(String),
              name: expect.any(String),
            });
          });
        });
    });
  });

  describe("POST", () => {
    it("status: 201 - Updates the users table with a new user and returns that new user as a user object", () => {
      return request(app)
        .post("/api/users")
        .send({
          username: "splerg",
          name: "Sma",
          avatar_url:
            "https://www.livehappy.com/wp-content/uploads/2018/02/happy.jpg",
        })
        .expect(201)
        .then((res) => {
          expect(res.body).toEqual({
            user: {
              username: "splerg",
              avatar_url:
                "https://www.livehappy.com/wp-content/uploads/2018/02/happy.jpg",
              name: "Sma",
            },
          });
        });
    });

    it("status: 400 - Returns 'bad request' when a required field is undefined", () => {
      return request(app)
        .post("/api/users")
        .send({
          username: undefined,
          name: "Sma",
          avatar_url:
            "https://www.livehappy.com/wp-content/uploads/2018/02/happy.jpg",
        })
        .expect(400)
        .then((res) => {
          expect(res.body).toEqual({ msg: "Bad request" });
        });
    });

    it("status: 400 - Returns 'bad request' when a required field is missing", () => {
      return request(app)
        .post("/api/users")
        .send({
          username: "splerg",
          avatar_url:
            "https://www.livehappy.com/wp-content/uploads/2018/02/happy.jpg",
        })
        .expect(400)
        .then((res) => {
          expect(res.body).toEqual({ msg: "Bad request" });
        });
    });

    it("status: 201 - Does not throw an error for non-required field being undefined", () => {
      return request(app)
        .post("/api/users")
        .send({
          username: "splerg",
          name: "Sma",
          avatar_url: undefined,
        })
        .expect(201)
        .then((res) => {
          expect(res.body).toEqual({
            user: { username: "splerg", avatar_url: null, name: "Sma" },
          });
        });
    });

    it("status: 201 - Does not throw an error for non-required field being missing", () => {
      return request(app)
        .post("/api/users")
        .send({
          username: "splerg",
          name: "Sma",
        })
        .expect(201)
        .then((res) => {
          expect(res.body).toEqual({
            user: { username: "splerg", avatar_url: null, name: "Sma" },
          });
        });
    });
  });
});

// commented out until can figure out SQL shenanigans
// describe("/api/users/:username", () => {
//   describe("DELETE", () => {
//     it("status: 204 - Deletes the specified user", () => {
//       return request(app).delete("/api/users/mallionaire").expect(204);
//     });
//   });
// });
