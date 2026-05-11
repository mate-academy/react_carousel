import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [index, setIndex] = useState(0);
  const gap = 10;

  const handleNext = () => {
    if (index + frameSize < images.length) {
      setIndex(prev => Math.min(prev + step, images.length - frameSize));
    } else if (infinite) {
      setIndex(0);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(prev => Math.max(prev - step, 0));
    } else if (infinite) {
      setIndex(images.length - frameSize);
    }
  };

  const translateX = -index * (itemWidth + gap);

  return (
    <div className="carousel">
      <button
        type="button"
        onClick={handlePrev}
        className={!infinite && index === 0 ? 'disabled' : ''}
      >
        <i className="fa fa-arrow-left" />
      </button>

      <div
        className="container"
        style={{ width: `${frameSize * itemWidth + (frameSize - 1) * gap}px` }}
      >
        <ul
          className="carousel__list"
          style={{
            width: `${images.length * itemWidth + (images.length - 1) * gap}px`,
            transform: `translateX(${translateX}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((src, i) => (
            <li key={i}>
              <img
                src={src}
                alt={`Image ${i + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        data-cy="next"
        onClick={handleNext}
        className={
          !infinite && index === images.length - frameSize ? 'disabled' : ''
        }
      >
        <i className="fa fa-arrow-right" />
      </button>
    </div>
  );
};

export default Carousel;
