import cn from 'classnames';
import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transformX, setTransformX] = useState(0);

  const handlePrevClick = () => {
    if (currentIndex !== undefined && currentIndex > 0) {
      setCurrentIndex(currentIndex - 2);
      setTransformX(transformX - 2);
    }
  };

  const handleNextClick = () => {
    if (currentIndex !== undefined && currentIndex < images.length - 2) {
      setCurrentIndex(currentIndex + 2);
      setTransformX(transformX + 2);
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${transformX * 50}%)`,
          transition: 'transform 1s ease-in-out',
        }}
      >
        {images.map((image, index) => (
          <li>
            <img src={image} alt={`index-${index}`} />
          </li>
        ))}
      </ul>
      <div className="container">
        <button
          type="button"
          onClick={handlePrevClick}
          className={cn('button', {
            'button--hide': currentIndex === 0,
          })}
        >
          ←
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={handleNextClick}
          className={cn('button', {
            'button--hide': currentIndex >= images.length - 2,
          })}
        >
          →
        </button>
      </div>

    </div>
  );
};

export default Carousel;
