import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: string | undefined,
  width: string | undefined,
  animationDuration: string | undefined,
  frameSize: string | undefined,
};

const Carousel: React.FC<Props> = (
  {
    images,
    step = '3',
    width = '130',
    animationDuration = '1000',
    frameSize = '3',
  },
) => {
  const [position, setPosition] = useState(0);

  const next = (
    stepArg: number,
    widthArg: number,
    lengthArg: number,
  ) => {
    if (Math
      .abs(position - (widthArg * 2))
      < Math.abs(widthArg * lengthArg)) {
      setPosition(position - (stepArg * widthArg));
    }
  };

  const prev = (stepArg: number, widthArg: number) => {
    if (Math.abs(position) !== 0) {
      setPosition(position + (stepArg * widthArg));
    }
  };

  return (
    <>
      <div className="Carousel" style={{ width: `${+frameSize * +width}px` }}>
        <ul
          className="Carousel__list"
          id="Carousel__list"
          style={{ transform: `translateX(${position}px)`, transitionDuration: `${animationDuration}ms` }}
        >
          {images.map(img => (
            <li key={img}>
              <img
                src={img}
                alt={img}
                style={{ width: `${+width}px`, height: `${+width}px` }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => {
          prev(+step, +width);
        }}
      >
        Prev
      </button>

      <button
        type="button"
        onClick={() => {
          next(+step, +width, images.length);
        }}
        data-cy="next"
      >
        Next
      </button>
    </>
  );
};

export default Carousel;
