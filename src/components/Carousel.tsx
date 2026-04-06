import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
}) => {
  const [visibleItems, setVisibleItems] = useState(0);

  const handleNext = () => {
    setVisibleItems(Math.min(visibleItems + step, images.length - frameSize));
  };

  const handlePrev = () => {
    setVisibleItems(Math.max(0, visibleItems - step));
  };

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul
        className="Carousel__list"
        style={{
          width: `${itemWidth * images.length}px`,
          transform: `translateX(${visibleItems * itemWidth * -1}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {images.map((image, index) => {
          return (
            <li key={image.slice(6)} className="Carousel__item">
              <img
                src={image}
                alt={String(index + 1)}
                className="Carousel__image"
                width={itemWidth}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          );
        })}
      </ul>

      <div className="Carousel__buttons">
        <button type="button" onClick={handlePrev} className="Carousel__button">
          Prev
        </button>

        <button
          type="button"
          onClick={handleNext}
          data-cy="next"
          className="Carousel__button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
