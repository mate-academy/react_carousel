import React from 'react';
import './Carousel.scss';

interface CarouselList {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Carousel: React.FC<CarouselList> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  currentIndex,
  setCurrentIndex,
}) => {
  const maxIndex = images.length - frameSize;

  function hendlePrev() {
    setCurrentIndex(currentIndex - step < 0 ? 0 : currentIndex - step);
  }

  function hendleNext() {
    setCurrentIndex(
      currentIndex + step > maxIndex ? maxIndex : currentIndex + step,
    );
  }

  return (
    <div className="Carousel">
      <button
        type="button"
        className="button"
        disabled={currentIndex === 0}
        onClick={hendlePrev}
      >
        {'<<'}
      </button>

      <div
        className="Carousel__container"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `transform ${animationDuration / 1000}s ease`,
            transform: `translateX(-${itemWidth * currentIndex}px)`,
          }}
        >
          {images.map((img, i) => (
            <li key={img} style={{ width: `${itemWidth}px`, flexShrink: 0 }}>
              <img
                src={img}
                alt={`#${i}`}
                style={{ width: '100%' }}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        data-cy="next"
        type="button"
        className="button"
        disabled={currentIndex === maxIndex}
        onClick={hendleNext}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Carousel;
