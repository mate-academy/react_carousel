export const nextIndx = (
  currentIndx: number,
  length: number,
  step = 1,
): number | undefined => {
  if (currentIndx < 0
    || length < 0
    || step < 0) {
    return undefined;
  }

  return (+currentIndx + step) % length;
};

export const prevIndx = (
  currentIndx: number,
  length: number,
  step = 1,
): number | undefined => {
  if (currentIndx < 0
    || length < 0
    || step < 0) {
    return undefined;
  }

  return (+currentIndx + (length - step)) % length;
};

export function setObjField<T1>(
  obj: T1,
  objKey: keyof T1,
  newVal: any,
): T1 {
  return {
    ...obj,
    [objKey]: newVal,
  };
}
