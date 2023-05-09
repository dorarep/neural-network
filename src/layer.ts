import { ActivationFunction } from "./activation-function.js";
import { Neuron } from "./neuron.js";
import { generateArray } from "./util.js";

export class Layer {
  neurons: Neuron[];

  constructor(
    neuronCount: number,
    activationFunction: ActivationFunction,
    inputSize: number
  ) {
    this.neurons = generateArray(
      neuronCount,
      () => new Neuron(inputSize, activationFunction)
    );
  }

  /** 順伝播 */
  forward(inputs: number[]): { weightedSums: number[]; outputs: number[] } {
    const results = this.neurons.map((neuron) => neuron.activate(inputs));

    return {
      weightedSums: results.map(({ weightedSum }) => weightedSum),
      outputs: results.map(({ output }) => output),
    };
  }

  /** 逆伝播 */
  backward(
    inputs: number[],
    weightedSums: number[],
    outputGradients: number[],
    learningRate: number
  ): number[] {
    return this.neurons.reduce((carry, neuron, i) => {
      const gradients = neuron.backward(
        inputs,
        outputGradients[i],
        weightedSums[i],
        learningRate
      );
      return gradients.map((gradient, j) => gradient + (carry[j] ?? 0));
    }, []);
  }
}
