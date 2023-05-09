import { expect, test, describe } from "vitest";
import { generateArray, generateRandomArray, randomInt } from "./util.js";

describe("generateArray", () => {
  test("it creates an array with correct length", async () => {
    const length = 5;
    const array = generateArray(length);
    expect(array.length).toBe(length);
  });

  test("it fills an array with the specified value", async () => {
    const length = 5;
    const value = "test";
    const array = generateArray(length, value);
    expect(array.every((item) => item === value)).toBeTruthy();
  });

  test("generateArray fills an array with values returned by the provided function", async () => {
    const length = 5;
    const valueFn = () => Math.random();
    const array = generateArray(length, valueFn);
    expect(array.every((item) => typeof item === "number")).toBeTruthy();
  });

  test("generateArray generates an array of the specified generic type", async () => {
    const length = 3;
    const value = { a: 1, b: 2 };
    const array = generateArray(length, value);
    expect(
      array.every(
        (item) => typeof item === "object" && "a" in item && "b" in item
      )
    ).toBeTruthy();
  });

  test("generateArray generates an empty array when length is 0", () => {
    const length = 0;
    const array = generateArray(length);
    expect(array.length).toBe(0);
  });
});

describe("generateRandomArray", () => {
  test("generateRandomArray creates an array with correct size", () => {
    const size = 5;
    const array = generateRandomArray(size);
    expect(array.length).toBe(size);
  });

  test("generateRandomArray generates an array with random integers within the specified range", () => {
    const size = 10;
    const min = -5;
    const max = 5;
    const array = generateRandomArray(size, min, max);

    array.forEach((value) => {
      expect(value).toBeGreaterThanOrEqual(min);
      expect(value).toBeLessThanOrEqual(max);
      expect(Number.isInteger(value)).toBeTruthy();
    });
  });

  test("generateRandomArray generates an array with default range if not provided", () => {
    const size = 5;
    const array = generateRandomArray(size);

    array.forEach((value) => {
      expect(value).toBeGreaterThanOrEqual(-1);
      expect(value).toBeLessThanOrEqual(1);
      expect(Number.isInteger(value)).toBeTruthy();
    });
  });

  test("generateRandomArray generates an empty array if size is 0", () => {
    const size = 0;
    const array = generateRandomArray(size);
    expect(array.length).toBe(0);
  });
});

describe("randomInt", () => {
  test("randomInt generates a number within the specified range", () => {
    const min = 5;
    const max = 10;
    const iterations = 100;

    for (let i = 0; i < iterations; i++) {
      const randomNumber = randomInt(min, max);
      expect(randomNumber).toBeGreaterThanOrEqual(min);
      expect(randomNumber).toBeLessThanOrEqual(max);
    }
  });

  test("randomInt generates the same number if min and max are equal", () => {
    const value = 42;
    const randomNumber = randomInt(value, value);
    expect(randomNumber).toBe(value);
  });

  test("randomInt generates an integer", () => {
    const min = 1;
    const max = 100;
    const randomNumber = randomInt(min, max);
    expect(Number.isInteger(randomNumber)).toBeTruthy();
  });
});
