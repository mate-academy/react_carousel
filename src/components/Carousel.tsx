import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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
  const getNext = () => {
    let moveon: number = position + itemWidth * step;

    if (position + step * itemWidth >= images.length * itemWidth - itemWidth) {
      moveon = images.length * itemWidth - frameSize * itemWidth;
    }

    if (position + frameSize * itemWidth >= images.length * itemWidth
       - itemWidth) {
      moveon = position + itemWidth;
    }

    if (position + frameSize * itemWidth >= images.length * itemWidth) {
      moveon = position;
    }

    if (infinite) {
      moveon = itemWidth * images.length - step * itemWidth;
      if (position === moveon) {
        moveon = 0;
      }
    }

    setPosition(() => moveon);
  };

  const getPrev = () => {
    let moveon: number = position - itemWidth * step;

    if (position - itemWidth * step < 0) {
      moveon = 0;
    }

    if (infinite) {
      moveon = 0;
      if (position === 0) {
        moveon = itemWidth * images.length - step * itemWidth;
      }
    }

    setPosition(() => moveon);
  };

  return (
    <>
      <div className="Carousel" style={{ width: itemWidth * frameSize }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-position}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map(item => (
            <li key={item}>
              <img
                src={`${item}`}
                alt={item}
                style={{ width: itemWidth }}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__boxbuttons">
          <button
            className="Carousel__button"
            type="button"
            onClick={getPrev}
          >
            Prev
          </button>
          <button
            className="Carousel__button"
            type="button"
            onClick={getNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
