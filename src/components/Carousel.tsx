import React from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
}) => {
  const totalWidth = itemWidth * images.length;
  const frameWidth = itemWidth * frameSize;

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - step, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + step, images.length - frameSize));
  };

  return (
    <div className="Carousel" style={{ width: frameWidth }}>
      <ul
        className="Carousel__list"
        style={{
          width: totalWidth,
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li key={index}>
            <img
              src={image}
              alt={`image ${index + 1}`}
              width={itemWidth}
              data-cy={`img-${index + 1}`}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        data-cy="prev"
        disabled={currentIndex === 0}
        onClick={handlePrev}
      >
        Prev
      </button>

      <button
        type="button"
        data-cy="next"
        disabled={currentIndex >= images.length - frameSize}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
