import React, { useEffect, useRef, useState } from 'react';
import './Carousel.scss';
import { State } from '../types/State';

let value = 0;

const Carousel: React.FC<State> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
}) => {
  const [scroll, setScroll] = useState(0);
  const itemWidthPrev = useRef<number>(itemWidth);

  const scrollMin = 0;
  const scrollMax = -(itemWidth * images.length - frameSize * itemWidth);

  const disabledPrev = scroll === scrollMin;
  const disabledNext = scroll <= scrollMax;

  const scrollStep = -(step * itemWidth);

  const scrollPrev = () => {
    if (scroll < scrollMin && scroll - scrollStep < scrollMin) {
      setScroll(prev => prev - scrollStep);
    } else {
      setScroll(scrollMin);
    }
  };

  const scrollNext = () => {
    if (scroll > scrollMax && scroll + scrollStep > scrollMax) {
      setScroll(prev => prev + scrollStep);
    } else {
      setScroll(scrollMax);
    }
  };

  const carouselListWrapperStyle = {
    transition: `transform ${animationDuration}ms linear`,
    transform: `translateX(${scroll}px)`,
    width: `${itemWidth * frameSize}px`,
  };

  const imageStyle = {
    width: `${itemWidth}px`,
    height: `${itemWidth}px`,
  };

  useEffect(() => {
    if (itemWidth !== itemWidthPrev.current) {
      setScroll(scrollStep);
    }

    itemWidthPrev.current = itemWidth;
  }, [itemWidth]);

  return (
    <div className="Carousel">
      <div className="Carousel__list--wrapper" style={carouselListWrapperStyle}>
        <ul className="Carousel__list">
          {images.map(image => {
            value++;

            return (
              <li key={image} className="Carousel__item" style={imageStyle}>
                <img src={image} alt={value.toString()} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="button--wrapper">
        <button type="button" onClick={scrollPrev} disabled={disabledPrev}>
          Prev
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={disabledNext}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
