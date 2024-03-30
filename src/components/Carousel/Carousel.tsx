import React from 'react';
import './Carousel.scss';

type Props = {
  prev: number;
  setPrev: (prop: number) => void;
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  prev,
  setPrev,
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const getValueForNext = (frameCount: number) => {
    if (frameCount) {
      switch (frameCount) {
        case 1:
          return 9;
        case 2:
          return 8;
        case 3:
          return 7;
        case 4:
          return 6;
        case 5:
          return 5;
      }
    }

    return 0;
  };

  const handleOnClickNext = () => {
    setPrev(prev + 1);
  };

  const handleOnClickPrev = () => {
    setPrev(prev - 1);
  };

  return (
    <div
      className="Carousel"
      style={{ width: `calc(${itemWidth}px * ${frameSize})` }}
    >
      <ul
        className="Carousel__list"
        style={{
          transition: `right ${animationDuration / 1000}s ease-in-out`,
          right: `calc(${itemWidth}px * ${prev} * ${step} - ${itemWidth}px * ${step} )`,
        }}
      >
        {images.map((image, index) => (
          <li className="Carousel__list__img" key={image}>
            <img
              src={image}
              style={{ width: `${itemWidth}px` }}
              alt={`${index}`}
            />
          </li>
        ))}
      </ul>

      <button onClick={handleOnClickPrev} type="button" disabled={prev === 1}>
        Prev
      </button>

      <button
        onClick={handleOnClickNext}
        type="button"
        disabled={prev === Math.ceil(getValueForNext(frameSize) / step + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
