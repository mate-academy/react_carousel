const MethodHandleChange = (
  name, value, checked, frameSize, images, step, itemWidth, animationDuration
) => {
  if (name === 'plusElement' && frameSize < images.length) {
    return ({ frameSize: frameSize + 1, currIndex: 0 });
  }

  if (name === 'minusElement' && frameSize > 1) {
    return ({ frameSize: frameSize - 1, currIndex: 0 });
  }

  if (name === 'plusStep' && step < images.length) {
    return ({ step: step + 1 });
  }

  if (name === 'minusStep' && step > 1) {
    return ({ step: step - 1 });
  }

  if (name === 'itemWidth') {
    return ({ itemWidth: +value.replace(/\D/g, '') });
  }

  if (name === 'plusTenWidth') {
    return ({ itemWidth: itemWidth + 10 });
  }

  if (name === 'minusTenWidth') {
    return ({ itemWidth: itemWidth - 10 });
  }

  if (name === 'infinite') {
    return ({ [name]: checked });
  }

  if (name === 'animationDuration') {
    return ({ [name]: +value.replace(/\D/g, '') });
  }

  if (name === 'plusTenAnimate') {
    return ({ animationDuration: animationDuration + 100 });
  }

  if (name === 'minusTenAnimate') {
    return ({ animationDuration: animationDuration - 100 });
  }

  return undefined;
};

export default MethodHandleChange;
