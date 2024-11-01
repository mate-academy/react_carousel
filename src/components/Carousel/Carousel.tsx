import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  nextButton: () => void;
  prevButton: () => void;
  position: number;
  duration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  nextButton,
  prevButton,
  position,
  duration,
}) => {
  const items = images.map(image => {
    return (
      <li key={image}>
        <img src={image} style={{ width: itemWidth }} alt={image} />
      </li>
    );
  });

  const itemsWidth = itemWidth * frameSize;

  return (
    <div className="Carousel">
      <button onClick={prevButton} type="button">
        Prev
      </button>
      <div
        style={{ width: `${itemsWidth}px`, height: `${itemWidth}px` }}
        className="container"
      >
        <ul
          style={{
            transform: `translateX(${position}px)`,
            transitionDuration: `${duration}ms`,
          }}
          className="Carousel__list"
        >
          {items}
        </ul>
      </div>
      <button data-cy="next" onClick={nextButton} type="button">
        Next
      </button>
    </div>
  );
};

export default Carousel;
