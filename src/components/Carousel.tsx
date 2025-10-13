import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  itemWidth?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  itemWidth = 130,
  infinite = false,
}) => {
  const [currIndex, setCurrIndex] = useState(0);
  const horizontalSpace = 10;
  const perItemWidth = itemWidth + horizontalSpace * 2;

  const handleClkForward = () => {
    setCurrIndex(prev => {
      let nextIndex = prev + step;
      const maxIndex = images.length - frameSize;
      let result: number;

      if (nextIndex > maxIndex) {
        if (infinite) {
          if (step % 2 !== 0) {
            nextIndex += 1;
          }

          result = nextIndex >= images.length ? 0 : maxIndex;

          return result;
        }

        return maxIndex;
      }

      return nextIndex;
    });
  };

  const handleClkBackward = () => {
    setCurrIndex(prev => (prev - step < 0 ? 0 : prev - step));
  };

  return (
    <div
      className="Carousel"
      style={{
        width: perItemWidth * frameSize,
      }}
    >
      <div className="Carousel__window">
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currIndex * perItemWidth}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, i) => {
            return (
              <li key={`${image} ${i}`}>
                <img
                  style={{
                    margin: `${horizontalSpace}px`,
                    width: itemWidth,
                  }}
                  src={`${image}`}
                  alt={(i + 1).toString()}
                  className="Carousel__list__item"
                />
              </li>
            );
          })}
        </ul>
      </div>

      <button type="button" onClick={handleClkBackward} data-cy="prev">
        Prev
      </button>
      <button type="button" onClick={handleClkForward} data-cy="next">
        Next
      </button>
    </div>
  );
};

export default Carousel;
