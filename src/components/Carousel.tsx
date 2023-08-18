import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step: number;
  updateStep: (value: number) => void,
  frameSize: number;
  updateFrameSize: (value: number) => void,
  itemWidth: number;
  updateItemWidth: (value: number) => void,
  animationDuration: number;
  updateAnimationDuration: (value: number) => void,
  infinite: boolean,
  updateInfinite: (value: boolean) => void,
};

type CSSProperties = React.CSSProperties & {
  '--transform-offset': string;
  '--image-size': string;
  '--frame-size': string;
  '--animation-duration': string;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  frameSize,
  updateFrameSize,

  itemWidth,
  updateItemWidth,

  step,
  updateStep,
  animationDuration,
  updateAnimationDuration,

  infinite,
  updateInfinite,
}) => {
  const [offset, setOffset] = useState(0);
  const maxOffset = images.length - frameSize;

  const carouselStyles: CSSProperties = {
    '--transform-offset': `-${offset * itemWidth}px`,
    '--image-size': `${itemWidth}px`,
    '--frame-size': `${frameSize}`,
    '--animation-duration': `${animationDuration}ms`,
  };

  const handlePrev = () => {
    if (offset >= step) {
      setOffset(prevOffset => prevOffset - step);
    } else if (infinite) {
      setOffset(maxOffset);
    } else {
      setOffset(0);
    }
  };

  const handleNext = () => {
    if (offset + step < maxOffset) {
      setOffset(prevOffset => prevOffset + step);
    } else if (infinite) {
      setOffset(0);
    } else {
      setOffset(maxOffset);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);

    if (!Number.isNaN(newValue)) {
      updateItemWidth(newValue);
    }
  };

  const handleAnimationDurationChange
  = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(e.target.value, 10);

    if (!Number.isNaN(newDuration) && newDuration > 0) {
      updateAnimationDuration(newDuration);
    }
  };

  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);

    if (val < 1) {
      updateStep(1);

      return;
    }

    if (val > images.length) {
      updateStep(images.length);

      return;
    }

    updateStep(val);
  };

  const handleFrameSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);

    if (val < 1) {
      updateFrameSize(1);

      return;
    }

    if (val > images.length) {
      updateFrameSize(images.length);

      return;
    }

    updateFrameSize(val);
  };

  useEffect(() => {
    const scrollWidth = offset * (itemWidth);

    document.documentElement.style.setProperty('--transform-offset', `-${scrollWidth}px`);
    document.documentElement.style.setProperty('--image-size', `${itemWidth}px`);
    document.documentElement.style.setProperty('--frame-size', `${frameSize}`);
    document.documentElement.style.setProperty(
      '--animation-duration', `${animationDuration}ms`,
    );
  }, [offset, itemWidth, frameSize, animationDuration]);

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

        <div
          className="Carousel"
          style={carouselStyles}
        >
          <ul
            className="Carousel__list transformed"
          >
            {images.map((imgSrc, index) => (
              <li
                key={imgSrc}
                className={`Carousel__item ${index === images.length - 1 ? 'Carousel__item--last' : ''}`}
              >
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
          <div className="controls__item controls__infinite">
            <button
              type="button"
              className={`button button--controls ${infinite ? 'button--active' : ''}`}
              onClick={() => updateInfinite(!infinite)}
            >
              Toggle Infinite Scroll
            </button>
          </div>

          <div className="controls__item controls__width ">
            <input
              className="controls__width controls__input"
              type="number"
              title="Enter the item width"
              value={itemWidth}
              min="100"
              max="350"
              onChange={handleWidthChange}
            />

            <div>Set Width</div>
          </div>

          <div className="controls__item controls__animation">
            <input
              type="number"
              className="controls__input"
              value={animationDuration}
              onChange={handleAnimationDurationChange}
              placeholder="Enter duration in ms"
            />

            <div>Set Animation Duration</div>
          </div>

          <div className="controls__item controls__step">
            <input
              type="number"
              className="controls__input"
              value={step}
              onChange={handleStepChange}
              placeholder="Step"
              min="1"
              max={images.length}
            />

            <div>Set Scroll Step</div>
          </div>

          <div className="controls__item controls__frameSize">
            <input
              type="number"
              className="controls__input"
              title="Enter the frame size"
              min="1"
              max={images.length}
              value={frameSize}
              onChange={handleFrameSizeChange}
            />

            <div>Set Frame Size</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
