import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  currentIndex: number;
  setCurrentIndex: (value: number | ((prev: number) => number)) => void;
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  currentIndex,
  setCurrentIndex,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const totalItems = images.length;
  const maxTranslate = Math.max(0, totalItems - frameSize);

  const handleNextIndex = () => {
    setCurrentIndex(prev => {
      const next = prev + step;

      if (prev >= maxTranslate) {
        return infinite ? 0 : prev;
      }

      return Math.min(next, maxTranslate);
    });
  };

  const handlePrevIndex = () => {
    setCurrentIndex(prev => {
      const previous = prev - step;

      if (prev <= 0) {
        return infinite ? maxTranslate : prev;
      }

      return Math.max(previous, 0);
    });
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={() => handlePrevIndex()}
        disabled={!infinite && currentIndex <= 0}
      >
        ←
      </button>

      <div
        className="Carousel__viewport"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => {
            return (
              <li key={image}>
                <img src={image} alt={`${index + 1}`} width={itemWidth} />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        data-cy="next"
        onClick={() => handleNextIndex()}
        disabled={!infinite && currentIndex >= images.length - frameSize}
      >
        →
      </button>
    </div>
  );
};

export default Carousel;
