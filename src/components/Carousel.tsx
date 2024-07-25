import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [firstIndex, setFirstIndex] = useState(0);

  useEffect(() => {
    if (firstIndex + frameSize > images.length) {
      setFirstIndex(images.length - frameSize);
    }
  }, [frameSize, firstIndex, images]);

  const handlePrevClick = () => {
    if (infinite) {
      setFirstIndex(
        firstIndex === 0
          ? images.length - frameSize
          : Math.max(firstIndex - step, 0),
      );
    } else if (firstIndex !== 0) {
      setFirstIndex(Math.max(firstIndex - step, 0));
    }
  };

  const handleNextClick = () => {
    if (infinite) {
      setFirstIndex(
        firstIndex >= images.length - Math.max(step, frameSize)
          ? 0
          : Math.min(firstIndex + step, images.length - frameSize),
      );
    } else if (firstIndex + frameSize !== images.length) {
      setFirstIndex(Math.min(firstIndex + step, images.length - frameSize));
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: `${itemWidth * frameSize}px`,
          height: `${itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${itemWidth * firstIndex}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map(image => (
            <li key={image}>
              <img
                width={itemWidth}
                src={image}
                alt={(images.indexOf(image) + 1).toString()}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          disabled={!infinite && firstIndex === 0}
          onClick={handlePrevClick}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          disabled={!infinite && firstIndex === images.length - frameSize}
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
