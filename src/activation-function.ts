export interface ActivationFunction {
  calculate: (x: number) => number;
  derivative: (x: number) => number;
}

export class Sigmoid implements ActivationFunction {
  calculate(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }

  derivative(x: number): number {
    const sigmoid = this.calculate(x);
    return sigmoid * (1 - sigmoid);
  }
}

export class ReLU implements ActivationFunction {
  calculate(x: number): number {
    return Math.max(0, x);
  }

  derivative(x: number): number {
    return x > 0 ? 1 : 0;
  }
}

export class Tanh implements ActivationFunction {
  calculate(x: number): number {
    return Math.tanh(x);
  }

  derivative(x: number): number {
    const tanh = Math.tanh(x);
    return 1 - tanh * tanh;
  }
}

export class LeakyReLU implements ActivationFunction {
  private alpha: number;

  constructor(alpha: number = 0.01) {
    this.alpha = alpha;
    this.calculate = this.calculate.bind(this);
    this.derivative = this.derivative.bind(this);
  }

  calculate(x: number): number {
    return x > 0 ? x : this.alpha * x;
  }

  derivative(x: number): number {
    return x > 0 ? 1 : this.alpha;
  }
}
