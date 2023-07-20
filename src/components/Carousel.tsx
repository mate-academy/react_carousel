import React, { useState, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => setOffset(0), [itemWidth]);

  const maxOffset = images.length * itemWidth - (frameSize * itemWidth);

  const showPrevImage = () => {
    setOffset((currentOffset => (
      Math.min(currentOffset + itemWidth * step, 0)
    )));
  };

  const showNextImage = () => {
    setOffset((currentOffset => (
      Math.max(currentOffset - itemWidth * step, -maxOffset)
    )));
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{ width: `${itemWidth * frameSize}px` }}
      >

        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${offset}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image, i) => (
            <li key={image}>
              <img
                src={image}
                alt={`smile ${i + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div
        className="Carousel__buttons"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <button
          type="button"
          onClick={showPrevImage}
          disabled={offset === 0}
        >
          <i className="fa-solid fa-arrow-left" />
        </button>
        <button
          type="button"
          onClick={showNextImage}
          disabled={offset === -maxOffset}
          data-cy="next"
        >
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>

    </div>
  );
};

export default Carousel;
