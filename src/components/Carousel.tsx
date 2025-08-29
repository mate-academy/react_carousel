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
    <div
      className="Carousel"
      style={{
        width: frameSize * itemWidth,
        overflow: 'hidden',
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          width: images.length * itemWidth,
          display: 'flex',
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: ` transform ${animationDuration}ms ease`,
        }}
      >
        {images.map((image, i) => (
          <li key={i} style={{ width: itemWidth, flexShrink: 0 }}>
            <img
              src={image}
              alt={`carousel item ${i}`}
              style={{ width: '100%', display: 'block' }}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={!infinite && currentIndex === 0}
        onClick={prev}
        aria-label="Previous slide"
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        aria-label="Next slide"
        disabled={!infinite && currentIndex >= images.length - frameSize}
        onClick={next}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
