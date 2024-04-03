import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
}

enum CarouselConfig {
  Step = 3,
  FrameSize = 3,
  ItemWidth = 130,
  AnimationDuration = 1000
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = CarouselConfig.Step,
  frameSize = CarouselConfig.FrameSize,
  itemWidth = CarouselConfig.ItemWidth,
  animationDuration = CarouselConfig.AnimationDuration,
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  console.log(currentImgIndex)

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
    '--carousel-window-width': `${frameSize * (itemWidth + 7)}px`,
    '--carousel-translate-x': `-${currentImgIndex * (itemWidth + 8)}px`,
    '--carousel-animation-duration': `${animationDuration}ms`,
  } as React.CSSProperties;

  return (
    <>
      <h1 className="Carousel__title">DIABLO |||</h1>
      <div className="Carousel" style={dynamicStyles}>
        <ul className="Carousel__list">
          {images.map((image, i) => (
            <li key={image} className="Carousel__item">
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
