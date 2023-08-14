/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import '../styles/main.scss';

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
  frameSize,
  itemWidth,
  step,
  animationDuration,
  infinite: propInfinite,
}) => {
  const [offset, setOffset] = useState(0);
  const [localInfinite, setLocalInfinite] = useState(propInfinite);
  const [dynamicItemWidth, setDynamicItemWidth] = useState<number>(itemWidth);
  const [inputValue, setInputValue] = useState<number>(itemWidth);
  const [inputAnimationDuration, setInputAnimationDuration]
    = useState<number>(animationDuration);

  const [dynamicAnimationDuration, setDynamicAnimationDuration]
    = useState<number>(animationDuration);

  const [inputStep, setInputStep] = useState<string>(step.toString());
  const [localStep, setLocalStep] = useState<number>(step);

  const [inputFrameSize, setInputFrameSize]
    = useState<string>(frameSize.toString());
  const [localFrameSize, setLocalFrameSize] = useState<number>(frameSize);

  const maxOffset = images.length - localFrameSize;

  const handlePrev = () => {
    if (offset >= localStep) {
      setOffset(prevOffset => prevOffset - localStep);
    } else if (localInfinite) {
      setOffset(maxOffset);
    } else {
      setOffset(0);
    }
  };

  const handleNext = () => {
    if (offset + localStep < maxOffset) {
      setOffset(prevOffset => prevOffset + localStep);
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

  // prideti safeguards min max values

  const updateStep = () => {
    const newStep = parseInt(inputStep, 10);

    if (!Number.isNaN(newStep) && newStep > 0 && newStep <= images.length) {
      setLocalStep(newStep);
    } else {
      alert('Please enter a valid step!');
      setInputStep(localStep.toString());
    }
  };

  // ???????????
  // type checking needed

  const updateFrameSize = () => {
    const newFrameSize = parseInt(inputFrameSize, 10);

    if (newFrameSize >= 1 && newFrameSize <= images.length) {
      setLocalFrameSize(newFrameSize);
    } else {
      alert(
        'Invalid frame size. Must be between 1 and the total number of images.',
      );
    }
  };

  useEffect(() => {
    // console.log('useEffect has been triggered!');
    const scrollWidth = offset * dynamicItemWidth;

    document.documentElement.style.setProperty('--transform-offset', `-${scrollWidth}px`);
    document.documentElement.style.setProperty('--image-size', `${dynamicItemWidth}px`);
    document.documentElement.style.setProperty('--frame-size', `${localFrameSize}`);
    document.documentElement.style.setProperty(
      '--animation-duration', `${animationDuration}ms`,
    );
    document.documentElement.style.setProperty(
      '--animation-duration', `${dynamicAnimationDuration}ms`,
    );
  }, [offset, dynamicItemWidth, localFrameSize, dynamicAnimationDuration]);

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
              className={`button button--controls ${localInfinite ? 'button--active' : ''}`}
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

            <button
              type="button"
              className="button button--controls"
              onClick={updateWidth}
            >
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
              className="button button--controls"
              onClick={updateAnimationDuration}
            >
              Set Animation Duration
            </button>
          </div>

          <div className="controls__item controls__step">
            <input
              type="number"
              value={inputStep}
              onChange={(e) => setInputStep(e.target.value)}
              placeholder="Step"
              min="1"
            />

            <button
              type="button"
              className="button button--controls"
              onClick={updateStep}
            >
              Set Scroll Step
            </button>
          </div>

          <div className="controls__frameSize controls__item">
            <input
              type="number"
              title="Enter the frame size"
              value={inputFrameSize}
              onChange={(e) => setInputFrameSize(e.target.value)}
            />
            <button
              type="button"
              className="button button--controls"
              onClick={updateFrameSize}
            >
              Set Frame Size
            </button>
          </div>
        </div>
      </div>
    </>

  );
};

export default Carousel;
