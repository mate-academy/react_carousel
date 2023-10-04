import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (images.length > frameSize) {
      setIndexImage(prevIndexStart => prevIndexStart - 1);
    }
  }, [frameSize]);

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

  const styleTransform = {
    transform: `translateX(-${indexStart * itemWidth}px)`,
    transition: `${animationDuration}ms`,
  };

  const prevDisabled = indexStart <= 0 && !infinity;
  const nextDisabled = indexStart > images.length - frameSize - 1 && !infinity;

  return (
    <>
      <div
        className="Carousel"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={styleTransform}
        >
          {images.map((img, index) => (
            <li
              key={img}
            >
              <img
                src={img}
                alt={`${index + 1}`}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>

      <Direction
        changeMoveLeft={handleMoveLeft}
        changeMoveRight={handleMoveRight}
        prevDisabled={prevDisabled}
        nextDisabled={nextDisabled}
      />
    </>
  );
};
