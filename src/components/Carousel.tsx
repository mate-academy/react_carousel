import { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

export default function Carousel({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - frameSize;

  const handleNextClick = () => {
    switch (true) {
      case currentIndex < maxIndex:
        setCurrentIndex(Math.min(currentIndex + step, maxIndex));
        break;
      case infinite:
        setCurrentIndex(0);
        break;
    }
  };

  const handlePrevClick = () => {
    switch (true) {
      case currentIndex > 0:
        setCurrentIndex(Math.max(currentIndex - step, 0));
        break;
      case infinite:
        setCurrentIndex(maxIndex);
        break;
    }
  };

  return (
    <div className="carousel">
      <ul
        className="carousel__list"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        {images.map((image, i) => (
          <li
            key={i}
            className="carousel__item"
            style={{
              translate: `-${itemWidth * currentIndex}px`,
              transition: `translate ${animationDuration}ms`,
            }}
          >
            <img src={image} alt={`${i + 1}`} width={itemWidth} />
          </li>
        ))}
      </ul>

      <div className="controls">
        <button
          type="button"
          className="controls__btn"
          disabled={!infinite && currentIndex === 0}
          onClick={handlePrevClick}
        >
          <span className="sr-only">Prev</span>
          <span aria-hidden>◀</span>
        </button>

        <button
          data-cy="next"
          type="button"
          className="controls__btn"
          disabled={!infinite && currentIndex === maxIndex}
          onClick={handleNextClick}
        >
          <span className="sr-only">Next</span>
          <span aria-hidden>▶</span>
        </button>
      </div>
    </div>
  );
}
