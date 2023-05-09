import { expect, test, describe } from "vitest";
import { Sigmoid } from "./activation-function.js";

describe("Sigmoid", () => {
  const sigmoid = new Sigmoid();
  const epsilon = 1e-6;

  test("calculate", () => {
    expect(sigmoid.calculate(0)).toBeCloseTo(0.5, epsilon);
    expect(sigmoid.calculate(-10)).toBeCloseTo(4.53978687024344e-5, epsilon);
    expect(sigmoid.calculate(10)).toBeCloseTo(0.9999546021312976, epsilon);
  });

  test("derivative", () => {
    expect(sigmoid.derivative(0)).toBeCloseTo(0.25, epsilon);
    expect(sigmoid.derivative(-10)).toBeCloseTo(4.5395807735907655e-5, epsilon);
    expect(sigmoid.derivative(10)).toBeCloseTo(4.5395807735907655e-5, epsilon);
  });
});
