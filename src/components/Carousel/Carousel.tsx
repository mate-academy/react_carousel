import React, { useState } from 'react';
import './Carousel.scss';
import { State } from '../../types/State';
import { Direction } from '../Direction';

export const Carousel: React.FC<State> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinity,
}) => {
  const [indexStart, setIndexImage] = useState(0);

  const handleMoveRight = () => {
    const isEnoughImages = indexStart + step >= images.length - frameSize;

    if (isEnoughImages && !infinity) {
      setIndexImage(images.length - frameSize);
    } else if (isEnoughImages && infinity) {
      setIndexImage(0);
    } else {
      setIndexImage(indexStart + step);
    }
  };

  const handleMoveLeft = () => {
    const isEnoughImages = indexStart - step < 0;

    if (isEnoughImages && !infinity) {
      setIndexImage(0);
    } else if (isEnoughImages && infinity) {
      setIndexImage(images.length - frameSize);
    } else {
      setIndexImage(indexStart - step);
    }
  };

  const styleCourse = {
    width: `${itemWidth * frameSize}px`,
  };
  const prevDisabled = indexStart === 0 && !infinity;
  const nextDisabled = indexStart > images.length - frameSize - 1 && !infinity;

  return (
    <div
      className="Carousel"
      style={styleCourse}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${indexStart * itemWidth}px)`,
          transition: `${animationDuration}ms`,
        }}
      >
        {images.map((img, index) => (
          <li
            key={img}
          >
            <img
              src={img}
              alt={`${index + 1}`}
              style={{
                width: `${itemWidth}px`,
              }}
            />
          </li>
        ))}
      </ul>

      <Direction
        changeMoveLeft={handleMoveLeft}
        changeMoveRight={handleMoveRight}
        prevDisabled={prevDisabled}
        nextDisabled={nextDisabled}
      />
    </div>
  );
};
