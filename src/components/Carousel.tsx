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
  frameSize,
  step,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [offset, setOffset] = useState(0);

  const maxOffset = (images.length - frameSize) * itemWidth;

  const handleNext = () => {
    setOffset(prev => {
      if (infinite && prev + step * itemWidth >= maxOffset) {
        return 0;
      }

      return Math.min(prev + step * itemWidth, maxOffset);
    });
  };

  const handlePrev = () => {
    setOffset(prev => {
      if (infinite && prev === 0) {
        return maxOffset;
      }

      return Math.max(prev - step * itemWidth, 0);
    });
  };

  const imageList = images.map((img, index) => {
    const name = `image-${index + 1}`;

    return (
      <li key={name}>
        <img
          src={img}
          alt={name}
          className="Carousel__list-item"
          width={itemWidth}
          height={itemWidth}
        />
      </li>
    );
  });

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${offset}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {imageList}
      </ul>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button Carousel__button--prev"
          type="button"
          onClick={handlePrev}
          disabled={!infinite && offset === 0}
        >
          Prev
        </button>
        <button
          className="Carousel__button Carousel__button--next"
          type="button"
          data-cy="next"
          onClick={handleNext}
          disabled={!infinite && offset === maxOffset}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
