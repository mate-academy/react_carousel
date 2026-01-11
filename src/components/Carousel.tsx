import React, { useState } from 'react';
import './Carousel.scss';

type CarouselType = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<CarouselType> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0); // position is a step-index (0..)

  const carouselListWidth = images.length * itemWidth;
  const maxShift = Math.max(0, images.length - frameSize); // how many items can be shifted
  const maxPos = Math.max(0, Math.ceil(maxShift / step));

  const moveX = -position * step * itemWidth; // negative to move content left

  // автоплей інтервал у мс (можете зробити пропом)
  const autoPlayInterval = 2000;
  const autoplayRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!infinite) {
      return;
    }

    // очищуємо старий інтервал якщо є
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
    }

    autoplayRef.current = window.setInterval(() => {
      setPosition(prev => (prev >= maxPos ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [infinite, maxPos, autoPlayInterval]);

  return (
    <div className="Carousel__wrapper">
      <button
        type="button"
        onClick={() => {
          if (infinite) {
            setPosition(prev => (prev <= 0 ? maxPos : prev - 1));
          } else {
            setPosition(prev => Math.max(0, prev - 1));
          }
        }}
        disabled={!infinite && position <= 0}
      >
        ←
      </button>

      <div className="Carousel" style={{ width: frameSize * itemWidth }}>
        <ul
          className="Carousel__list"
          style={{
            width: carouselListWidth,
            transform: `translateX(${moveX}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
          onMouseEnter={() => {
            if (autoplayRef.current) {
              window.clearInterval(autoplayRef.current);
              autoplayRef.current = null;
            }
          }}
          onMouseLeave={() => {
            if (infinite && !autoplayRef.current) {
              autoplayRef.current = window.setInterval(() => {
                setPosition(prev => (prev >= maxPos ? 0 : prev + 1));
              }, autoPlayInterval);
            }
          }}
        >
          {images.map((image, idx) => (
            <li key={image + idx} style={{ width: itemWidth }}>
              <img src={image} alt={image} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => {
          if (infinite) {
            setPosition(prev => (prev >= maxPos ? 0 : prev + 1));
          } else {
            setPosition(prev => Math.min(maxPos, prev + 1));
          }
        }}
        disabled={!infinite && position >= maxPos}
        data-cy="next"
      >
        →
      </button>
    </div>
  );
};

export default Carousel;
