export function generateArray<T>(
  length: number,
  value: T | (() => T) = undefined
) {
  return Array.from({ length }, () =>
    value instanceof Function ? value() : value
  );
}

export function generateRandomArray(
  size: number,
  min: number = -1,
  max: number = 1
) {
  return Array.from({ length: size }, () => randomInt(min, max));
}

export function randomInt(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}

export function sumArray(array: number[]): number {
  return array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
}
