import React, { useCallback, useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [index, setIndex] = useState(0);
  const [isPrevPossible, setIsPrevPossible] = useState(infinite || index > 0);
  const [isNextPossible, setIsNextPossible] = useState(
    infinite || index < images.length - frameSize,
  );

  const containerWidth = itemWidth * frameSize;
  const offset = itemWidth * index;

  const containerStyle = { width: `${containerWidth}px` };
  const listStyle = {
    left: `-${offset}px`,
    transitionDuration: `${animationDuration}ms`,
  };

  const imageHiddenStyle = {
    visibility: 'hidden',
    transitionDelay: `${animationDuration}ms`, // creates an illusion of smooth motion without angering the cypress gods
  };

  const updateMovement = useCallback(
    (newIndex: number) => {
      if (infinite) {
        return;
      }

      setIsPrevPossible(newIndex > 0);
      setIsNextPossible(newIndex < images.length - step);
    },
    [images.length, infinite, step],
  );

  const goToNextIndex = useCallback(() => {
    setIndex(oldIndex => {
      let newIndex = oldIndex + step;

      if (newIndex >= images.length - (frameSize - step)) {
        newIndex = 0;
      } else if (newIndex > images.length - frameSize) {
        newIndex = images.length - frameSize;
      }

      updateMovement(newIndex);

      return newIndex;
    });
  }, [images.length, frameSize, step, updateMovement]);

  const goToPrevIndex = useCallback(() => {
    setIndex(oldIndex => {
      let newIndex = oldIndex - step;

      if (newIndex <= -frameSize + (frameSize - step)) {
        newIndex = images.length - frameSize;
      } else if (newIndex < 0) {
        newIndex = 0;
      }

      updateMovement(newIndex);

      return newIndex;
    });
  }, [images.length, frameSize, step, updateMovement]);

  useEffect(() => {
    if (infinite) {
      setIsPrevPossible(true);
      setIsNextPossible(true);
    } else {
      setIsPrevPossible(index > 0);
      setIsNextPossible(index < images.length - frameSize);
    }
  }, [frameSize, images.length, index, infinite]);

  return (
    <div className="Carousel" style={containerStyle}>
      <ul className="Carousel__list" style={listStyle}>
        {images.map((image, id) => {
          // Technically, manually hiding images is not needed,
          // as Carousel just hides any overflow.
          // However, Cypress does not consider it hidden for some reason.
          // and this code fixes it.
          const isVisible = id >= index && id < index + frameSize;

          return (
            <li className="Carousel__item" key={image}>
              <img
                className="Carousel__img"
                width={itemWidth}
                style={
                  isVisible ? {} : (imageHiddenStyle as React.CSSProperties)
                }
                src={image}
                alt={`${id + 1}`}
              />
            </li>
          );
        })}
      </ul>

      <button
        className="Carousel__button"
        onClick={goToPrevIndex}
        type="button"
        disabled={!isPrevPossible}
      >
        Prev
      </button>
      <button
        className="Carousel__button"
        data-cy="next"
        onClick={goToNextIndex}
        type="button"
        disabled={!isNextPossible}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
