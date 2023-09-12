import React, { useState } from 'react';
import Carousel from '../Carousel/Carousel';

interface Props {
  images: string[];
}

export const Functional: React.FC<Props> = ({ images }) => {
  const [translate, setTranslate] = useState(0);
  const [infinityMode, setInfinityMode] = useState(false);

  const [inputs, setInputs] = useState({
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  });

  const maxStep = 100 - ((100 / images.length) * inputs.frameSize);
  const currentStep = (100 / images.length) * inputs.step;

  const isFirstImage = translate <= 0;
  const isLastImage = translate >= maxStep;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setInputs(newInputs => ({
      ...newInputs,
      [name]: Number(value),
    }));
  }

  function nextClick() {
    setTranslate(prevTranslate => {
      if (prevTranslate === maxStep) {
        return 0;
      }

      return prevTranslate + currentStep > maxStep
        ? maxStep
        : prevTranslate + currentStep;
    });
  }

  function prevClick() {
    setTranslate(prevTranslate => {
      if (prevTranslate === 0) {
        return maxStep;
      }

      return prevTranslate - currentStep < 0
        ? 0
        : prevTranslate - currentStep;
    });
  }

  function isChecked() {
    setInfinityMode(state => !state);
  }

  return (
    <>
      <Carousel
        images={images}
        frameSize={inputs.frameSize}
        itemWidth={inputs.itemWidth}
        animationDuration={inputs.animationDuration}
        translate={translate}
      />

      <div>
        <button
          type="button"
          onClick={prevClick}
          disabled={
            (isFirstImage && !infinityMode)
            || (isFirstImage && isLastImage)
          }
        >
          Prev
        </button>
        <button
          type="button"
          onClick={nextClick}
          disabled={
            (isLastImage && !infinityMode)
            || (isLastImage && isFirstImage)
          }
          data-cy="next"
        >
          Next
        </button>

        <div className="Carousel__params">
          <label
            htmlFor="itemId"
            className="Carousel__params--label"
          >
            Width of image in px:
          </label>

          <input
            type="number"
            id="itemId"
            value={inputs.itemWidth}
            name="itemWidth"
            onChange={handleChange}
          />

          <label
            htmlFor="frameId"
            className="Carousel__params--label"
          >
            Size of frame:
          </label>

          <input
            type="number"
            id="frameId"
            value={inputs.frameSize}
            min={1}
            max={images.length}
            name="frameSize"
            onChange={handleChange}
          />

          <label
            htmlFor="stepId"
            className="Carousel__params--label"
          >
            Step of scroll:
          </label>

          <input
            type="number"
            id="stepId"
            value={inputs.step}
            min={1}
            max={images.length}
            name="step"
            onChange={handleChange}
          />

          <label
            htmlFor="durationAnimationId"
            className="Carousel__params--label"
          >
            Duration of animation in ms:
          </label>

          <input
            type="number"
            id="durationAnimationId"
            value={inputs.animationDuration}
            min={0}
            name="animationDuration"
            onChange={handleChange}
          />

          <div className="Carousel__params--infinity">
            <label
              htmlFor="infinityId"
              className="Carousel__params--label"
            >
              Infinity mode:
            </label>

            <input
              type="checkbox"
              id="infinityId"
              checked={infinityMode}
              onClick={isChecked}
            />
          </div>
        </div>
      </div>
    </>
  );
};
