import React from 'react';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  step: number;
  animationDuration: number;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  currentIndex,
  setCurrentIndex,
  step,
  animationDuration,
}) => {
  const maxIndex = images.length - frameSize;

  const handlePrev = () => {
    setCurrentIndex(currentIndex - step < 0 ? 0 : currentIndex - step);
  };

  const handleNext = () => {
    setCurrentIndex(
      currentIndex + step > maxIndex ? maxIndex : currentIndex + step,
    );
  };

  return (
    <div className="Carousel is-flex is-align-items-center">
      <button
        style={{ height: `${itemWidth}px`, width: '30px' }}
        type="button"
        className="button is-primary"
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        &lt;
      </button>
      <div
        className="Carousel__viewport"
        style={{ width: `${itemWidth * frameSize}px`, overflow: 'hidden' }}
      >
        <ul
          className="Carousel__list is-flex"
          style={{
            transition: `transform ${animationDuration / 1000}s ease`,
            transform: `translateX(-${itemWidth * currentIndex}px)`,
          }}
        >
          {images.map(image => (
            <li style={{ width: `${itemWidth}px`, flexShrink: 0 }} key={image}>
              <img
                src={image}
                alt="carousel item"
                style={{ width: '100%' }}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        data-cy="next"
        style={{ height: `${itemWidth}px`, width: '30px' }}
        type="button"
        className="button is-primary"
        onClick={handleNext}
        disabled={currentIndex === maxIndex}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
