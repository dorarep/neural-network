import { expect, test } from "vitest";
import { MeanSquaredError } from "./loss-function.js";

test("MeanSquaredError", () => {
  const lossFunction = new MeanSquaredError();
  const loss = lossFunction.computeLoss([3, 3, 3, 3, 3], [2, 2, 2, 2, 2]);
  expect(loss).toBe(2.5);
});
