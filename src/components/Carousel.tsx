import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration,
}) => {
  const [translateX, setTranslateX] = useState(0);
  const totalWidth = images.length * itemWidth;
  const lastThre = totalWidth - itemWidth * step;
  const arrowPrev = '<';
  const arrowNext = '>';

  const slideNext = () => {
    setTranslateX((prevTranslateX) => {
      const newTranslateX = prevTranslateX - itemWidth * step;

      return Math.max(-lastThre, newTranslateX);
    });
  };

  const slideBack = () => {
    setTranslateX((prevTranslateX) => {
      const newTranslateX = prevTranslateX + itemWidth * step;

      return Math.min(0, newTranslateX);
    });
  };

  const isPrevDisabled = translateX === 0;
  const isNextDisabled = translateX === -lastThre;

  const prevButtonClass = cn('button', {
    disabled: isPrevDisabled,
  });

  const nextButtonClass = cn('button', {
    disabled: isNextDisabled,
  });

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul className="Carousel__list">
          {images.map((img, i) => {
            const imgAlt = (i + 1).toString();

            return (
              <li
                key={imgAlt}
                className="Carousel__item"
                style={{
                  transform: `translateX(${translateX}px)`,
                  transition: `transform ${animationDuration}ms`,
                }}
              >
                <img
                  src={img}
                  alt={imgAlt}
                  style={{ width: `${itemWidth}px` }}
                />
              </li>
            );
          })}
        </ul>
        <div className="Carousel__button-container">
          <button
            type="button"
            className={prevButtonClass}
            onClick={slideBack}
          >
            {arrowPrev}
          </button>
          <button
            type="button"
            data-cy="next"
            className={nextButtonClass}
            onClick={slideNext}
          >
            {arrowNext}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
