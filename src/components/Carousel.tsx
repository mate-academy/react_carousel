import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
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
  const widthContainer = (itemWidth - 1) * frameSize;
  const widthList = itemWidth * images.length;
  const endIndex = images.length - frameSize;

  const handleNextTransform = () => {
    if (currentIndex < endIndex) {
      setCurrentIndex(prev =>
        prev + step <= endIndex ? prev + step : endIndex,
      );
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevTransform = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => (prev - step >= 0 ? prev - step : 0));
    } else {
      setCurrentIndex(endIndex);
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel__wrapper" style={{ width: widthContainer }}>
        <div
          className="Carousel__container"
          style={{ width: widthContainer, height: itemWidth }}
        >
          <ul
            className="Carousel__list"
            style={{
              width: widthList,
              height: itemWidth,
              transform: `translate(-${currentIndex * itemWidth}px)`,
              transitionDuration: `${animationDuration}ms`,
            }}
          >
            {images.map((image, index) => (
              <li key={index} style={{ width: itemWidth }}>
                <img src={image} alt={`${index + 1}`} width={itemWidth} />
              </li>
            ))}
          </ul>
        </div>
        <div className="Carousel__button-container">
          <button
            className={cn('Carousel__button', {
              disabled: !infinite && currentIndex === 0,
            })}
            type="button"
            disabled={!infinite && currentIndex === 0}
            onClick={handlePrevTransform}
          >
            <svg className="Carousel__icon" width="32" height="32">
              <use href="./img/icons/sprite.svg#arrow-left"></use>
            </svg>
          </button>
          <button
            className={cn('Carousel__button', {
              disabled: currentIndex + frameSize >= images.length && !infinite,
            })}
            type="button"
            data-cy="next"
            disabled={currentIndex + frameSize >= images.length && !infinite}
            onClick={handleNextTransform}
          >
            <svg className="Carousel__icon" width="32" height="32">
              <use href="./img/icons/sprite.svg#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
