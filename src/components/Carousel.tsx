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

  const translateStep = step * itemWidth;
  const carouselWidth = frameSize * itemWidth;
  const maxTranslate = (images.length - frameSize) * itemWidth;

  const handlePrevClick = () => {
    setTranslate(currentTranslate => {
      return currentTranslate - translateStep > 0
        ? currentTranslate - translateStep
        : 0;
    });
  };

  const handleNextClick = () => {
    setTranslate(current => {
      return current + translateStep < maxTranslate
        ? current + translateStep
        : maxTranslate;
    });
  };

  return (
    <div className="Carousel" style={{ width: `${carouselWidth}px` }}>
      <div className="Carousel__frame">
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
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrevClick}
          disabled={!translate}
        >
          {'<'}
        </button>

        <button
          type="button"
          className="Carousel__button"
          onClick={handleNextClick}
          disabled={translate === maxTranslate}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
