import React from 'react';
import './Carousel.scss';
import cn from 'classnames';

interface Props {
  images: string[];
  currentImg: number;
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
  setCurrentImg: React.Dispatch<React.SetStateAction<number>>;
}

const Carousel: React.FC<Props> = ({
  images,
  currentImg,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
  setCurrentImg,
}) => {
  const maxImages = images.length - frameSize;
  const carouselWidth = itemWidth * frameSize;
  const imageTranslate = currentImg * itemWidth;

  const handlePrev = () => {
    if (currentImg !== 0) {
      setCurrentImg(currentImg - step >= 0 ? currentImg - step : 0);
    } else {
      setCurrentImg(maxImages);
    }
  };

  const handleNext = () => {
    if (currentImg !== maxImages) {
      setCurrentImg(
        currentImg + step <= maxImages ? currentImg + step : maxImages,
      );
    } else {
      setCurrentImg(0);
    }
  };

  const isDisablePrev = currentImg === 0 && !infinite;
  const isDisableNext = currentImg === maxImages && !infinite;

  return (
    <div
      className="Carousel"
      style={{
        width: `${carouselWidth}px`,
        transition: `${animationDuration}`,
      }}
    >
      <div className="contsiner">
        <ul className="Carousel__list">
          {images.map((img, i) => (
            <li
              key={img}
              style={{
                transform: `translateX(${-imageTranslate}px)`,
                transition: `transform ${animationDuration}ms ease`,
              }}
            >
              <img src={img} alt={`${i}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <div
        className="Carousel__button"
        style={{
          width: `${carouselWidth}px`,
        }}
      >
        <button
          type="button"
          className={cn(
            'button',
            { 'button--active': !isDisablePrev },
            { 'button--disabled': isDisablePrev },
          )}
          onClick={handlePrev}
          disabled={isDisablePrev}
        >
          Prev
        </button>
        <button
          type="button"
          className={cn(
            'button',
            { 'button--active': !isDisablePrev },
            { 'button--disabled': isDisableNext },
          )}
          onClick={handleNext}
          disabled={isDisableNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
