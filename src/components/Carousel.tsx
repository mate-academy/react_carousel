import React, { useState } from 'react';
import classNames from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [position, setPosition] = useState(0);

  const totalImages = images.length;
  const maxPosition = totalImages - frameSize;
  const canHandlePrev = position !== 0;
  const canHandleNext = infinite || position !== maxPosition;

  const handlePrev = () => {
    if (canHandlePrev) {
      setPosition(prevPosition => Math.max(prevPosition - step, 0));
    }
  };

  const handleNext = () => {
    if (canHandleNext) {
      setPosition(prevPosition => {
        if (infinite && prevPosition + 1 > maxPosition) {
          return 0;
        }

        return Math.min(prevPosition + step, maxPosition);
      });
    }
  };

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${-position * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
          width: `${frameSize * itemWidth}px`,
        }}
      >
        {images.map(image => (
          <li key={image} style={{ flex: `0 0 ${itemWidth}px` }}>
            <img src={image} alt={image} width={itemWidth} />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className={classNames({
            Carousel__button: true,
            'Carousel__button--disabled': !canHandlePrev,
          })}
          onClick={handlePrev}
        >
          ←
        </button>
        <button
          data-cy="next"
          type="button"
          className={classNames({
            Carousel__button: true,
            'Carousel__button--disabled': !canHandleNext,
          })}
          onClick={handleNext}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Carousel;
