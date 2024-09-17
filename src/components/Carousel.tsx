import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [swipeCarousel, setSwipeCarousel] = useState(0);
  const handleSwipeNext = () => {
    if (swipeCarousel + step < images.length - frameSize) {
      setSwipeCarousel(prew => prew + step);
    } else if (swipeCarousel + frameSize < images.length) {
      setSwipeCarousel(images.length - frameSize);
    } else if (infinite) {
      setSwipeCarousel(0);
    }
  };

  const handleSwipePrew = () => {
    if (swipeCarousel > step) {
      setSwipeCarousel(prew => prew - step);
    } else if (swipeCarousel) {
      setSwipeCarousel(0);
    } else if (infinite) {
      setSwipeCarousel(images.length - frameSize);
    }
  };

  const disabletNext = swipeCarousel + frameSize >= images.length && !infinite;
  const disablePrew = !swipeCarousel && !infinite;

  const styleCarousel = {
    width: `${itemWidth * frameSize}px`,
  };

  const styleCarouselItem = {
    width: `${itemWidth}px`,
    transition: `transform ${animationDuration}ms`,
    transform: `translateX(-${itemWidth * swipeCarousel}px)`,
  };

  return (
    <div>
      <div className="Carousel">
        <button
          type="button"
          onClick={() => handleSwipePrew()}
          disabled={disablePrew}
        >
          {'<'}
        </button>
        <ul className="Carousel__list" style={styleCarousel}>
          {images.map((img, ind) => (
            <li key={img} style={styleCarouselItem}>
              <img
                src={img}
                alt={ind.toString()}
                width={`${itemWidth}`}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => handleSwipeNext()}
          disabled={disabletNext}
          data-cy="next"
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
