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
  const [slide, setSlide] = useState(0);

  const handleButton = (movement: number) => {
    if (slide + movement >= images.length - frameSize) {
      setSlide(images.length - frameSize);
    } else if (slide + movement <= 0) {
      setSlide(0);
    } else {
      setSlide(slide + movement);
    }
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        data-cy="prev"
        aria-disabled={slide === 0}
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
        aria-disabled={slide === images.length - frameSize}
        onClick={() => handleButton(step)}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
