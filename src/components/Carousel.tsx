import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
}) => {
  const [translate, setTranslate] = useState(0);

  const handleNext = () => {
    setTranslate(translate - itemWidth * step);
  };

  const handlePrev = () => {
    setTranslate(translate + itemWidth * step);
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translate}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map(imag => (
            <li className="Carousel__item" key={imag}>
              <img src={imag} alt={imag} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handlePrev} type="button">
        Prev
      </button>
      <button data-cy="next" onClick={handleNext} type="button">
        Next
      </button>
    </div>
  );
};

export default Carousel;
