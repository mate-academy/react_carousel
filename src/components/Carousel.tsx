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
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesLength = images.length;

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - step, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prev => {
      const maxIndex = imagesLength - 1;

      return Math.min(prev + step, maxIndex);
    });
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__viewport"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${itemWidth * imagesLength}px`,
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => (
            <li className="Carousel__item" key={image}>
              <img src={image} width={itemWidth} alt={`Image ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={handlePrev} disabled={currentIndex === 0}>
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={handleNext}
        disabled={currentIndex + frameSize >= imagesLength}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
