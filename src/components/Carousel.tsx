import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import './Carousel.scss';

const ITEM_GAP = 10;

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [scrollIndex, setScrollIndex] = useState(0);

  const maxScrollIndex = Math.max(0, images.length - frameSize);

  useEffect(() => {
    if (scrollIndex > maxScrollIndex) {
      setScrollIndex(maxScrollIndex);
    }
  }, [maxScrollIndex, scrollIndex]);

  const isAtStart = scrollIndex <= 0;
  const isAtEnd = scrollIndex >= maxScrollIndex;

  const handlePrevClick = () => {
    setScrollIndex(currentIndex => {
      const nextIndex = currentIndex - step;

      if (nextIndex < 0) {
        return infinite ? maxScrollIndex : 0;
      }

      return nextIndex;
    });
  };

  const handleNextClick = () => {
    setScrollIndex(currentIndex => {
      const nextIndex = currentIndex + step;

      if (nextIndex > maxScrollIndex) {
        return infinite ? 0 : maxScrollIndex;
      }

      return nextIndex;
    });
  };

  const itemStep = itemWidth + ITEM_GAP;
  const frameWidth =
    frameSize * itemWidth + Math.max(0, frameSize - 1) * ITEM_GAP;

  return (
    <div className="Carousel">
      <button
        type="button"
        className={cn('Carousel__arrow', 'Carousel__arrow--prev', {
          disabled: !infinite && isAtStart,
        })}
        disabled={!infinite && isAtStart}
        onClick={handlePrevClick}
      >
        Prev
      </button>

      <div className="Carousel__viewport" style={{ width: `${frameWidth}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${scrollIndex * itemStep}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={`${image}-${index}`}
              className="Carousel__item"
              style={{
                width: `${itemWidth}px`,
                marginRight: index === images.length - 1 ? 0 : `${ITEM_GAP}px`,
              }}
            >
              <img
                src={image}
                alt={`${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        data-cy="next"
        className={cn('Carousel__arrow', 'Carousel__arrow--next', {
          disabled: !infinite && isAtEnd,
        })}
        disabled={!infinite && isAtEnd}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
