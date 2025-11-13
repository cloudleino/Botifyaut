// mathUtils.test.js (CommonJS)
const { add, subtract, multiply, divide } = require("./mathUtils");

describe("mathUtils", () => {
  test("adds two numbers", () => {
    expect(add(3, 5)).toBe(8);
  });
  test("subtracts", () => {
    expect(subtract(10, 6)).toBe(4);
  });
  test("multiplies", () => {
    expect(multiply(4, 3)).toBe(12);
  });
  test("divides", () => {
    expect(divide(20, 4)).toBe(5);
  });
  test("division by zero throws", () => {
    expect(() => divide(10, 0)).toThrow("Division by zero is not allowed");
  });
});
