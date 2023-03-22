export function getNextFrame(
  current: number,
  count: number,
  frameSize: number,
  step: number,
  infinite: boolean,
) {
  let next = current + step;

  if (current + frameSize === count && infinite) {
    next = 0;
  }

  if (count - next < frameSize) {
    next = count - frameSize;
  }

  return next;
}

export function getPreviousFrame(
  current: number,
  count: number,
  frameSize: number,
  step: number,
  infinite: boolean,
): number {
  let previous = current - step;

  if (current === 0 && infinite) {
    previous = count - frameSize;
  }

  if (previous < 0) {
    previous = 0;
  }

  return previous;
}
