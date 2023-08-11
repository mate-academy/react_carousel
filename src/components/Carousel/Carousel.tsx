import React, { useState } from 'react';
import './Carousel.scss';
import { Button } from '../Button';
import { CarouselItem } from '../CarouselItem';

type CarouselProps = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
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
      setCurrentIndex(currentIndex - step);
    }
  };

  const nextOnClick = () => {
    if (currentIndex < images.length - frameSize) {
      setCurrentIndex(currentIndex + step);
    } else if (infinite) {
      setCurrentIndex(0);
    }
  };

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
          disabled={currentIndex === 0}
          data-cy="prev-button"
        />

        <Button
          label=">>"
          onClick={nextOnClick}
          disabled={currentIndex >= images.length - frameSize && !infinite}
          data-cy="next-button"
        />
      </div>
    </div>
  );
};

// Define default props
Carousel.defaultProps = {
  step: 3,
  frameSize: 3,
  infinite: false,
  itemWidth: 130,
  animationDuration: 1000,
};
