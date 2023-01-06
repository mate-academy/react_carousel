import cn from 'classnames';
import { FC, useState } from 'react';

import { Hook, InputValues } from '../../types';
import './Carousel.scss';

type Props = {
  values: InputValues
  setDistance: Hook<number>
};

export const Carousel: FC<Props> = ({
  values,
  setDistance,
}) => {
  const {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    distance,
    infinite,
  } = values;

  const [direction, setDirection] = useState('prev');
  const [useTransition, setUseTransition] = useState(false);
  const [infiniteImages, setImages] = useState([...images]);

  const maxDistance = -itemWidth * (images.length - frameSize);

  const prepareNextImages = () => {
    const orderedImages = [
      ...infiniteImages,
      ...infiniteImages.slice(0, step),
    ].slice(-infiniteImages.length);

    setImages(orderedImages);
    setDistance(current => current + itemWidth * step);
    setUseTransition(false);
  };

  const preparePrevImages = () => {
    const orderedImages = [
      ...infiniteImages.slice(-step),
      ...infiniteImages,
    ].slice(0, infiniteImages.length);

    setImages(orderedImages);
    setDistance(current => current - itemWidth * step);
    setUseTransition(false);
  };

  const handleTransitionEnd = () => {
    if (infinite) {
      switch (direction) {
        case 'prev':
          preparePrevImages();
          break;

        case 'next':
          prepareNextImages();
          break;

        default:
          break;
      }
    }
  };

  const handleNext = () => {
    setDirection('next');
    setUseTransition(true);
    setDistance(state => (infinite
      ? state - itemWidth * step
      : Math.max(state - itemWidth * step, maxDistance)));
  };

  const handlePrev = () => {
    setDirection('prev');
    setUseTransition(true);
    setDistance(state => (infinite
      ? state + itemWidth * step
      : Math.min(state + itemWidth * step, 0)));
  };

  const listStyle = () => {
    const duration = useTransition
      ? animationDuration
      : 0;

    return {
      transition: `transform ${duration}ms`,
      transform: `translateX(${distance}px)`,
      width: `${itemWidth * images.length}px`,
    };
  };

  const isDisabledPrev = distance === 0 && !infinite;
  const isDisabledNext = distance === maxDistance && !infinite;

  return (
    <div className="Carousel">
      <button
        className={cn('button prev', {
          '--disabled': isDisabledPrev,
        })}
        type="button"
        onClick={handlePrev}
      >
        {'<'}
      </button>

      <div
        className="container"
        style={{
          height: `${itemWidth}px`,
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={listStyle()}
          onTransitionEnd={handleTransitionEnd}
        >
          {(infinite
            ? infiniteImages
            : images).map(image => {
            const id = (image.match(/\d/g) || []).join('');

            return (
              <li
                className="Carousel__image"
                key={+id}
              >
                <img
                  src={image}
                  alt={id}
                  width={itemWidth}
                  height={itemWidth}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        className={cn('button next', {
          '--disabled': isDisabledNext,
        })}
        type="button"
        data-cy="next"
        onClick={handleNext}
      >
        {'>'}
      </button>
    </div>
  );
};
