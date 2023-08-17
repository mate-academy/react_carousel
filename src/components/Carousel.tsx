import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean
};

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const maxScroll = (images.length - frameSize) * itemWidth;
  const [position, setPosition] = useState(0);

  const handlePrevClick = () => {
    const scrolled = position - (step * itemWidth);

    if (scrolled >= 0) {
      setPosition(scrolled);
    } else if (infinite && scrolled < 0) {
      setPosition((images.length - frameSize) * itemWidth);
    } else {
      setPosition(0);
    }
  };

  const handleNextClick = () => {
    const scrolled = position + (step * itemWidth);

    if (scrolled <= maxScroll) {
      setPosition(scrolled);
    } else if (infinite && scrolled > maxScroll) {
      setPosition((maxScroll - scrolled) + frameSize * itemWidth);
    } else {
      setPosition(maxScroll);
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${itemWidth * frameSize}px`,
        overflow: 'hidden',
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${position}px)`,
          transition: `transform ${animationDuration}ms linear`,
        }}
      >
        {images.map((image, index) => {
          const visible
          = (index + 1) * itemWidth > position
            && (index + 1) * itemWidth <= position + frameSize * itemWidth;

          return (
            <li key={image}>
              <img
                src={image}
                alt={`${index + 1}`}
                width={itemWidth}
                style={{
                  width: `${itemWidth}px`,
                  visibility: visible ? 'visible' : 'hidden',
                  transition: `visibility ${animationDuration}ms linear`,
                }}
              />
            </li>
          );
        })}
      </ul>
      <div className="Carousel__button">
        <button
          type="button"
          className="Carousel__button--item"
          onClick={handlePrevClick}
          disabled={!infinite && position <= 0}
        >
          &larr;
        </button>
        <button
          type="button"
          className="Carousel__button--item"
          onClick={handleNextClick}
          disabled={!infinite && position >= maxScroll}
          data-cy="next"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};
