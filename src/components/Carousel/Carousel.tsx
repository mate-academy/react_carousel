import './Carousel.scss';
import { State } from '../../types/State';
import { useRef } from 'react';

type CarouselProps = State & {
  onChangeoffSet: (offSet: number) => void;
};

enum ScrollDirections {
  prev,
  next,
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  offSet,
  onChangeoffSet,
  infinite,
}) => {
  const listRef = useRef<HTMLUListElement>(null);

  function scrolling(direction: ScrollDirections) {
    if (!listRef.current) {
      return;
    }

    const maxOffset = (images.length - frameSize) * itemWidth;
    let newOffset = offSet;

    if (direction === ScrollDirections.next) {
      newOffset = offSet + step * itemWidth;

      if (infinite) {
        if (newOffset > maxOffset) {
          newOffset = 0;
        }
      } else {
        if (newOffset > maxOffset) {
          newOffset = maxOffset;
        }
      }
    } else if (direction === ScrollDirections.prev) {
      newOffset = offSet - step * itemWidth;

      if (infinite) {
        if (newOffset < 0) {
          newOffset = maxOffset;
        }
      } else {
        if (newOffset < 0) {
          newOffset = 0;
        }
      }
    }

    listRef.current.style.transform = `translateX(-${newOffset}px)`;
    listRef.current.style.transition = `transform ${animationDuration}ms`;

    onChangeoffSet(newOffset);
  }

  return (
    <div className="Carousel">
      <button
        className="Carousel__button"
        type="button"
        disabled={
          (offSet === 0 && !infinite) ||
          images.length <= frameSize ||
          images.length <= step
        }
        onClick={() => scrolling(ScrollDirections.prev)}
      >
        Prev
      </button>

      <div
        className="Carousel__list-container"
        style={{ width: frameSize * itemWidth + 'px' }}
      >
        <ul
          ref={listRef}
          className="Carousel__list"
          style={{
            transition: `transform ${animationDuration}ms`,
            width: itemWidth * images.length + 'px',
            transform: `translateX(-${offSet}px)`,
          }}
        >
          {images.map(img => (
            <li key={img} className="Carousel__link">
              <img
                src={img}
                alt="1"
                className="Carousel__image"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        className="Carousel__button"
        type="button"
        data-cy="next"
        disabled={
          (offSet >= (images.length - frameSize) * itemWidth && !infinite) ||
          images.length <= frameSize ||
          images.length <= step
        }
        onClick={() => scrolling(ScrollDirections.next)}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
