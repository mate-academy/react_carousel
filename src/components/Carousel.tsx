import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [index, setIndex] = useState(0);

  const itemGap = 10;
  const visibleWidth = frameSize * (itemWidth + itemGap);
  const totalWidth = images.length * (itemWidth + itemGap);

  const nextSlide = () => {
    const newIndex = index + step;

    if (newIndex < images.length - frameSize + 1) {
      setIndex(newIndex);
    } else if (infinite) {
      setIndex(0);
    }
  };

  const prevSlide = () => {
    const newIndex = index - step;

    if (newIndex >= 0) {
      setIndex(newIndex);
    } else if (infinite) {
      setIndex(images.length - frameSize);
    }
  };

  return (
    <div className="Carousel">
      <button
        className={`arrow left ${index === 0 && !infinite ? 'disabled' : ''}`}
        onClick={prevSlide}
        data-cy="prev"
      >
        &#9664;
      </button>

      <div className="Carousel__wrapper" style={{ width: visibleWidth }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${index * (itemWidth + itemGap)}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
            width: totalWidth,
          }}
        >
          {images.map((src, i) => (
            <li key={i} style={{ width: itemWidth }}>
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`arrow right ${index + frameSize >= images.length && !infinite ? 'disabled' : ''}`}
        onClick={nextSlide}
        data-cy="next"
      >
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
