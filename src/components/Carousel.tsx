import React, { useState, useEffect, useRef } from 'react';
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
  const [itemPosition, setItemPosition] = useState(0);

  const maxItemPosition = images.length - Math.max(frameSize, step);

  const wrapper = useRef<HTMLDivElement>(null);

  const carouselList = useRef<HTMLUListElement>(null);

  const handlePrevClick = () => {
    if (itemPosition > 0) {
      setItemPosition(position => position - step);
    }

    if (infinite && itemPosition === 0) {
      setItemPosition(maxItemPosition);
    }
  };

  const handleNextClick = () => {
    if (itemPosition < maxItemPosition) {
      setItemPosition(position => position + step);
    }

    if (infinite && itemPosition === maxItemPosition) {
      setItemPosition(0);
    }
  };

  useEffect(() => {
    if (itemPosition > maxItemPosition) {
      setItemPosition(maxItemPosition);
    }

    if (itemPosition < 0) {
      setItemPosition(0);
    }

    if (wrapper.current) {
      wrapper.current.style.width = `${itemWidth * frameSize}px`;
    }

    if (carouselList.current) {
      carouselList.current.style.transform
        = `translateX(${(-itemPosition) * itemWidth}px)`;

      carouselList.current.style.transition = `${animationDuration.toString()}ms`;
    }
  }, [itemPosition, frameSize, animationDuration, itemWidth]);

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={handlePrevClick}
        className={cn(
          'Carousel__arrow Carousel__arrow--prev',
          {
            disabled: !infinite && itemPosition === 0,
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
          {
            disabled: !infinite && itemPosition === maxItemPosition,
          },
        )}
      >
        {'=>'}
      </button>
    </div>
  );
};

export default Carousel;
