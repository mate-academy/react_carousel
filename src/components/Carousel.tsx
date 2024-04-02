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
    setCurrentImgIndex(prevIndx => {
      const newIndx = prevIndx + step;

      return newIndx > images.length ? images.length - frameSize : newIndx;
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
    '--carousel-window-width': `${frameSize * itemWidth}px`,
    '--carousel-translate-x': `-${currentImgIndex * itemWidth}px`,
    '--carousel-animation-duration': `${animationDuration}ms`,
  } as React.CSSProperties;

  return (
    <div className="Carousel" style={dynamicStyles}>
      <h1 className="Carousel__title">DIABLO 3</h1>
      <ul className="Carousel__list">
        {images.map((image, i) => (
          <li key={i} className="Carousel__item">
            <img src={image} alt={`${i}`} className="Carousel__image" />
          </li>
        ))}
      </ul>
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
    </div>
  );
};

export default Carousel;
