import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [translateX, setTranslateX] = useState(0);

  const margin = 20;
  const imageWidth = 130 + margin;
  const containerWidth = images.length * imageWidth;
  const imagePerScroll = 3;
  const startOffset = 0;
  const scrollWidth = (containerWidth - (imagePerScroll * imageWidth));
  const isPrevDisabled = translateX === startOffset;
  const isNextDisabled = -translateX === scrollWidth;

  const handlePrevClick = () => {
    if (translateX < startOffset) {
      const imagesLeft = (-translateX) / imageWidth;

      if (imagesLeft - imagePerScroll < 0) {
        setTranslateX(prev => prev + imagesLeft * imageWidth);
      } else {
        setTranslateX(prev => prev + imagePerScroll * imageWidth);
      }
    }
  };

  const handleNextClick = () => {
    if (translateX > -scrollWidth) {
      const imagesRight = (scrollWidth - (-translateX)) / imageWidth;

      if (imagesRight - imagePerScroll < 0) {
        setTranslateX(prev => prev - imagesRight * imageWidth);
      } else {
        setTranslateX(prev => prev - imagePerScroll * imageWidth);
      }
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={
          {
            transform: `translateX(${translateX}px)`,
          }
        }
      >
        {
          images.map((image, index) => (
            <li
              className="Carousel__item"
              key={image}
            >
              <img
                src={image}
                alt={String(index + 1)}
                className="Carousel__img"
              />
            </li>
          ))
        }
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          disabled={isPrevDisabled}
          onClick={handlePrevClick}
        >
          Prev
        </button>
        <button
          type="button"
          disabled={isNextDisabled}
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
