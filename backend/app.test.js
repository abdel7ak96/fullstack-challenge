var request = require("supertest");
var app = require("./app");

describe("Test the root path", () => {
  test("It should respond to the GET method", () => {
    return request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("The content type should an HTML text", () => {
    return request(app)
      .get("/")
      .then((response) => {
        expect(response.type).toBe("text/html");
      });
  });
});

describe("Test select_top_by_playtime endpoint #1", () => {
  test("It should respond to the GET method", () => {
    return request(app)
      .get("/select_top_by_playtime")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("The content type of the response should be JSON", () => {
    return request(app)
      .get("/select_top_by_playtime")
      .then((response) => {
        expect(response.type).toBe("application/json");
      });
  });
});

describe("Test select_top_by_playters endpoint #2", () => {
  test("It should respond to the GET method", () => {
    return request(app)
      .get("/select_top_by_players")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("The content type of the response should be JSON", () => {
    return request(app)
      .get("/select_top_by_players")
      .then((response) => {
        expect(response.type).toBe("application/json");
      });
  });
});
