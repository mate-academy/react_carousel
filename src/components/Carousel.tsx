import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinity: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinity,
}) => {
  const [vision, setVision] = useState(0);
  const imagesLength = images.length;
  const lastVision = imagesLength - frameSize;

  const styleImage: React.CSSProperties = {
    width: `${itemWidth}px`,
    height: `${itemWidth}px`,
  };

  const styleCarouselList: React.CSSProperties = {
    width: `${itemWidth * frameSize}px`,
  };

  const styleCarouselLi: React.CSSProperties = {
    transform: `translateX(${-vision * itemWidth}px)`,
    transition: `transform ${animationDuration}ms`,
  };

  const handlePrevClick = () => {
    if (infinity && vision <= 0) {
      setVision(lastVision);
    } else {
      setVision((cur) => Math.max(cur - step, 0));
    }
  };

  const handleNextClick = () => {
    if (infinity && vision >= lastVision) {
      setVision(0);
    } else {
      setVision((cur) => Math.min(cur + step, lastVision));
    }
  };

  const isDisabledPrevHandle = infinity ? false : vision <= 0;
  const isDisabledNextHandle = infinity ? false : vision >= lastVision;

  return (
    <div className="Carousel">
      <ul style={styleCarouselList} className="Carousel__list">
        {images.map((image, index) => (
          <li key={image} className="Carousel__item" style={styleCarouselLi}>
            <img style={styleImage} src={image} alt={`${index + 1}`} />
          </li>
        ))}
      </ul>

      <div className="Carousel__btns">
        <button
          type="button"
          disabled={isDisabledPrevHandle}
          onClick={handlePrevClick}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          disabled={isDisabledNextHandle}
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
