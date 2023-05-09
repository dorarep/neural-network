import { expect, test, describe } from "vitest";
import { NeuralNetwork } from "./neural-network";
import { LeakyReLU, ReLU, Sigmoid, Tanh } from "./activation-function.js";
import { MeanSquaredError } from "./loss-function.js";

describe("NeuralNetwork", () => {
  describe("logic gate", () => {
    const inputs = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ];
    const inputLayerSize = 2;
    const hiddenLayerSize = 2;
    const outputLayerSize = 1;
    const lossFunction = new MeanSquaredError();

    describe.each([
      ["Sigmoid", new Sigmoid(), 10000, 0.5],
      //["ReLU", new ReLU(), 500000, 0.001],
      //["Tanh", new Tanh(), 100000, 0.5],
      //["Leaky ReLU", new LeakyReLU(), 500000, 0.001],
    ])("test %s", (_, activationFunction, epochs, learningRate) => {
      test.each([
        ["AND", [0, 0, 0, 1]],
        ["OR", [0, 1, 1, 1]],
        ["XOR", [1, 0, 0, 1]],
      ])("test %s", (_, targets) => {
        const nn = new NeuralNetwork(
          inputLayerSize,
          hiddenLayerSize,
          outputLayerSize,
          activationFunction,
          lossFunction
        );
        nn.train(
          inputs,
          targets.map((v) => [v]),
          learningRate,
          epochs,
          true
        );

        const outputs = inputs
          .map((input) => nn.forward(input))
          .map(([v]) => (v > 0.5 ? 1 : 0));
        expect(outputs).toStrictEqual(targets);
      });
    });
  });
});
