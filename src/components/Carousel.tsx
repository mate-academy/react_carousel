import React, { useState, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [transformValue, setTransformValue] = useState(0);
  const totalItems = images.length;
  const maxTransformValue = -itemWidth * (totalItems - frameSize);

  useEffect(() => {
    setTransformValue(0);
  }, [images]);

  const handleNextClick = () => {
    setTransformValue(prev => {
      const newValue = prev - itemWidth * step;

      if (newValue < maxTransformValue) {
        return infinite ? 0 : maxTransformValue;
      }

      return newValue;
    });
  };

  const handlePrevClick = () => {
    setTransformValue(prev => {
      const newValue = prev + itemWidth * step;

      if (newValue > 0) {
        return infinite ? maxTransformValue : 0;
      }

      return newValue;
    });
  };

  return (
    <div
      className="Carousel"
      style={{ width: `${frameSize * itemWidth - 1}px` }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${transformValue}px)`,
          transitionDuration: `${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li className="Carousel__item" key={index}>
            <img
              className="Carousel__image"
              src={image}
              alt={`image-${index + 1}`}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <button type="button" onClick={handlePrevClick}>
        Prev
      </button>
      <button type="button" data-cy="next" onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
