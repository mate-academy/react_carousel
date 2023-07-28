export function reorderIndexesByStep(
  arr: string [],
  step = 1,
  backwards = false,
) {
  if (step <= 0) {
    // eslint-disable-next-line no-console
    console.error('Step should be a positive non-zero number.');

    return arr;
  }

  const reorderedArr = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < arr.length; i++) {
    const newIndex = backwards
      ? (i - step + arr.length) % arr.length
      : (i + step) % arr.length;

    reorderedArr[newIndex] = arr[i];
  }

  return reorderedArr;
}
