import { ActivationFunction } from "./activation-function.js";

export class Layer {
  neuronCount: number;
  activationFunction: ActivationFunction;
  weights: number[][];
  biases: number[];

  constructor(
    neuronCount: number,
    activationFunction: ActivationFunction,
    inputSize: number
  ) {
    this.neuronCount = neuronCount;
    this.activationFunction = activationFunction;

    // Initialize weights with random values
    this.weights = Array.from({ length: neuronCount }, () =>
      Array.from({ length: inputSize }, () => Math.random() * 2 - 1)
    );

    // Initialize biases with random values
    this.biases = Array.from(
      { length: neuronCount },
      () => Math.random() * 2 - 1
    );
  }

  forward(input: number[]): { weightedSums: number[]; outputs: number[] } {
    const weightedSums = this.weights.map(
      (weights, neuronIndex) =>
        weights.reduce(
          (sum, weight, inputIndex) => sum + weight * input[inputIndex],
          0
        ) + this.biases[neuronIndex]
    );
    const outputs = weightedSums.map(this.activationFunction.calculate);
    return { weightedSums, outputs };
  }

  backward(
    input: number[],
    weightedSums: number[],
    outputGradients: number[],
    learningRate: number
  ): number[] {
    const outputs = weightedSums.map(this.activationFunction.calculate);
    const inputGradients = new Array(input.length).fill(0);

    for (let neuronIndex = 0; neuronIndex < this.neuronCount; neuronIndex++) {
      const gradient =
        outputGradients[neuronIndex] *
        this.activationFunction.derivative(weightedSums[neuronIndex]);

      // Update weights and compute input gradients
      for (let inputIndex = 0; inputIndex < input.length; inputIndex++) {
        inputGradients[inputIndex] +=
          gradient * this.weights[neuronIndex][inputIndex];
        this.weights[neuronIndex][inputIndex] +=
          learningRate * gradient * input[inputIndex];
      }

      // Update biases
      this.biases[neuronIndex] += learningRate * gradient;
    }

    return inputGradients;
  }
}
