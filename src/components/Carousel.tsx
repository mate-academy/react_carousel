import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [slide, setShift] = useState(0);

  const handleButton = (movement: number) => {
    if (slide + movement >= images.length - frameSize) {
      setShift(images.length - frameSize);
    } else if (slide + movement <= 0) {
      setShift(0);
    } else {
      setShift(slide + movement);
    }
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        data-cy="prev"
        onClick={() => handleButton(-step)}
      >
        Prev
      </button>

      <ul
        className="Carousel__list"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        {images.map((image: string) => (
          <li key={image}>
            <img
              src={image}
              alt={`${images.indexOf(image) + 1} `}
              style={
                {
                  width: itemWidth,
                  right: `${slide * itemWidth}px`,
                  transitionDuration: `${animationDuration}ms`,
                }
              }
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        data-cy="next"
        onClick={() => handleButton(step)}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
