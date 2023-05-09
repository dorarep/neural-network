import { ActivationFunction } from "./activation-function.js";
import { Layer } from "./layer.js";
import { LossFunction } from "./loss-function.js";

export class NeuralNetwork {
  hiddenLayer: Layer;
  outputLayer: Layer;
  lossFunction: LossFunction;

  constructor(
    inputLayerSize: number,
    hiddenLayerSize: number,
    outputLayerSize: number,
    activationFunction: ActivationFunction,
    lossFunction: LossFunction
  ) {
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
    this.lossFunction = lossFunction;
  }

  forward(input: number[]): number[] {
    const hiddenLayerOutput = this.hiddenLayer.forward(input);
    const outputLayerOutput = this.outputLayer.forward(
      hiddenLayerOutput.outputs
    );
    return outputLayerOutput.outputs;
  }

  train(
    inputs: number[][],
    targets: number[][],
    learningRate: number,
    epochs: number,
    displayLoss: boolean = false
  ): void {
    for (let epoch = 0; epoch < epochs; epoch++) {
      inputs.forEach((input, i) =>
        this.trainOnce(input, targets[i], learningRate)
      );
      if (displayLoss) {
        this.displayLoss(inputs, targets, epoch);
      }
    }
  }

  private trainOnce(inputs: number[], target: number[], learningRate: number) {
    // Forward propagation
    const { weightedSums: hiddenWeightedSums, outputs: hiddenLayerOutput } =
      this.hiddenLayer.forward(inputs);
    const { weightedSums: outputWeightedSums, outputs: outputLayerOutput } =
      this.outputLayer.forward(hiddenLayerOutput);

    // Calculate output layer errors
    const outputErrors = this.lossFunction.computeGradient(
      target,
      outputLayerOutput
    );

    // Backpropagation through the output and hidden layers
    const hiddenLayerGradients = this.outputLayer.backward(
      hiddenLayerOutput,
      outputWeightedSums,
      outputErrors,
      learningRate
    );
    this.hiddenLayer.backward(
      inputs,
      hiddenWeightedSums,
      hiddenLayerGradients,
      learningRate
    );
  }

  private displayLoss(inputs: number[][], targets: number[][], epoch: number) {
    const loss =
      inputs.reduce((sum, input, inputIndex) => {
        const target = targets[inputIndex];
        const output = this.forward(input);
        return sum + this.lossFunction.computeLoss(target, output);
      }, 0) / inputs.length;

    console.log(`Epoch ${epoch + 1}, Loss: ${loss}`);
  }
}
