import React from 'react';
import { CarouselType } from '../types/CarouselType';
import './Carousel.scss';

type Props = CarouselType;

const Carousel: React.FC<Props> = ({
  images, step, itemWidth, frameSize, animationDuration,
}) => {
  const carousel = React.useRef<HTMLUListElement>(null);

  const scrollNext = () => {
    if (carousel.current) {
      if (carousel.current.scrollLeft <= (images.length - frameSize - 1) * itemWidth) {
        carousel.current.scrollLeft += (step * itemWidth)
          - (carousel.current.scrollLeft % itemWidth);
      } else {
        carousel.current.scrollLeft = 0;
      }
    }
  };

  const scrollPrev = () => {
    if (carousel.current) {
      if (carousel.current.scrollLeft !== 0) {
        carousel.current.scrollLeft -= step * itemWidth
          + (carousel.current.scrollLeft % itemWidth);
      } else {
        carousel.current.scrollLeft = (images.length - frameSize) * itemWidth;
      }
    }
  };

  React.useEffect(() => {
    if (carousel.current) {
      carousel.current.style.width = `${frameSize * itemWidth}px`;
    }

    setInterval(() => {
      scrollNext();
    }, animationDuration);
  });

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={scrollPrev}
        className="Carousel__button Carousel__button--prev"
      >
        -
      </button>
      <ul
        className="Carousel__list"
        ref={carousel}
      >
        {
          images.map((image, index) => (
            <li key={image} className="Carousel__image"><img src={image} alt={String(index)} /></li>
          ))
        }
      </ul>
      <button
        type="button"
        onClick={scrollNext}
        className="Carousel__button Carousel__button--next"
      >
        -
      </button>
    </div>
  );
};

export default Carousel;
