import React, { useRef, useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

type CarouselProps = {
  images: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
  animationDuration: number;
  infinite?: boolean;
};

const Carousel = ({
  images,
  step,
  itemWidth,
  frameSize,
  animationDuration,
  infinite,
}: CarouselProps): JSX.Element => {
  const [offset, setOffset] = useState(0);
  const carouselListRef = useRef<HTMLUListElement>(null);

  const gap = 20;
  const maxNextTransform = -(images.length - frameSize) * (itemWidth + gap);

  const handleNextClick = () => {
    if (carouselListRef.current && offset > maxNextTransform) {
      const newOffset = Math.max(
        offset - step * (itemWidth + gap),
        maxNextTransform,
      );

      carouselListRef.current.style.transition = `transform ${animationDuration}ms ease`;
      carouselListRef.current.style.transform = `translateX(${newOffset}px)`;

      setOffset(newOffset);
    }

    if (carouselListRef.current && offset === maxNextTransform && infinite) {
      carouselListRef.current.style.transition = `transform ${animationDuration}ms ease`;
      carouselListRef.current.style.transform = `translateX(0px)`;

      setOffset(0);
    }
  };

  const handlePrevClick = () => {
    if (carouselListRef.current && offset < 0) {
      const newOffset = Math.min(offset + step * (itemWidth + gap), 0);

      carouselListRef.current.style.transition = `transform ${animationDuration}ms ease`;
      carouselListRef.current.style.transform = `translateX(${newOffset}px)`;

      setOffset(newOffset);
    }

    if (carouselListRef.current && offset === 0 && infinite) {
      carouselListRef.current.style.transition = `transform ${animationDuration}ms ease`;
      carouselListRef.current.style.transform = `translateX(${maxNextTransform}px)`;

      setOffset(maxNextTransform);
    }
  };

  const prevButtonClasses = cn({
    Carousel__button: true,
    'Carousel__button--prev': true,
    'Carousel__button--disabled': offset === 0 && !infinite,
  });

  const nextButtonClasses = cn({
    Carousel__button: true,
    'Carousel__button--next': true,
    'Carousel__button--disabled': offset === maxNextTransform && !infinite,
  });

  return (
    <div
      className="Carousel"
      style={{ width: `${frameSize * (itemWidth + gap)}px` }}
    >
      <ul className="Carousel__list" ref={carouselListRef}>
        {images.map((image, index) => (
          <li
            key={index}
            style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
          >
            <img
              src={image}
              alt={`${index + 1}`}
              style={{ width: `${itemWidth}px` }}
              width={itemWidth}
              height={itemWidth}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handlePrevClick}
        className={prevButtonClasses}
      >
        &#9664;
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={handleNextClick}
        className={nextButtonClasses}
      >
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
