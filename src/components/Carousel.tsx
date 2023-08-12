import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const gap = 20;
  const totalGapValue = gap * (frameSize - 1);
  const visibleImagesWidth = itemWidth * frameSize + totalGapValue;

  const [translateValue, setTranslateValue] = useState(0);

  const newTranslateValue = step * (itemWidth + gap);

  const allImagesWidth = (10 * itemWidth) + (9 * gap);
  const extremeTranslatePoint = allImagesWidth - visibleImagesWidth;

  const handlePrev = () => {
    let value = 0;

    value = Math.min(translateValue + newTranslateValue, 0);

    setTranslateValue(value);
  };

  const handleRight = () => {
    let value = 0;

    value = Math.max(
      translateValue - newTranslateValue, (-extremeTranslatePoint),
    );
    if (infinite && -1 * value >= extremeTranslatePoint) {
      value = 0;
    }

    setTranslateValue(value);
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <button
          className={cn('button-prev', {
            'button-prev__disabled': translateValue === 0,
          })}
          type="button"
          onClick={handlePrev}
        >
          <div className="button-prev__text">&lt;</div>
        </button>
        <ul
          className="Carousel__list"
          style={{
            width: `${visibleImagesWidth}px`,
            gap: `${gap}px`,
          }}
        >
          {images.map(image => (
            <li
              className="Carousel__item"
              key={image}
              style={{
                transform: `translateX(${translateValue}px)`,
                transition: `transform ${animationDuration}ms ease`,
              }}
            >
              <img
                src={image}
                alt={`${images.indexOf(image) + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
        <button
          className={cn('button-next', {
            'button-next__disabled': translateValue === -extremeTranslatePoint,
          })}
          type="button"
          data-cy="next"
          onClick={handleRight}
        >
          <div className="button-next__text">&gt;</div>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
