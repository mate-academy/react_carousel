import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [position, setPosition] = useState(0);

  const isNextButtonDisabled = itemWidth * images.length
    === Math.abs(position) + frameSize * itemWidth;

  const showNextImages = () => {
    const slideNumber = Math.ceil(Math.abs(position / (step * itemWidth)));
    const restItems = (images.length - step * slideNumber) - frameSize;

    if (restItems < frameSize && restItems < step) {
      setPosition((prevPosition) => {
        return prevPosition - restItems * itemWidth;
      });
    } else {
      setPosition((prevPosition) => prevPosition - step * itemWidth);
    }
  };

  const showPrevImages = () => {
    if (Math.abs(position) >= itemWidth * step) {
      setPosition((prevPosition) => {
        return prevPosition + step * itemWidth;
      });
    } else {
      setPosition(prev => prev - position);
    }
  };

  const gap = 2;
  const gapsInFrameCount = frameSize - 1;

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: frameSize * itemWidth + gap * gapsInFrameCount }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${position}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={`${index + 1}`}
                className="Carousel__image"
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div
        className="Carousel__buttons-wrapper"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <button
          type="button"
          className="Carousel__button"
          disabled={position === 0}
          onClick={showPrevImages}
        >
          &lt;
        </button>
        <button
          data-cy="next"
          type="button"
          className="Carousel__button"
          disabled={isNextButtonDisabled}
          onClick={showNextImages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
