export const getShiftedArrayRight = (
  turn: boolean,
  step: number,
  images: string[],
): string[] => {
  const result = [...images];

  const normalizedStep = Math.min(Math.max(step, 0), images.length);

  if (turn && normalizedStep > 0) {
    result.push(...result.splice(0, normalizedStep));
  }

  return result;
};

export const getShiftedArrayLeft = (
  turn: boolean,
  step: number,
  images: string[],
): string[] => {
  const result = [...images];

  const normalizedStep = Math.min(Math.max(step, 0), images.length);

  if (turn && normalizedStep > 0) {
    result.unshift(...result.splice(-normalizedStep, normalizedStep));
  }

  return result;
};
