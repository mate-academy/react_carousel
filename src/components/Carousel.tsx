import { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  itemWidth,
  step,
  animationDuration,
  infinite,
}) => {
  const [carouselPosition, updateCarouselPosition] = useState(0);

  const lastCarouselPosition = images.length - frameSize;

  const isCarouselAtStart = !infinite && carouselPosition === 0;
  const isCarouselAtEnd =
    !infinite && carouselPosition === lastCarouselPosition;

  const moveCarouselNext = () => {
    const newPosition = infinite
      ? (carouselPosition + step) % images.length
      : Math.min(carouselPosition + step, lastCarouselPosition);

    updateCarouselPosition(newPosition);
  };

  const moveCarouselPrev = () => {
    const newPosition = infinite
      ? (carouselPosition - step + images.length) % images.length
      : Math.max(carouselPosition - step, 0);

    updateCarouselPosition(newPosition);
  };

  const carouselStyle = {
    transform: `translateX(-${carouselPosition * itemWidth}px)`,
    transition: `transform ${animationDuration}ms ease-out`,
  };
  const itemStyle = {
    width: `${itemWidth}px`,
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: `${itemWidth * frameSize - 1}px` }}
      >
        <ul className="Carousel__list" style={carouselStyle}>
          {images.map((image, index) => (
            <li key={image} className="Carousel__item" style={itemStyle}>
              <img src={image} alt={`${index}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <div className="btns">
        <button
          disabled={isCarouselAtStart}
          onClick={moveCarouselPrev}
          type="button"
        >
          Prev
        </button>
        <button
          data-cy="next"
          disabled={isCarouselAtEnd}
          onClick={moveCarouselNext}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
