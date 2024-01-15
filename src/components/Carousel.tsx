import React, { useState, useEffect } from 'react';
import './Carousel.scss';

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
  const [position, setPosition] = useState(0);
  const [imgPosition, setImgPosition] = useState(0);
  const maxPosition = images.length - frameSize;
  const boundary = (itemWidth * images.length) - (frameSize * itemWidth);

  const moveRight = () => {
    if (imgPosition !== maxPosition) {
      setImgPosition(currentImg => Math.min(currentImg + step, maxPosition));
    }
  };

  const moveLeft = () => {
    if (imgPosition !== 0) {
      setImgPosition(currentImg => Math.max(currentImg - step, 0));
    }
  };

  useEffect(() => {
    if (maxPosition < imgPosition) {
      setImgPosition(maxPosition);
    }

    setPosition(() => {
      const newPosition = itemWidth * imgPosition;

      return Math.max(-newPosition, -boundary);
    });
  }, [itemWidth, imgPosition, frameSize, boundary, maxPosition]);

  return (
    <>
      <div
        className="Carousel"
        style={{
          transition: `all ${animationDuration}ms ease`,
        }}
      >
        <div
          className="Carousel__list-wrapper"
          style={{
            width: frameSize * itemWidth,
            height: itemWidth,
            transition: `all ${animationDuration}ms ease`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              left: `${position}px`,
              transition: `left ${animationDuration}ms ease`,
            }}
          >
            {images.map(img => (
              <li
                className="Carousel__list-img"
                key={img}
                style={{ listStyle: 'none' }}
              >
                <img
                  src={img}
                  alt={img}
                  width={itemWidth}
                  style={{ transition: `width ${animationDuration}ms ease` }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="Carousel__button-wrapper">
        <button
          onClick={moveLeft}
          className="Carousel__button"
          data-cy="prev"
          type="button"
        >
          Prev
        </button>

        <button
          onClick={moveRight}
          className="Carousel__button"
          data-cy="next"
          type="button"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Carousel;
