import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
  let itemPosition = 0;
  const maxItemPosition = images.length - frameSize;

  const carouselList = useRef<HTMLUListElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const moveItems = () => {
    if (carouselList && carouselList.current) {
      carouselList.current.style.transform
      = itemPosition >= maxItemPosition
          ? `translateX(${(-maxItemPosition) * itemWidth}px)`
          : `translateX(${-itemPosition * itemWidth}px)`;
    }
  };

  const handlePrevClick = () => {
    if (infinite && itemPosition === 0) {
      itemPosition = maxItemPosition + step;
    }

    if (itemPosition > 0) {
      itemPosition -= step;
    }

    if (itemPosition < 0) {
      itemPosition = 0;
    }

    moveItems();
  };

  const handleNextClick = () => {
    if (infinite && itemPosition === maxItemPosition) {
      itemPosition = -step;
    }

    if (itemPosition < maxItemPosition) {
      itemPosition += step;
    }

    if (itemPosition >= maxItemPosition) {
      itemPosition = maxItemPosition;
    }

    moveItems();
  };

  useEffect(() => {
    if (wrapper && wrapper.current) {
      wrapper.current.style.width = `${itemWidth * frameSize}px`;
    }

    if (carouselList && carouselList.current) {
      carouselList.current.style.transition = `${animationDuration.toString()}ms`;
    }
  }, [itemWidth, frameSize, animationDuration]);

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={handlePrevClick}
        className={cn(
          'Carousel__arrow Carousel__arrow--prev',
          {
            disabled: !infinite,
          },
        )}
      >
        {'<='}
      </button>
      <div className="Carousel__list-wrapper" ref={wrapper}>
        <ul className="Carousel__list" ref={carouselList}>
          {
            images.map((image, index) => (
              <li key={image}>
                <img
                  src={image}
                  alt={index.toString()}
                  width={itemWidth}
                  className="Carousel__image"
                />
              </li>
            ))
          }
        </ul>
      </div>

      <button
        type="button"
        onClick={handleNextClick}
        data-cy="next"
        className={cn(
          'Carousel__arrow Carousel__arrow--next',
        )}
      >
        {'=>'}
      </button>
    </div>
  );
};

export default Carousel;
