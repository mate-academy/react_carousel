import cn from 'classnames';
import { FC, useState } from 'react';

import { Hook, InputSet } from '../../types';
import './Carousel.scss';

type Props = {
  props: InputSet
  setDistance: Hook<number>
};

export const Carousel: FC<Props> = ({
  props,
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
  } = props;

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
    setDistance(distance + itemWidth * step);
    setUseTransition(false);
  };

  const preparePrevImages = () => {
    const orderedImages = [
      ...infiniteImages.slice(-step),
      ...infiniteImages,
    ].slice(0, infiniteImages.length);

    setImages(orderedImages);
    setDistance(distance - itemWidth * step);
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
    const newDistance = distance - itemWidth * step;

    setDirection('next');
    setUseTransition(true);
    setDistance(infinite
      ? newDistance
      : Math.max(newDistance, maxDistance));
  };

  const handlePrev = () => {
    const newDistance = distance + itemWidth * step;

    setDirection('prev');
    setUseTransition(true);
    setDistance(infinite
      ? newDistance
      : Math.min(newDistance, 0));
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
    <div
      className="Carousel"
      style={{ width: `${itemWidth * frameSize}px` }}
    >
      <button
        className={cn('button prev', {
          '--disabled': isDisabledPrev,
        })}
        type="button"
        onClick={handlePrev}
      >
        &nbsp;&lt;&nbsp;
      </button>

      <div
        className="container"
        style={{ height: `${itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={listStyle()}
          onTransitionEnd={handleTransitionEnd}
        >
          {(infinite
            ? infiniteImages
            : images).map(image => {
            const id = image.match(/\d/g)?.join('');

            const imgStyle = {
              width: `${itemWidth}px`,
              height: `${itemWidth}px`,
            };

            return (
              <li
                className="Carousel__image"
                key={id}
              >
                <img
                  src={image}
                  alt={id}
                  style={imgStyle}
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
        &nbsp;&gt;&nbsp;
      </button>
    </div>
  );
};
