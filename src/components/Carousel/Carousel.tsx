/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [imagePosition, setImagePosition] = useState(0);
  const changePosition = -(images.length - frameSize);
  const prevDisabled = imagePosition === 0 && !infinite;
  const nextDisabled = imagePosition === changePosition && !infinite;

  const styleList = {
    transform: `translateX(${imagePosition * itemWidth}px)`,
    transition: `transform ${animationDuration}ms`,
  };

  const prevImage = () => {
    const newPosition =
    imagePosition < 0 ? Math.min(imagePosition + step, 0) : changePosition;

    setImagePosition(newPosition);
  };

  const nextImage = () => {
    const newPosition =
    imagePosition === changePosition
      ? 0 : Math.max(imagePosition - step, changePosition);

    setImagePosition(newPosition);
  };

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize - 1}px` }}>
      <ul className="Carousel__list" style={styleList}>
        {images.map(image => (
          <li key={image}>
            <img
              src={image}
              alt={image}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <button
        className='Carousel__prev-button'
        type="button"
        onClick={prevImage}
        disabled={prevDisabled}
      >
        Prev
      </button>

      <button
        className='Carousel__next-button'
        type="button"
        data-cy='next'
        onClick={nextImage}
        disabled={nextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
