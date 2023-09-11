import React, { useState, useEffect } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [transform, setTransform] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const imgLength = images.length;
  const sequenceNumberImg = transform / itemWidth;

  useEffect(() => {
    const newCarouselWidth = itemWidth * frameSize;

    setCarouselWidth(newCarouselWidth);
  }, [itemWidth, frameSize]);

  const handleNext = () => {
    let newTransform = transform + step * itemWidth;

    if (imgLength - (sequenceNumberImg + frameSize) < step) {
      newTransform = (imgLength * itemWidth) - (frameSize * itemWidth);
    }

    if (sequenceNumberImg + frameSize >= imgLength && infinite) {
      newTransform = 0;
    }

    setTransform(newTransform);
  };

  const handlePrev = () => {
    let newTransform = transform - step * itemWidth;

    if ((sequenceNumberImg - frameSize) < 0) {
      newTransform = 0;
    }

    if (transform < 1 && infinite) {
      newTransform = (imgLength - frameSize) * itemWidth;
    }

    setTransform(newTransform);
  };

  const width = `${carouselWidth}px`;
  const transition = `all ${animationDuration}ms ease-in-out`;
  const regimeDisabletNext = transform / itemWidth + frameSize >= images.length;
  const regimeDisabletPrev = transform < 1;

  return (
    <div className="MainWrap">
      <div
        className="Carousel"
        style={{ width, transition }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-transform}px)`,
            transition: `all ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((elem, index) => (
            <li key={elem}>
              <img
                key={elem}
                src={elem}
                alt={`${index + 1}`}
                className="Carousel__img"
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrev}
          disabled={regimeDisabletPrev && !infinite}
        >
          {'< Prev'}
        </button>
        <button
          type="button"
          className="Carousel__button"
          onClick={handleNext}
          disabled={regimeDisabletNext && !infinite}
        >
          {'Next >'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
