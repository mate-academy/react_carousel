import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
}

const Carousel: React.FC<Props> = (props) => {
  const {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
  } = props;

  const [translate, setTranslate] = useState(0);

  const pixelStep = step * itemWidth;
  const carouselWidth = frameSize * itemWidth;
  const maxTranslate = (images.length - frameSize) * itemWidth;

  const handlePrevClick = () => {
    setTranslate(current => {
      return current - pixelStep >= 0
        ? current - pixelStep
        : 0;
    });
  };

  const handleNextClick = () => {
    setTranslate(current => {
      return current + pixelStep >= maxTranslate
        ? maxTranslate
        : current + pixelStep;
    });
  };

  return (
    <div className="Carousel" style={{ width: `${carouselWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${translate}px)`,
          transition: `${animationDuration}ms transform`,
        }}
      >
        {images.map((image, i) => (
          <li key={image}>
            <img
              className="Carousel__img"
              src={image}
              alt={(i + 1).toString()}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={handlePrevClick}
          disabled={!translate}
        >
          Prev
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          disabled={translate === maxTranslate}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
