import { ActivationFunction } from "./activation-function.js";
import { generateRandomArray, randomInt, sumArray } from "./util.js";

export class Neuron {
  weights: number[];
  bias: number;
  activationFunction: ActivationFunction;

  constructor(inputSize: number, activationFunction: ActivationFunction) {
    this.weights = generateRandomArray(inputSize, -1, 1);
    this.bias = randomInt(-1, 1);
    this.activationFunction = activationFunction;
  }

  activate(inputs: number[]) {
    if (inputs.length !== this.weights.length) {
      throw new Error("Input and weight vectors must have the same length.");
    }
    const weightedSum = this.weights.reduce(
      (sum, weight, index) => sum + weight * inputs[index],
      0
    );
    return {
      weightedSum,
      output: this.activationFunction.calculate(weightedSum + this.bias),
    };
  }

  backward(
    inputs: number[],
    outputGradient: number,
    weightedSum: number,
    learningRate: number
  ) {
    const gradient =
      outputGradient * this.activationFunction.derivative(weightedSum);

    inputs.forEach((input, i) => {
      this.weights[i] -= learningRate * gradient * input;
    });
    this.bias -= learningRate * gradient;
    return inputs.map((input, i) => gradient * input * this.weights[i]);
  }
}
