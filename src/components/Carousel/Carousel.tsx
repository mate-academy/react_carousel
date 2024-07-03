import React from 'react';
import './Carousel.scss';
import { CarouselItem } from './CarouselItem';
import { useCarousel } from './useCarousel';

interface Props {
  images: string[];
  step?: number;
  itemWidth?: number;
  frameSize?: number;
  animationDuration?: number;
}

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  step = 3,
  animationDuration = 1000,
  frameSize = 3,
}) => {
  const { currentIdx, carouselHeight, setHeight, onNext, onPrev } = useCarousel(
    {
      step,
      frameSize,
      imagesQty: images.length,
    },
  );

  return (
    <div className="carousel">
      <ul className="carousel__list" style={{ height: `${carouselHeight}px` }}>
        {images.map((url, idx) => (
          <CarouselItem
            key={url}
            index={idx}
            animationDuration={animationDuration}
            currentIdx={currentIdx}
            itemWidth={itemWidth}
            frameSize={frameSize}
            onMount={setHeight}
            imageProps={{
              url,
              alt: String(idx + 1),
            }}
          />
        ))}
      </ul>

      <button type="button" onClick={onPrev}>
        Prev
      </button>
      <button type="button" onClick={onNext} data-cy="next">
        Next
      </button>
    </div>
  );
};
