import { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

interface CarouselState {
  currentPosition: number;
  currentElement: number;
}

const Carousel = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}: Props) => {
  const [carouselState, setCarouselState] = useState<CarouselState>({
    currentPosition: 0,
    currentElement: 0,
  });

  if (!images || images.length === 0) {
    return <div className="Carousel">No Images to Display</div>;
  }

  if (frameSize <= 0 || step <= 0 || itemWidth <= 0) {
    return <div className="Carousel">Invalid carousel configuration</div>;
  }

  const maxStart = Math.max(0, images.length - frameSize);
  const canMoveNext = infinite || carouselState.currentElement < maxStart;
  const canMovePrev = infinite || carouselState.currentElement > 0;

  const handleNext = () => {
    if (infinite) {
      const nextIndex =
        carouselState.currentElement >= maxStart
          ? 0
          : Math.min(carouselState.currentElement + step, maxStart);

      setCarouselState({
        currentElement: nextIndex,
        currentPosition: -nextIndex * itemWidth,
      });
    } else {
      if (!canMoveNext) {
        return;
      }

      const nextIndex = Math.min(carouselState.currentElement + step, maxStart);

      setCarouselState({
        currentElement: nextIndex,
        currentPosition: -nextIndex * itemWidth,
      });
    }
  };

  const handlePrev = () => {
    if (infinite) {
      const prevIndex =
        carouselState.currentElement <= 0
          ? maxStart
          : Math.max(carouselState.currentElement - step, 0);

      setCarouselState({
        currentElement: prevIndex,
        currentPosition: -prevIndex * itemWidth,
      });
    } else {
      if (!canMovePrev) {
        return;
      }

      const prevIndex = Math.max(carouselState.currentElement - step, 0);

      setCarouselState({
        currentElement: prevIndex,
        currentPosition: -prevIndex * itemWidth,
      });
    }
  };

  const carouselStyle = {
    '--item-width': `${itemWidth}px`,
    '--animation-duration': `${animationDuration}ms`,
    '--frame-size': frameSize,
  } as React.CSSProperties;

  return (
    <div className="Carousel" style={carouselStyle}>
      <div className="Carousel__viewport">
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${carouselState.currentPosition}px)`,
          }}
        >
          {images &&
            images.map((item, index) => {
              return (
                <li key={`${index}-${item}`} className="Carousel__item">
                  <img src={item} alt={`${index + 1}`} width={itemWidth} />
                  <p>is item {index + 1}</p>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="Carousel__btns">
        <button
          disabled={!canMovePrev}
          type="button"
          onClick={() => handlePrev()}
        >
          Prev
        </button>
        <button
          disabled={!canMoveNext}
          type="button"
          onClick={() => handleNext()}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
