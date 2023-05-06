import { ActivationFunction } from "./activation-function.js";
import { Layer } from "./layer.js";

// Define the Neural Network class
export class NeuralNetwork {
  inputLayerSize: number;
  hiddenLayerSize: number;
  outputLayerSize: number;

  hiddenLayer: Layer;
  outputLayer: Layer;

  constructor(
    inputLayerSize: number,
    hiddenLayerSize: number,
    outputLayerSize: number,
    activationFunction: ActivationFunction
  ) {
    this.inputLayerSize = inputLayerSize;
    this.hiddenLayerSize = hiddenLayerSize;
    this.outputLayerSize = outputLayerSize;

    // Initialize layers with the sigmoid activation function
    this.hiddenLayer = new Layer(
      hiddenLayerSize,
      activationFunction,
      inputLayerSize
    );
    this.outputLayer = new Layer(
      outputLayerSize,
      activationFunction,
      hiddenLayerSize
    );
  }

  // Forward propagation
  forward(input: number[]): number[] {
    const hiddenLayerOutput = this.hiddenLayer.forward(input);
    const outputLayerOutput = this.outputLayer.forward(
      hiddenLayerOutput.outputs
    );
    return outputLayerOutput.outputs;
  }
  // Train the neural network using backpropagation
  train(
    inputs: number[][],
    targets: number[][],
    learningRate: number,
    epochs: number
  ): void {
    for (let epoch = 0; epoch < epochs; epoch++) {
      inputs.forEach((input, inputIndex) => {
        const target = targets[inputIndex];

        // Forward propagation
        const { weightedSums: hiddenWeightedSums, outputs: hiddenLayerOutput } =
          this.hiddenLayer.forward(input);
        const { weightedSums: outputWeightedSums, outputs: outputLayerOutput } =
          this.outputLayer.forward(hiddenLayerOutput);

        // Calculate output layer errors
        const outputErrors = outputLayerOutput.map(
          (output, index) => target[index] - output
        );

        // Backpropagation through the output and hidden layers
        const hiddenLayerGradients = this.outputLayer.backward(
          hiddenLayerOutput,
          outputWeightedSums,
          outputErrors,
          learningRate
        );
        this.hiddenLayer.backward(
          input,
          hiddenWeightedSums,
          hiddenLayerGradients,
          learningRate
        );
      });
    }
  }
}
