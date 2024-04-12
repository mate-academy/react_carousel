import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const IMAGES_GAP = 10;
  const wrapperWidth = itemWidth * frameSize + (frameSize - 1) * IMAGES_GAP;

  const wrapperStyles = {
    transform: `translateX(-${currentIndex * (itemWidth + IMAGES_GAP)}px)`,
    transition: `transform ${animationDuration}ms ease-out`,
    gap: `${IMAGES_GAP}px`,
    width: `${wrapperWidth}px`,
  };

  const handleNextButton = () => {
    setCurrentIndex(Math.min(currentIndex + step, images.length - frameSize));
  };

  const handlePrevButton = () => {
    setCurrentIndex(Math.max(currentIndex - step, 0));
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={handlePrevButton}
        className="button"
        disabled={currentIndex === 0}
      >
        Prev
      </button>

      <article className="Carousel__container">
        <ul className="Carousel__list" style={wrapperStyles}>
          {images.map((image: string) => (
            <li key={image} className="Carousel__item">
              <img
                src={image}
                alt={`emoji ${image}`}
                width={itemWidth}
                height={itemWidth}
                className="Carousel__image"
              />
            </li>
          ))}
        </ul>
      </article>

      <button
        type="button"
        data-cy="next"
        onClick={handleNextButton}
        className="button"
        disabled={currentIndex >= images.length - frameSize}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
