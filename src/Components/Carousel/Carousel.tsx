import { useState } from 'react';
import { Image } from '../../types/Images';
import { Params } from '../../types/Params';
import './Carousel.scss';

interface Props {
  images: Image[],
  visabilityParams: Params,
}

export const Carousel: React.FC<Props> = ({ images, visabilityParams }) => {
  const [position, setPosition] = useState(0);
  const {
    step, frameSize, itemWidth, animationDuration, infinite,
  } = visabilityParams;

  const handlePrevClick = () => {
    const hiddenImagesSize = (images.length - frameSize) * itemWidth;

    setPosition(Math.min(position + itemWidth * step, 0));

    if (position === 0 && infinite) {
      setPosition(-hiddenImagesSize);
    }
  };

  const handleNextClick = () => {
    const hiddenImagesSize = (images.length - frameSize) * itemWidth;

    setPosition(Math.max(position - itemWidth * step, -hiddenImagesSize));

    if (position === -hiddenImagesSize && infinite) {
      setPosition(0);
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        {images.map(({ id, url }) => (
          <li
            className="Carousel__item"
            key={id}
            style={{
              transform: `translateX(${position}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={url}
              alt={`${id}`}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrevClick}
          disabled={position === 0 && !infinite}
        >
          Prev
        </button>

        <button
          type="button"
          className="Carousel__button"
          data-cy="next"
          onClick={handleNextClick}
          disabled={
            position === -(images.length - frameSize) * itemWidth && !infinite
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};
