import React, { useEffect, useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  stepValue?: number;
  frameSizeValue?: number;
  itemWidthValue?: number;
  animationDurationValue?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  stepValue = 3,
  frameSizeValue = 3,
  itemWidthValue = 130,
  animationDurationValue = 1000,
  infinite = false,
}) => {
  const [step, setStep] = useState(stepValue);
  const [frameSize, setFrameSize] = useState(frameSizeValue);
  const [animationDuration, setAnimationDuration] = useState(
    animationDurationValue,
  );
  const [itemWidth, setItemWidth] = useState(itemWidthValue);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const maxIndex = Math.max(0, images.length - frameSize);

    setCurrentIndex(prev => Math.min(prev, maxIndex));
  }, [frameSize, images.length]);
  const offset = currentIndex * itemWidth;
  const maxIndex = Math.max(0, images.length - frameSize);

  return (
    <>
      <div className="Carousel" style={{ width: frameSize * itemWidth + 'px' }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-offset}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((img, i) => (
            <li key={i}>
              <img
                src={img}
                alt={`${i}`}
                className="Carousel__image"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="buttons">
        <button
          type="button"
          className="button is-primary"
          disabled={!infinite && currentIndex === 0}
          onClick={() => setCurrentIndex(i => Math.max(0, i - step))}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          className="button is-primary"
          disabled={!infinite && currentIndex === maxIndex}
          onClick={() => setCurrentIndex(i => Math.min(maxIndex, i + step))}
        >
          Next
        </button>
      </div>
      <div className="box Carousel__inputs">
        <div className="field">
          <label htmlFor="itemId" className="label">
            Item Width
          </label>
          <div className="control">
            <input
              id="itemId"
              className="input"
              type="number"
              value={itemWidth}
              onChange={event => setItemWidth(+event.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="frameId" className="label">
            Frame Size
          </label>
          <div className="control">
            <input
              id="frameId"
              className="input"
              type="number"
              value={frameSize}
              onChange={event => setFrameSize(+event.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="stepId" className="label">
            Step
          </label>
          <div className="control">
            <input
              id="stepId"
              className="input"
              type="number"
              value={step}
              onChange={event => setStep(+event.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="animationDuration" className="label">
            Animation Duration
          </label>
          <div className="control">
            <input
              id="animationDuration"
              className="input"
              type="number"
              value={animationDuration}
              onChange={event => setAnimationDuration(+event.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
