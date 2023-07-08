import React from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [shift, setShift] = React.useState(0);

  const maxShift = -(images.length - frameSize);

  const slideRight = () => {
    const shiftLeft = shift - step;

    return shift > maxShift
      && setShift(shiftLeft < maxShift ? maxShift : shiftLeft);
  };

  const slideLeft = () => shift < 0
    && setShift((shift + step) < 0 ? shift + step : 0);

  const transform = () => (shift < maxShift ? maxShift : shift) * itemWidth;

  return (
    <>
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
          transition: `width ${animationDuration}ms`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${images.length * itemWidth}px`,
            transform: `translateX(${transform()}px)`,
            transition: `transform ${animationDuration}ms, width ${animationDuration}ms`,
          }}
        >
          {images.map((item, i) => (
            <li key={item}>
              <img
                src={item}
                className="Carousel__image"
                alt={`${i}`}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                  transition: `width ${animationDuration}ms, height ${animationDuration}ms`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          className={cn(
            'Carousel__button',
            {
              'Carousel__button--disabled':
                shift >= 0 || frameSize === images.length,
            },
          )}
          onClick={slideLeft}
        >
          &#8678;
        </button>
        <button
          type="button"
          className={cn(
            'Carousel__button',
            {
              'Carousel__button--disabled':
                shift <= maxShift || frameSize === images.length,
            },
          )}
          data-cy="next"
          onClick={slideRight}
        >
          &#8680;
        </button>
      </div>
    </>
  );
};

export default Carousel;
