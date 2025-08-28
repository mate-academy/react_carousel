import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleImages = images.slice(currentIndex, currentIndex + frameSize);

  const prev = () =>
    setCurrentIndex(pr =>
      infinite
        ? (pr - step + images.length) % images.length
        : Math.max(0, pr - step),
    );

  const next = () =>
    setCurrentIndex(pr =>
      infinite
        ? (pr + step) % images.length
        : Math.min(images.length - frameSize, pr + step),
    );

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: `${itemWidth}px`,
          transitionDuration: `transform ${animationDuration}ms`,
        }}
      >
        {visibleImages.map((image, i) => (
          <li key={image}>
            <img src={image} alt={i} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={!infinite && currentIndex === 0}
        onClick={prev}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        disabled={!infinite && currentIndex >= images.length - frameSize}
        onClick={next}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
