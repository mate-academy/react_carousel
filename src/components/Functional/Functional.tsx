import React, { useState } from 'react';
import Carousel from '../Carousel/Carousel';

interface Props {
  images: string[];
}

export const Functional: React.FC<Props> = ({ images }) => {
  const [translate, setTranslate] = useState(0);
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinityMode, setInfinityMode] = useState(false);

  const maxStep = 100 - ((100 / images.length) * frameSize);
  const currentStep = (100 / images.length) * step;

  const isFirstImage = translate <= 0;
  const isLastImage = translate >= maxStep;

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
    setInfinityMode(state => {
      return state === false;
    });
  }

  return (
    <>
      <Carousel
        images={images}
        // step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        // infinite={infinityMode}
        translate={translate}
      />

      <div>
        <button
          type="button"
          onClick={prevClick}
          disabled={
            (isFirstImage && !infinityMode) || (isFirstImage && isLastImage)
          }
        >
          Prev
        </button>
        <button
          type="button"
          onClick={nextClick}
          disabled={
            (isLastImage && !infinityMode) || (isLastImage && isFirstImage)
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
            value={itemWidth}
            onChange={event => setItemWidth(Number(event.target.value))}
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
            value={frameSize}
            min={1}
            max={images.length}
            onChange={event => setFrameSize(Number(event.target.value))}
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
            value={step}
            min={1}
            max={images.length}
            onChange={event => setStep(Number(event.target.value))}
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
            value={animationDuration}
            min={0}
            onChange={event => setAnimationDuration(Number(event.target.value))}
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
