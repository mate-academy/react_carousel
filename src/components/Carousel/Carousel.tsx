import React, { useState } from 'react';
import './Carousel.scss';
import { Button } from '../Button';
import { CarouselItem } from '../CarouselItem';

type CarouselProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

export const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevOnClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(Math.max(currentIndex - step, 0));
    }
  };

  const nextOnClick = () => {
    const maxIndex = images.length - frameSize;

    if (currentIndex < maxIndex) {
      setCurrentIndex(Math.min(currentIndex + step, maxIndex));
    } else if (infinite) {
      setCurrentIndex(0);
    }
  };

  const isPrevButtonDisabled
    = currentIndex === 0;
  const isNextButtonDisabled
    = currentIndex >= images.length - frameSize && !infinite;

  return (
    <div className="carousel">
      <h1 data-cy="title" className="carousel__title">
        {`Carousel with ${images.length} images`}
      </h1>
      <CarouselItem
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        currentIndex={currentIndex}
        animationDuration={animationDuration}
      />
      <div className="carousel__buttons">
        <Button
          label="<<"
          onClick={prevOnClick}
          disabled={isPrevButtonDisabled}
          data-cy="prev-button"
        />

        <Button
          label=">>"
          onClick={nextOnClick}
          disabled={isNextButtonDisabled}
          data-cy="next-button"
        />
      </div>
    </div>
  );
};
