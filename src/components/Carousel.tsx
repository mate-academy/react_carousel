import React, { useState } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [translateValue, setTranslateValue] = useState(0);

  const maxTranslate = (images.length - frameSize) * itemWidth;

  const handleOnClickNext = () => {
    return setTranslateValue(curr =>
      Math.min(curr + step * itemWidth, maxTranslate),
    );
  };

  const handleOnClickPrev = () => {
    return setTranslateValue(curr => Math.max(curr - step * itemWidth, 0));
  };

  const listStyles = {
    maxWidth: `${frameSize * itemWidth}px`,
    overflow: 'hidden',
  };

  const elementStyles = {
    transition: `transform ${animationDuration}ms ease`,
    transform: `translateX(-${translateValue}px)`,
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={handleOnClickPrev}
        className={classNames('Carousel__buttons', {
          'Carousel__buttons--diseble': translateValue <= 0,
        })}
      >
        &lt; &lt;
      </button>

      <ul className="Carousel__list" style={listStyles}>
        {images.map((item, index) => {
          return (
            <li key={item} className="Carousel__element" style={elementStyles}>
              <img
                className="Carousel__img"
                src={item}
                alt={`${index}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          );
        })}
      </ul>

      <button
        data-cy="next"
        type="button"
        onClick={handleOnClickNext}
        className={classNames('Carousel__buttons', {
          'Carousel__buttons--diseble': translateValue >= maxTranslate,
        })}
      >
        &gt; &gt;
      </button>
    </div>
  );
};

export default Carousel;
