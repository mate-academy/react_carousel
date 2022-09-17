import React from 'react';
import './Carousel.scss';

type Image = string;
// eslint-disable-next-line @typescript-eslint/ban-types
type HandleFunction = Function;

interface Props {
  images: Image[]
  itemWidth: string;
  frameSize: string;
  // step: string;
  animationDuration: string;
  // infinite: boolean;
  position: string;
  onNext: HandleFunction;
  onPrev: HandleFunction;
}

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  // step,
  animationDuration,
  // infinite,
  position,
  onNext,
  onPrev,
}) => {
  return (
    <div
      className="Carousel"
      style={{ width: +itemWidth * +frameSize }}
    >
      <ul
        className="Carousel__list"
        style={{
          width: +itemWidth * images.length,
          translate: `${position}px`,
          transitionDuration: `${animationDuration}ms`,
        }}
      >
        {images.map(((img, i) => (
          <li className="Carousel__item" key={img}>
            <img
              src={img}
              alt={String(i + 1)}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        )))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="button is-primary mr-5"
          disabled={position === '0'}
          onClick={() => onPrev()}
        >
          Prev
        </button>

        <button
          type="button"
          className="button is-primary mr-5"
          disabled={position === String(+itemWidth * images.length)}
          onClick={() => onNext()}
        >
          Next
        </button>
      </div>
    </div>
  );
};
