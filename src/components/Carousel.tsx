import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  width: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  width,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [index, setIndex] = useState(0);

  const maxIndex = images.length - frameSize;
  const atStart = !index && !infinite;
  const atEnd = index === images.length - frameSize && !infinite;

  const carouselStyle = {
    width: `${width * frameSize}px`,
  };

  const imageStyle = {
    transition: `transform ${animationDuration}ms ease-in-out`,
    transform: `translateX(-${index * width}px)`,
  };

  const handleNext = () => {
    if (index < maxIndex) {
      return setIndex((prevIndex) => {
        return prevIndex + step <= maxIndex ? prevIndex + step : maxIndex;
      });
    }

    return setIndex(0);
  };

  const handlePrev = () => {
    if (index > 0) {
      return setIndex((prevIndex) => {
        return prevIndex - step > 0 ? prevIndex - step : 0;
      });
    }

    return setIndex(maxIndex);
  };

  return (
    <div className="Carousel">
      <div className="Carousel__frame" style={carouselStyle}>
        <ul className="Carousel__list">
          {images.map((image) => (
            <li
              key={image}
              className="Carousel__item"
              style={imageStyle}
            >
              <img
                src={image}
                alt={`Carousel item ${image}`}
                width={width}
              />
            </li>
          ))}
        </ul>

        <div className="buttons">
          <button
            className="btn btn-left"
            type="button"
            onClick={handlePrev}
            disabled={atStart}
          >
            &#8249;
          </button>

          <button
            className="btn btn-right"
            type="button"
            data-cy="next"
            onClick={handleNext}
            disabled={atEnd}
          >
            &#8250;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
