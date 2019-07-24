const MethodHandleFlip = (
  name, currIndex, images, frameSize, step, infinite
) => {
  if (name === 'next' && currIndex < images.length - frameSize) {
    return ({ currIndex: currIndex + step });
  }

  if (name === 'back' && currIndex > 0) {
    return ({ currIndex: currIndex - step });
  }

  if ((currIndex >= (images.length - frameSize)) && infinite) {
    return ({ currIndex: 0 });
  }

  if ((currIndex <= 0) && infinite) {
    return ({ currIndex: images.length - frameSize });
  }

  return undefined;
};

export default MethodHandleFlip;
