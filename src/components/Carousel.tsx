import React from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const maxIndex = images.length - frameSize;

  const handleNextClick = () => {
    const newIndex = currentIndex + step;

    setCurrentIndex(Math.min(newIndex, maxIndex));
  };

  const handlePrevClick = () => {
    const newIndex = currentIndex - step;

    setCurrentIndex(Math.max(newIndex, 0));
  };

  const offset = currentIndex * itemWidth + currentIndex * 10;

  return (
    <div
      className="Carousel"
      style={{ width: `${itemWidth * frameSize + (frameSize - 1) * 10}px` }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${offset}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        {images?.map((image, index) => (
          <li key={`${image}-${index}`} className="Carousel__item">
            <img src={image} alt={`${index + 1}`} width={itemWidth} />
          </li>
        ))}
      </ul>

      <button type="button" onClick={handlePrevClick}>
        Prev
      </button>
      <button type="button" onClick={handleNextClick} data-cy="next">
        Next
      </button>
    </div>
  );
};

export default Carousel;
