import { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const GAP = 10;
  const frameWidth = frameSize * itemWidth + (frameSize - 1) * GAP;

  const handleNext = () => {
    setCurrentIndex(Math.min(currentIndex + step, images.length - frameSize));
  };

  const handlePrevious = () => {
    setCurrentIndex(Math.max(currentIndex - step, 0));
  };

  const containerStyle = {
    transform: `translateX(-${currentIndex * (itemWidth + GAP)}px)`,
    transition: `transform ${animationDuration}ms ease-out`,
    gap: `${GAP}px`,
  };

  return (
    <>
      <div className="carousel">
        <button
          className="button"
          type="button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <div
          className="carousel__container"
          style={{ width: `${frameWidth}px` }}
        >
          <ul className="carousel__list" style={containerStyle}>
            {images.map((image: string, index: number) => (
              <li key={index}>
                <img src={image} alt={image} width={itemWidth} />
              </li>
            ))}
          </ul>
        </div>
        <button
          data-cy="next"
          className="button"
          type="button"
          onClick={handleNext}
          disabled={currentIndex >= images.length - 3}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Carousel;
