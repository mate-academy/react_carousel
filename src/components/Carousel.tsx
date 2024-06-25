import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

type Params = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Params> = ({
  images,
  step,
  frameSize,
  itemWidth = 130,
  animationDuration,
  infinite = false,
}) => {
  const [containerSteps, setContainerSteps] = useState(0);
  const gap = 40;
  const slotWidth = itemWidth + gap;
  const frameWidth = slotWidth * frameSize - gap;
  const maxContainerSteps = images.length - frameSize;
  const carouselTranslation = -containerSteps * slotWidth;

  const nextDisabled = containerSteps === maxContainerSteps && !infinite;
  const prevDisabled = containerSteps === 0;

  const nextClick = () => {
    if (containerSteps === maxContainerSteps && infinite) {
      setContainerSteps(0);
    } else {
      const newTranslation = Math.min(maxContainerSteps, containerSteps + step);

      setContainerSteps(newTranslation);
    }
  };

  const prevClick = () => {
    const newTranslation = Math.max(0, containerSteps - step);

    setContainerSteps(newTranslation);
  };

  return (
    <div className="Carousel" style={{ width: frameWidth }}>
      <ul
        className="Carousel__list"
        style={{
          transition: `all ease-in-out ${animationDuration}ms`,
          transform: `translateX(${carouselTranslation}px)`,
        }}
      >
        {images.map((image, index) => (
          <li key={image}>
            <img src={image} alt={'image - ' + index} width={itemWidth} />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className={cn('Carousel__button Carousel__button--prev', {
            'Carousel__button--disabled': prevDisabled,
          })}
          data-cy={'prev'}
          onClick={prevClick}
        >
          Prev
        </button>

        <button
          type="button"
          className={cn('Carousel__button Carousel__button--next', {
            'Carousel__button--disabled': nextDisabled,
          })}
          data-cy={'next'}
          onClick={nextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
