import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  animationDuration?: number;
  step?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [carouselList, setCarouselList] = useState(0);

  const previous = () =>
    -carouselList + step < 0
      ? setCarouselList(carouselList - step)
      : setCarouselList(0);

  const next = () =>
    carouselList + step < images.length - step
      ? setCarouselList(carouselList + step)
      : setCarouselList(images.length - step);

  if (infinite) {
    setInterval(() => {
      if (carouselList + step < images.length - step) {
        setCarouselList(carouselList + step);
      } else if (carouselList < images.length - step) {
        setCarouselList(images.length - step);
      } else {
        setCarouselList(0);
      }
    }, 3000);
  }

  return (
    <div style={{ width: itemWidth * images.length }} className="Carousel">
      <div
        style={{ width: itemWidth * frameSize }}
        className="Carousel__visible"
      >
        <ul
          style={{
            height: itemWidth,
            right: carouselList * itemWidth,
            transition: `all ${animationDuration}ms`,
          }}
          className="Carousel__list"
        >
          {images.map((image, index) => (
            <img
              key={`${index}-${image}`}
              src={image}
              alt={String(index)}
            ></img>
          ))}
        </ul>
      </div>

      <button onClick={previous} type="button">
        Prev
      </button>
      <button onClick={next} data-cy="next" type="button">
        Next
      </button>
    </div>
  );
};

export default Carousel;
