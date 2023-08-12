/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './Carousel.scss';
import '../styles/blocks/button.scss';
import '../styles/blocks/controls.scss';

type CarouselProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  frameSize = 3,
  itemWidth = 130,
  step = 3,
  animationDuration = 1000,
  infinite: propInfinite = false,
}) => {
  const [offset, setOffset] = useState(0);
  const [localInfinite, setLocalInfinite] = useState(propInfinite);
  const [dynamicItemWidth, setDynamicItemWidth] = useState<number>(itemWidth);
  const [inputValue, setInputValue] = useState<number>(itemWidth);
  const [inputAnimationDuration, setInputAnimationDuration]
    = useState<number>(animationDuration);

  const [dynamicAnimationDuration, setDynamicAnimationDuration]
    = useState<number>(animationDuration);

  const maxOffset = images.length - frameSize;

  const handlePrev = () => {
    if (offset >= step) {
      setOffset(prevOffset => prevOffset - step);
    } else if (localInfinite) {
      setOffset(maxOffset);
    } else {
      setOffset(0);
    }
  };

  const handleNext = () => {
    if (offset + step < maxOffset) {
      setOffset(prevOffset => prevOffset + step);
    } else if (localInfinite) {
      setOffset(0);
    } else {
      setOffset(maxOffset);
    }
  };

  const MIN_WIDTH = 100;
  const MAX_WIDTH = 350;

  const updateWidth = () => {
    if (inputValue < MIN_WIDTH || inputValue > MAX_WIDTH) {
      alert('Please enter a value between 100 and 350.');

      return;
    }

    if (inputValue > 0) {
      setDynamicItemWidth(inputValue);
    }
  };

  const updateAnimationDuration = () => {
    if (inputAnimationDuration > 0) {
      setDynamicAnimationDuration(inputAnimationDuration);
    }
  };

  useEffect(() => {
    console.log('useEffect has been triggered!');
    const scrollWidth = offset * dynamicItemWidth;

    document.documentElement.style.setProperty('--transform-offset', `-${scrollWidth}px`);
    document.documentElement.style.setProperty('--image-size', `${dynamicItemWidth}px`);
    document.documentElement.style.setProperty('--frame-size', `${frameSize}`);
    document.documentElement.style.setProperty(
      '--animation-duration', `${animationDuration}ms`,
    );
    document.documentElement.style.setProperty(
      '--animation-duration', `${dynamicAnimationDuration}ms`,
    );
  }, [offset, dynamicItemWidth, frameSize, dynamicAnimationDuration]);

  return (
    <>
      <div className="container">
        <button
          type="button"
          onClick={handlePrev}
          className={`button button--prev ${offset === 0 ? 'disabled' : ''}`}
        >
          Prev
        </button>

        <div className="Carousel">
          <ul className="Carousel__list transformed">
            {images.map((imgSrc) => (
              <li key={imgSrc}>
                <img className="Carousel__image" src={imgSrc} alt="" />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className={`button button--next ${offset >= maxOffset ? 'disabled' : ''}`}
          data-cy="next"
        >
          Next
        </button>
      </div>

      <div className="container--controls">
        <div className="controls">
          <div className="controls__infinite controls__item">
            <button
              type="button"
              className="button"
              onClick={() => setLocalInfinite(!localInfinite)}
            >
              Toggle Infinite Scroll
            </button>
          </div>

          <div className="controls__width controls__item">
            <input
              className="controls__width"
              type="number"
              title="Enter the item width"
              value={inputValue}
              min="100"
              max="350"
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10);

                if (!Number.isNaN(newValue)) {
                  setInputValue(newValue);
                }
              }}
            />

            <button type="button" className="button" onClick={updateWidth}>
              Set Width
            </button>
          </div>

          <div className="controls__item controls__animation">
            <input
              type="number"
              value={inputAnimationDuration}
              onChange={
                (e) => setInputAnimationDuration(Number(e.target.value))
              }
              placeholder="Enter duration in ms"
            />
            <button
              type="button"
              className="button"
              onClick={updateAnimationDuration}
            >
              Set Animation Duration
            </button>
          </div>
        </div>
      </div>
    </>

  );
};

export default Carousel;
