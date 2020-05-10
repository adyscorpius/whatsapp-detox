import log from "../src/index";

test("log", () => {
  expect(log("Hello", "World")).toBe("Hello World");
});
