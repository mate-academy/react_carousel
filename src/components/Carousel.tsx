import React from 'react';
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
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const visibleWidth = itemWidth * frameSize;
  const maxIndex = Math.max(0, images.length - frameSize);
  const offset = currentIndex * itemWidth;

  React.useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  const handlePrev = () => {
    const newIndex = currentIndex - step;

    if (newIndex < 0) {
      setCurrentIndex(infinite ? maxIndex : 0);
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const handleNext = () => {
    const newIndex = currentIndex + step;

    if (newIndex > maxIndex) {
      setCurrentIndex(infinite ? 0 : maxIndex);
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const isPrevDisabled = !infinite && currentIndex === 0;
  const isNextDisabled = !infinite && currentIndex === maxIndex;

  return (
    <div className="Carousel">
      <div className="Carousel__slider" style={{ width: visibleWidth }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${offset}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li key={index} className="Carousel__item">
              <img
                src={image}
                alt={index.toString()}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons" style={{ width: visibleWidth }}>
        <button
          type="button"
          onClick={handlePrev}
          disabled={isPrevDisabled}
          className={`Carousel__button ${isPrevDisabled ? 'disabled' : ''}`}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={handleNext}
          disabled={isNextDisabled}
          className={`Carousel__button ${isNextDisabled ? 'disabled' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
