import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);

  const hendlerNextClick = () => {
    setCurrentImgIndex(prevIndex => {
      const maxIndex = images.length - frameSize;

      const nextIndex = prevIndex + step;

      return nextIndex >= maxIndex ? maxIndex : nextIndex;
    });
  };

  const hendlerPrevClick = () => {
    setCurrentImgIndex(prevIndx => {
      const newIndx = prevIndx - step;

      return newIndx < 0 ? 0 : newIndx;
    });
  };

  const dynamicStyles: React.CSSProperties = {
    '--carousel-item-width': `${itemWidth}px`,
    '--carousel-window-width': `${frameSize * (itemWidth + 2)}px`,
    '--carousel-translate-x': `-${currentImgIndex * (itemWidth + 10) - (currentImgIndex > 0 ? 10 : 0)}px`,
    '--carousel-animation-duration': `${animationDuration}ms`,
  } as React.CSSProperties;

  return (
    <>
      <h1 className="Carousel__title">DIABLO |||</h1>
      <div className="Carousel" style={dynamicStyles}>
        <ul className="Carousel__list">
          {images.map((image, i) => (
            <li key={i} className="Carousel__item">
              <img src={image} alt={`${i}`} className="Carousel__image" />
            </li>
          ))}
        </ul>
      </div>
      <div className="Buttons">
        <button
          className="Buttons__left"
          type="button"
          onClick={hendlerPrevClick}
          disabled={currentImgIndex === 0}
        ></button>

        <button
          className="Buttons__rigth"
          type="button"
          onClick={hendlerNextClick}
          disabled={currentImgIndex === images.length - frameSize}
          data-cy
        ></button>
      </div>
    </>
  );
};

export default Carousel;
