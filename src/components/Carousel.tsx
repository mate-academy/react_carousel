import React, { useCallback, useEffect, useState } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [transformValue, setTransformValue] = useState(0);

  const isAbleToMove = useCallback(
    (direction: 'left' | 'right'): boolean => {
      switch (direction) {
        case 'left':
          return transformValue < 0;
        case 'right':
          return (transformValue - frameSize) * -1 < images.length;
        default:
          return false;
      }
    },
    [images.length, frameSize, transformValue],
  );

  const [isPossibleMoveRight, setIsPossibleMoveRight] = useState(
    isAbleToMove('right'),
  );
  const [isPossibleMoveLeft, setIsPossibleMoveLeft] = useState(
    isAbleToMove('left'),
  );

  useEffect(() => {
    setIsPossibleMoveRight(isAbleToMove('right'));
    setIsPossibleMoveLeft(isAbleToMove('left'));
  }, [transformValue, isAbleToMove]);

  const handleNextClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    const outFrameSize = images.length - frameSize;

    const stepToMove =
      outFrameSize + transformValue >= step
        ? step
        : outFrameSize + transformValue;

    if (isPossibleMoveRight) {
      setTransformValue(transformValue - stepToMove);
    }
  };

  const handlePrevClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    const stepToMove = transformValue <= step * -1 ? step : transformValue * -1;

    if (isPossibleMoveLeft) {
      setTransformValue(transformValue + stepToMove);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: frameSize * itemWidth }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: images.length * itemWidth,
            transform: `translateX(${transformValue}0%)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => {
            return (
              <li key={index + 1}>
                <img
                  src={image}
                  width={itemWidth}
                  height={itemWidth}
                  alt={`${index + 1}`}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        className={classNames({
          'button button__prev': true,
          disabled: !isPossibleMoveLeft,
        })}
        onClick={handlePrevClick}
        type="button"
      >
        Prev
      </button>

      <button
        className={classNames({
          'button button__next': true,
          disabled: !isPossibleMoveRight,
        })}
        onClick={handleNextClick}
        type="button"
        data-cy="next"
      >
        Next
      </button>

      <div className="input_container">
        <form className="form">
          <label htmlFor="itemId">Image Size (px)</label>
          <input
            onChange={e => setItemWidth(Number(e.target.value))}
            type="number"
            id="itemId"
          />
          <label htmlFor="frameId">Numbers of Visible Images</label>
          <input
            onChange={e => setFrameSize(Number(e.target.value))}
            type="number"
            id="frameId"
          />
          <label htmlFor="stepId">Scroll Step</label>
          <input
            onChange={e => setStep(Number(e.target.value))}
            type="number"
            id="stepId"
          />
          <label htmlFor="animation">Animation Duration (ms)</label>
          <input
            onChange={e => setAnimationDuration(Number(e.target.value))}
            type="number"
            id="animation"
          />
        </form>
      </div>
    </div>
  );
};

export default Carousel;
