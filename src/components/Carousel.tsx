import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
}

const Carousel: React.FC<Props> = ({ images }) => {
  const [translate, setTranslate] = useState(0);
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinityMode, setInfinityMode] = useState(false);

  const maxStep = 100 - ((100 / images.length) * frameSize);
  const currentStep = (100 / images.length) * step;

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

  function isFirstImage() {
    return translate <= 0;
  }

  function isLastImage() {
    return translate >= maxStep;
  }

  function isChecked() {
    setInfinityMode(state => {
      return state === false;
    });
  }

  const imageStyle = {
    width: `${itemWidth}px`,
    height: `${itemWidth}px`,
  };

  const containterStyle = {
    width: `${frameSize * itemWidth}px`,
  };

  const listStyle = {
    transform: `translateX(-${translate}%)`,
    width: `${itemWidth * frameSize * (images.length / frameSize)}px`,
    transition: `transform ${animationDuration}ms`,
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={containterStyle}>
        <ul className="Carousel__list" style={listStyle}>
          {images.map((image, index) => (
            <li key={image}>
              <img src={image} alt={String(index + 1)} style={imageStyle} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={prevClick}
        disabled={
          (isFirstImage() && !infinityMode) || (isFirstImage() && isLastImage())
        }
      >
        Prev
      </button>
      <button
        type="button"
        onClick={nextClick}
        disabled={
          (isLastImage() && !infinityMode) || (isLastImage() && isFirstImage())
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
          onChange={value => setItemWidth(Number(value.target.value))}
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
          onChange={value => setFrameSize(Number(value.target.value))}
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
          onChange={value => setStep(Number(value.target.value))}
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
          onChange={value => setAnimationDuration(Number(value.target.value))}
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
  );
};

export default Carousel;
