const {
  formatCategories,
  formatUsers,
  formatReviews,
  formatComments,
} = require("../utils/seed.utils.js");

const {
  categoryData,
  userData,
  reviewData,
  commentData,
} = require("../db/data/test-data/index.js");
const { selectCategories } = require("../utils/reviews.utils.js");

describe("formatCategories()", () => {
  test("returns a formatted array", () => {
    const result = [
      ["euro game", "Abstract games that involve little luck"],
      [
        "social deduction",
        "Players attempt to uncover each other's hidden role",
      ],
      ["dexterity", "Games involving physical skill"],
      ["children's games", "Games suitable for children"],
    ];

    expect(formatCategories(categoryData)).toEqual(result);
  });

  test("does not mutate input", () => {
    const categoryData2 = JSON.parse(JSON.stringify(categoryData));

    formatCategories(categoryData);

    expect(categoryData).toEqual(categoryData2);
  });
});

describe("formatUsers()", () => {
  test("returns a formatted array", () => {
    const result = [
      [
        "mallionaire",
        "haz",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      ],

      [
        "philippaclaire9",
        "philippa",
        "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      ],

      [
        "bainesface",
        "sarah",
        "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
      ],

      [
        "dav3rid",
        "dave",
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      ],
    ];
    expect(formatUsers(userData)).toEqual(result);
  });

  test("does not mutate", () => {
    const userData2 = JSON.parse(JSON.stringify(userData));

    formatUsers(userData);

    expect(userData).toEqual(userData2);
  });
});

describe("formatReviews", () => {
  test("returns a formatted array", () => {
    const formattedReviews = formatReviews(reviewData);

    const result1 = [
      "Jenga",
      "philippaclaire9",
      "dexterity",
      "Leslie Scott",
      "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      "Fiddly fun for all the family",
      5,
      expect.any(Object),
    ];

    const result12 = [
      "Settlers of Catan: Don't Settle For Less",
      "mallionaire",
      "social deduction",
      "Klaus Teuber",
      "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
      "You have stumbled across an uncharted island rich in natural resources, but you are not alone; other adventurers have come ashore too, and the race to settle the island of Catan has begun! Whether you exert military force, build a road to rival the Great Wall, trade goods with ships from the outside world, or some combination of all three, the aim is the same: to dominate the island. Will you prevail? Proceed strategically, trade wisely, and may the odds be in favour.",
      16,
      expect.any(Object),
    ];

    expect(formattedReviews[1]).toEqual(result1);

    expect(formattedReviews[12]).toEqual(result12);
  });

  test("does not mutate", () => {
    const result = {
      title: "Agricola",
      designer: "Uwe Rosenberg",
      owner: "mallionaire",
      review_img_url:
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      review_body: "Farmyard fun!",
      category: "euro game",
      created_at: new Date(1610964020514),
      votes: 1,
    };

    const result2 = {
      title: "Scythe; you're gonna need a bigger table!",
      designer: "Jamey Stegmaier",
      owner: "mallionaire",
      review_img_url:
        "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
      review_body:
        "Spend 30 minutes just setting up all of the boards (!) meeple and decks, just to forget how to play. Scythe can be a lengthy game but really packs a punch if you put the time in. With beautiful artwork, countless scenarios and clever game mechanics, this board game is a must for any board game fanatic; just make sure you explain ALL the rules before you start playing with first timers or you may find they bring it up again and again.",
      category: "social deduction",
      created_at: new Date(1611311824839),
      votes: 100,
    };

    formatUsers(reviewData);
    expect(reviewData[0]).toEqual(expect.objectContaining(result));
    expect(reviewData[11]).toEqual(expect.objectContaining(result2));
  });
});

describe("formatComments()", () => {
  test("returns a formatted array", () => {
    const formattedComments = formatComments(commentData);

    const result2 = [
      3,
      "philippaclaire9",
      "I didn't know dogs could play games",
      10,
      new Date(1610964588110),
    ];

    const result4 = [
      2,
      "mallionaire",
      "Now this is a story all about how, board games turned my life upside down",
      13,
      new Date(1610965445410),
    ];

    expect(formattedComments[2]).toEqual(result2);

    expect(formattedComments[4]).toEqual(result4);
  });

  test("does not mutate", () => {
    const result2 = {
      body: "I didn't know dogs could play games",
      votes: 10,
      author: "philippaclaire9",
      review_id: 3,
      created_at: new Date(1610964588110),
    };

    const result4 = {
      body: "Now this is a story all about how, board games turned my life upside down",
      votes: 13,
      author: "mallionaire",
      review_id: 2,
      created_at: new Date(1610965445410),
    };

    formatUsers(commentData);
    expect(commentData[2]).toEqual(expect.objectContaining(result2));
    expect(commentData[4]).toEqual(expect.objectContaining(result4));
  });
});

describe("selectCategories()", () => {
  it("Returns an array of category values with no duplicates", () => {
    expect(selectCategories()).toEqual([
      "euro game",
      "dexterity",
      "social deduction",
    ]);
  });
});
