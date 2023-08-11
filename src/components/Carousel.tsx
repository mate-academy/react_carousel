import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  // infinite?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  frameSize = 3,
  itemWidth = 130,
  step = 3,
  animationDuration = 1000,
}) => {
  const [offset, setOffset] = useState(0);
  const maxOffset = images.length - frameSize;

  const handlePrev = () => {
    if (offset >= step) {
      setOffset(prevOffset => prevOffset - step);
    } else {
      setOffset(0);
    }
  };

  const handleNext = () => {
    if (offset + step < maxOffset) {
      setOffset(prevOffset => prevOffset + step);
    } else {
      setOffset(maxOffset);
    }
  };

  useEffect(() => {
    const scrollWidth = offset * itemWidth;

    document.documentElement.style.setProperty('--transform-offset', `-${scrollWidth}px`);
    document.documentElement.style.setProperty('--image-size', `${itemWidth}px`);
    document.documentElement.style.setProperty('--frame-size', `${frameSize}`);
    document.documentElement.style.setProperty('--animation-duration', `${animationDuration}ms`);
  }, [offset, itemWidth, frameSize, animationDuration]);

  return (
    <div className="container">
      <div className="Carousel">
        <ul className="Carousel__list transformed">
          {images.map((imgSrc) => (
            <li key={imgSrc}>
              <img src={imgSrc} alt="" />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handlePrev}
          className={`prev-button ${offset === 0 ? 'disabled' : ''}`}
        >
          Prev
        </button>

        <button
          type="button"
          onClick={handleNext}
          className={`next-button ${offset >= maxOffset ? 'disabled' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
