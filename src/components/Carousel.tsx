import React, { useState } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
  itemWidth: number;
  step: number;
  frameSize: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  step,
  frameSize,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev =>
      infinite
        ? (prev - step + images.length) % images.length
        : Math.max(0, prev - step),
    );
  };

  const maxIndex = Math.max(0, images.length - frameSize);

  const imagesWithId = images.map((url, index) => ({
    id: `image-${index}`,
    url,
  }));

  const handleNext = () => {
    setCurrentIndex(prev =>
      infinite
        ? (prev + step) % images.length
        : Math.min(maxIndex, prev + step),
    );
  };

  const offset = -(currentIndex * itemWidth);

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${offset}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {imagesWithId.map(image => (
          <li key={image.id}>
            <img src={image.url} alt={image.id} width={itemWidth} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={classNames('Carousel__button', {
          disabled: currentIndex === 0 && !infinite,
        })}
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        className={classNames('Carousel__button', {
          disabled: currentIndex === maxIndex && !infinite,
        })}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
