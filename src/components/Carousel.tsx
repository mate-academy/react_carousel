import React from 'react';
import './Carousel.scss';
import { useState } from 'react';
import classNames from 'classnames';

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
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(prevIndex =>
      prevIndex === 0 ? Math.ceil(images.length / step) - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex(prevIndex =>
      prevIndex === Math.ceil(images.length / step) - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={() => handlePrev()}
        className={classNames({ disabled: activeIndex === 0 })}
      >
        &#8592;
      </button>

      <ul className="Carousel__list" style={{ width: `${frameSize * 130}px` }}>
        {images.map((image, index) => (
          <li
            key={image}
            style={{
              transform: `translateX(-${activeIndex * step * 100}%)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              className="Carousel__img"
              src={image}
              alt={index}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        data-cy="next"
        onClick={() => handleNext()}
        className={classNames({
          disabled: activeIndex === Math.ceil(images.length / step) - 1,
        })}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Carousel;
