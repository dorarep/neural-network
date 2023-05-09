import { sumArray } from "./util.js";

/** 損失関数 */
export interface LossFunction {
  // 損失関数の計算
  computeLoss(yTrue: number[], yPred: number[]): number;

  // 損失関数の勾配計算
  computeGradient(yTrue: number[], yPred: number[]): number[];
}

/** 二乗和誤差 */
export class MeanSquaredError implements LossFunction {
  computeLoss(yTrue: number[], yPred: number[]): number {
    return sumArray(yPred.map((pred, i) => (pred - yTrue[i]) ** 2)) / 2;
  }

  computeGradient(yTrue: number[], yPred: number[]): number[] {
    return yPred.map((pred, i) => pred - yTrue[i]);
  }
}

/** 交差エントロピー誤差 */
export class CrossEntropyLoss implements LossFunction {
  computeLoss(yTrue: number[], yPred: number[]): number {
    const n = yTrue.length;
    let sum = 0;

    for (let i = 0; i < n; i++) {
      sum -= yTrue[i] * Math.log(yPred[i] + Number.EPSILON);
    }

    return sum / n;
  }

  computeGradient(yTrue: number[], yPred: number[]): number[] {
    const n = yTrue.length;
    const gradient = Array(n).fill(0);

    for (let i = 0; i < n; i++) {
      gradient[i] = -(yTrue[i] / (yPred[i] + Number.EPSILON));
    }

    return gradient;
  }
}
