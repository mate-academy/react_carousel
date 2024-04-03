import React, { useState } from 'react';
import { DefaultParameters } from '../DefaultParameters';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = DefaultParameters.Step,
  frameSize = DefaultParameters.FrameSize,
  itemWidth = DefaultParameters.ItemWidth,
  animationDuration = DefaultParameters.AnimationDuration,
  infinite = false,
}) => {
  const itemsGap = 5;
  const maxScroll = -((itemWidth + itemsGap) * (images.length - frameSize));
  const containerWidth = frameSize * itemWidth + itemsGap * (frameSize - 1);

  const [currentSteps, setCurrentSteps] = useState(0);
  const goNext = () => {
    setCurrentSteps(currentSteps + 1);
  };

  const goPrev = () => {
    const maxSteps = Math.ceil(images.length / step);
    let newSteps = currentSteps - 1;

    if (newSteps > maxSteps) {
      newSteps = maxSteps - 1;
    }

    setCurrentSteps(newSteps);
  };

  let currentScroll = 0 - (itemWidth + itemsGap) * step * currentSteps;

  if (currentScroll < maxScroll) {
    currentScroll = maxScroll;
  } else if (currentScroll > 0) {
    currentScroll = 0;
  }

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: containerWidth,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            gap: `${itemsGap}px`,
            width: containerWidth,
            transform: `translateX(${currentScroll}px)`,
            translate: `transform ${animationDuration}`,
          }}
        >
          {images.map(image => (
            <li key={image}>
              <img src={image} alt={image} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={goPrev}
          className="
          Carousel__button
          Carousel__button--prev
          "
          disabled={!infinite && currentScroll === 0}
        ></button>

        <button
          data-cy="next"
          type="button"
          onClick={goNext}
          className="
          Carousel__button
          Carousel__button--next
          "
          disabled={!infinite && currentScroll === maxScroll}
        ></button>
      </div>
    </div>
  );
};

export default Carousel;
