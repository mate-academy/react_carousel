import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalImages = images.length;
  // const totalFrames = Math.ceil(totalImages / frameSize);

  const handleNext = () => {
    if (currentIndex + frameSize < totalImages) {
      setCurrentIndex(currentIndex + step);
    } else if (infinite) {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex - step >= 0) {
      setCurrentIndex(currentIndex - step);
    } else if (infinite) {
      setCurrentIndex(totalImages - frameSize);
    }
  };

  const containerStyle: React.CSSProperties = {
    width: itemWidth * frameSize,
  };

  const listStyle: React.CSSProperties = {
    transition: `transform ${animationDuration}ms ease-in-out`,
    transform: `translateX(-${currentIndex * itemWidth}px)`,
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={containerStyle}>
        <ul className="Carousel__container-list" style={listStyle}>
          {images.map((image, index) => (
            <li key={image} style={{ width: itemWidth, marginRight: 10 }}>
              <img
                src={image}
                alt={`img-${index}`}
                width={itemWidth}
                height={130}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="prev"
        type="button"
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={handleNext}
        disabled={currentIndex + frameSize >= totalImages}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
