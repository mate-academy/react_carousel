import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 1,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalImages = images.length;

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % totalImages;

      return infinite
        ? nextIndex
        : Math.min(nextIndex, totalImages - frameSize);
    });
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexLimited = (prevIndex - 1 + totalImages) % totalImages;

      return infinite ? prevIndexLimited : Math.max(prevIndexLimited, 0);
    });
  };

  const visibleImages = images.slice(currentIndex, currentIndex + frameSize);

  return (
    <div className="Carousel">
      <ul className="Carousel__list" style={{ width: totalImages * itemWidth, transitionDuration: `${animationDuration}ms` }}>
        {images.map((image, index) => (
          <li
            key={image}
            style={{
              width: itemWidth,
              display: visibleImages.includes(image) ? 'block' : 'none',
            }}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handlePrevClick}
        disabled={currentIndex === 0}
      >
        Previous
      </button>

      <button
        type="button"
        onClick={handleNextClick}
        disabled={currentIndex + frameSize >= totalImages}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
