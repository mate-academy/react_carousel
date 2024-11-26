import React, { useEffect, useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryLanguage = images.length;
  const maxIndex = galleryLanguage - frameSize;

  useEffect(() => {
    setActiveIndex(0);
  }, [frameSize]);

  const prev = () => {
    setActiveIndex(state =>
      infinite
        ? (state - step + galleryLanguage) % galleryLanguage
        : Math.max(0, state - step),
    );
  };

  const next = () => {
    setActiveIndex(state =>
      infinite
        ? (state + step) % galleryLanguage
        : Math.min(maxIndex, state + step),
    );
  };

  return (
    <div
      className="Carousel"
      style={{
        maxWidth: `${frameSize * itemWidth}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${activeIndex * (100 / frameSize)}%)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        {images.map((image, index) => (
          <li key={index}>
            <img src={image} alt={`Slide ${index}`} width={itemWidth} />
          </li>
        ))}
      </ul>

      <div className="button__container">
        <button
          type="button"
          data-cy="prev"
          onClick={prev}
          className="Carousel__button Carousel__button--left"
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={next}
          className="Carousel__button Carousel__button--right"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
