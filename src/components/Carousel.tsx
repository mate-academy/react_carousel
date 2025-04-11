import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  step: number;
};

const gap = 20;

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  itemWidth,
  animationDuration,
  step,
}) => {
  const [myStep, setMyStep] = useState(0);
  const [userItemWidth, setUserItemWidth] = useState(itemWidth);
  const [userFrameSize, setUserFrameSize] = useState(frameSize);
  const [userAnimationDur, setUserAnimationsDur] = useState(animationDuration);
  const [userStep, setUserStep] = useState(step);
  const [isInfinite, setIsInfinite] = useState(false);

  const handleNext = () =>
    setMyStep(prev => {
      const shouldMove = images.length - myStep - userFrameSize;

      if (prev + userStep === images.length) {
        return 0;
      }

      if (shouldMove < userStep) {
        return prev + shouldMove;
      }

      return prev + userStep;
    });
  const handlePrev = () =>
    setMyStep(prev => {
      if (prev === 0) {
        return images.length - userStep;
      }

      if (prev < userStep) {
        return prev - prev;
      }

      return prev - userStep;
    });

  return (
    <div className="Carousel">
      <div className="Carousel__wrapper">
        <button
          className="Carousel__button"
          type="button"
          onClick={handlePrev}
          disabled={myStep === 0 && !isInfinite}
        >
          &lt;
        </button>
        <ul
          className="Carousel__list"
          style={{
            width: `${userFrameSize * userItemWidth + gap * (userFrameSize - 1)}px`,
            gap: `${gap}px`,
          }}
        >
          {images.map((img, i) => (
            <li key={img}>
              <img
                src={img}
                alt={i.toString()}
                style={{
                  width: `${userItemWidth}px`,
                  transform: `translateX(-${myStep * userItemWidth + gap * myStep}px)`,
                  transition: `transform ${userAnimationDur}ms`,
                }}
              />
            </li>
          ))}
        </ul>
        <button
          onClick={handleNext}
          className="Carousel__button"
          type="button"
          disabled={myStep + userFrameSize >= images.length && !isInfinite}
        >
          &gt;
        </button>
      </div>
      <div className="Carousel__inputs">
        <div className="Carousel__input">
          <input
            type="number"
            value={userItemWidth}
            max={200}
            min={130}
            onChange={e => setUserItemWidth(+e.target.value)}
            id="item-width"
          />
          <label htmlFor="item-width">Item-Width</label>
        </div>
        <div className="Carousel__input">
          <input
            type="number"
            value={userFrameSize}
            max={10}
            min={1}
            onChange={e => setUserFrameSize(+e.target.value)}
            id="frame-size"
          />
          <label htmlFor="frame-size">Frame-Size</label>
        </div>
        <div className="Carousel__input">
          <input
            type="number"
            value={userStep}
            min={1}
            max={10}
            onChange={e => setUserStep(+e.target.value)}
            id="step"
          />
          <label htmlFor="step">User-Step</label>
        </div>
        <div className="Carousel__input">
          <input
            type="number"
            value={userAnimationDur}
            min={1000}
            max={2000}
            step={100}
            onChange={e => setUserAnimationsDur(+e.target.value)}
            id="animation"
          />
          <label htmlFor="animation">Animation-Duration</label>
        </div>
        <div className="Carousel__input">
          <input
            type="checkbox"
            id="infinite"
            checked={isInfinite}
            onClick={() => setIsInfinite(!isInfinite)}
            className="Carousel__checkbox"
          />
          <label className="Carousel__label" htmlFor="infinite">
            Infinite
          </label>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
