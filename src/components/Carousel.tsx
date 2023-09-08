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
  const handleNext = () => {
    let newTransform = transform + step * itemWidth;

    if (images.length - (transform / itemWidth + frameSize) < step) {
      newTransform = (images.length * itemWidth) - (frameSize * itemWidth);
    }

    if (transform / itemWidth + frameSize >= images.length && infinite) {
      newTransform = 0;
    }

    setTransform(newTransform);
  };

  const handlePrev = () => {
    let newTransform = transform - step * itemWidth;

    if ((transform / itemWidth - frameSize) < 0) {
      newTransform = 0;
    }

    if (transform < 1 && infinite) {
      newTransform = (images.length - frameSize) * itemWidth;
    }

    setTransform(newTransform);
  };

  useEffect(() => {
    const wrapElement = document.querySelector('.Carousel') as HTMLElement;

    wrapElement.style.width = `${itemWidth * frameSize}px`;
    wrapElement.style.transition = `all ${animationDuration}ms ease-in-out`;
  }, [step, frameSize, itemWidth, animationDuration]);

  return (
    <div className="MainWrap">
      <div
        className="Carousel"
        style={{ width: `${itemWidth * frameSize}px` }}
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
          disabled={transform < 1 && !infinite}
        >
          {'< Prev'}
        </button>
        <button
          type="button"
          className="Carousel__button"
          onClick={handleNext}
          disabled={
            transform / itemWidth + frameSize >= images.length && !infinite
          }
        >
          {'Next >'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
