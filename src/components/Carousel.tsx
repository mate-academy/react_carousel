import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite = true,
}) => {
  const [position, setPosition] = useState(0);
  const endPosition = -(images.length - frameSize);
  const nextButtonDisabled = position === endPosition && !infinite;
  const prevButonDisabled = position === 0 && !infinite;

  const goPrev = () => {
    const newPosition =
      position < 0 ? Math.min(position + step, 0) : endPosition;

    setPosition(newPosition);
  };

  const goNext = () => {
    const newPosition =
      position === endPosition ? 0 : Math.max(position - step, endPosition);

    setPosition(newPosition);
  };

  const carouselStyle = {
    transform: `translateX(${position * itemWidth}px)`,
    transition: `transform ${animationDuration}ms`,
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        className="Carousel__button"
        onClick={goPrev}
        disabled={prevButonDisabled}
        style={position === 0 && !infinite ? { backgroundColor: 'red' } : {}}
      >
        &#8678;
      </button>
      <div
        className="Carousel__container"
        style={{ width: `${itemWidth * frameSize - 1}px` }}
      >
        <ul className="Carousel__list" style={carouselStyle}>
          {images.map((image, index) => (
            <li key={index} className="Carousel__link">
              <img
                src={image}
                alt={`${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        type="button"
        className="Carousel__button"
        onClick={goNext}
        disabled={nextButtonDisabled}
        style={
          position === endPosition && !infinite
            ? { backgroundColor: 'red' }
            : {}
        }
      >
        &#8680;
      </button>
    </div>
  );
};

export default Carousel;
